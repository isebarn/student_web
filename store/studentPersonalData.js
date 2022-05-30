import { getField, updateField } from 'vuex-map-fields'

export const state = () => ({
  data: {
    allergies: '',
    average_grades: '',
    date_of_application: null,
    date_of_birth: '2020-01-01',
    nationality: '',
    school_name: '',
    school_type: '',
    account: {
      diet: null,
      region: null,
      other_reason: '',
      other: null,
      credits_reason: '',
      credits: null,
      deposit: null,
      second_installment: null,
      third_installment: null,
      final_installment: null
    },
    address: {
      line_1: '',
      line_2: '',
      city: '',
      postal_code: '',
      country: ''
    },
    father: {
      first_name: '',
      last_name: '',
      email: '',
      address: {
        line_1: '',
        line_2: '',
        city: '',
        postal_code: '',
        country: ''
      }
    },
    mother: {
      first_name: '',
      last_name: '',
      email: '',
      address: {
        line_1: '',
        line_2: '',
        city: '',
        postal_code: '',
        country: ''
      }
    },
    host_school: {
      name: '',
      contact: '',
      email: '',
      address: {
        line_1: '',
        line_2: '',
        city: '',
        postal_code: '',
        country: ''
      }
    },
    host_family: {
      number: '',
      family_name: '',
      father: {
        first_name: '',
        last_name: '',
        age: null,
        occupation: '',
        email: ''
      },
      mother: {
        first_name: '',
        last_name: '',
        age: null,
        occupation: '',
        email: ''
      },
      address: {
        line_1: '',
        line_2: '',
        city: '',
        postal_code: '',
        country: ''
      },
      phone: {
        extension: '',
        number: ''
      },
      child: [],
      pet: [],
      smoking: false,
      profile_link: ''
    },
    host_airport: {
      name: '',
      code: ''
    }
  },
  total: null
})

export const mutations = {
  updateField,

  data: (state, payload) => {
    state.data = { ...state.data, ...payload }
  },

  date_of_birth: (state, payload) => {
    state.data.date_of_birth = payload
  },

  date_of_application: (state, payload) => {
    state.data.date_of_application = payload
  },

  child: (state, payload) => {
    state.data.host_family.child.push(payload)
  },

  pet: (state, payload) => {
    state.data.host_family.pet.push(payload)
  },

  phone: (state, payload) => {
    state.data.host_family.phone.extension = payload
  },

  updateAccountField (state, field) {
    console.log(2)
    updateField(state.data.account, field)
  }
}

export const getters = {
  getField,

  getPhone (state) {
    return state.data.host_family.phone.extension
  },

  getDateOfBirth (state) {
    return state.data.date_of_birth
  },

  getAccountField (state) {
    console.log(1)
    return getField(state.data.account)
  }
}

export const actions = {

  async load ({ commit, state, rootState, dispatch }, studentProfile) {
    const data = await this.$axios.$get(`api/student_personal_data?student_profile=${studentProfile}`)
    if (data.length > 0) {
      commit('data', data[0])
    }
  },

  async save ({ commit, state, rootState }) {
    const data = await this.$axios.$patch('api/student_personal_data', {
      ...state.data
    })

    commit('data', data)
  },

  setDateOfBirth ({ commit }, payload) {
    commit('date_of_birth', payload)
  },

  setDateOfApplication ({ commit }, payload) {
    commit('date_of_application', payload)
  },

  addChild ({ commit }, payload) {
    commit('child', payload)
  },

  addPet ({ commit }, payload) {
    commit('pet', payload)
  },

  setPhone ({ commit }, payload) {
    console.log(payload)
    commit('phone', payload)
  }
}

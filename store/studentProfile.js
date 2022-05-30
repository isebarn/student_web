import { getField, updateField } from 'vuex-map-fields'

export const state = () => ({
  data: {
    first_name: '',
    last_name: '',
    age_on_arrival: null,
    gender: '',
    email: '',
    length_of_stay: '',
    passport_country: '',
    passport_number: '',
    mother_name: '',
    father_name: '',
    language: '',
    letter: '',
    description: '',
    imagine: '',
    submitted: false,
    interview: null,
    program: {
      id: '',
      country: '',
      description: '',
      code: '',
      program_price: null,
      price: null
    }
  }
})

export const mutations = {
  updateField,

  data: (state, payload) => {
    state.data = { ...state.data, ...payload }
  },

  submit: (state) => {
    state.data.submitted = true
  },

  interview: (state, payload) => {
    state.data.interview = payload
  }
}

export const getters = {
  getField,

  interview (state) {
    if (state.data.interview) {
      return new Date(state.data.interview)
    } else {
      const date = new Date()
      date.setDate(date.getDate() + 7)
      date.setHours(16, 30, 0)

      return date
    }
  }
}

export const actions = {
  async load ({ commit, state, rootState, dispatch }, query) {
    const data = await this.$axios.$get(`api/student_profile?$include=program&${query.key}=${query.value}`)
    if (data.length > 0) {
      commit('data', data[0])
      if (data[0].program && data[0].program.id) {
        dispatch('program/setProgram', data[0].program, { root: true })
      }
    }
  },

  async save ({ commit, state, rootState }) {
    let data = {}
    if (state.data.id) {
      data = await this.$axios.$patch('api/student_profile', {
        ...state.data,
        program: rootState.program.program,
        email: rootState.auth.user.attributes.email
      })
    } else {
      data = await this.$axios.$post('api/student_profile', {
        ...state.data,
        program: rootState.program.program,
        email: rootState.auth.user.attributes.email
      })
    }

    commit('data', data)

    if (state.data.submitted) {
      const studentPersonalData = await this.$axios.$get(`api/student_personal_data?student_profile=${data.id}`)
      if (studentPersonalData.length === 0) {
        await this.$axios.$post('api/student_personal_data', { student_profile: data.id })
      }
    }
  },

  submit ({ commit, state, rootState }) {
    commit('submit')
  },

  setInterview ({ commit }, payload) {
    commit('interview', payload)
  }
}

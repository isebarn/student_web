import { getField, updateField } from 'vuex-map-fields'

export const state = () => ({
  test: '2020-01-01'
})

export const mutations = {
  updateField,

  data: (state, payload) => {
    state.data = { ...state.data, ...payload }
  },

  test: (state, payload) => {
    state.test = payload
  }
}

export const getters = {
  getField,

  Test (state) {
    return state.test
  }
}

export const actions = {
  setTest ({ commit }, payload) {
    commit('test', payload)
  }
}

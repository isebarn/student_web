import { getField, updateField } from 'vuex-map-fields'

export const state = () => ({
  overlay: false,
  success: false,
  loading: false
})

export const mutations = {
  updateField,

  overlay: (state, payload) => {
    state.overlay = payload
  },

  loading: (state, payload) => {
    state.loading = payload
  },

  success: (state, payload) => {
    state.success = payload
  }
}

export const getters = {
  getField,

  overlay (state) {
    return state.overlay
  },

  loading (state) {
    return state.loading
  },

  success (state) {
    return state.success
  }
}

export const actions = {
  setLoading ({ commit, state }) {
    commit('overlay', true)
    commit('loading', true)
  },

  setSuccess ({ commit, state }) {
    commit('loading', false)
    commit('success', true)
  },

  setDone ({ commit, state }) {
    commit('overlay', false)
    commit('success', false)
    commit('loading', false)
  }
}

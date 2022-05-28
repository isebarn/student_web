import { getField, updateField } from 'vuex-map-fields'

export const state = () => ({
  programs: null,
  program: null
})

export const mutations = {
  updateField,

  programs: (state, payload) => {
    state.programs = payload
  },

  program: (state, payload) => {
    state.program = payload
  }

}

export const getters = {
  getField
}

export const actions = {
  async populate ({ commit, state }) {
    if (!state.programs) {
      const data = await this.$axios.$get('api/program')
      commit('programs', data)
    }
  },

  setProgram ({ commit, state }, payload) {
    if (state.programs) {
      commit('program', state.programs.find(x => x.id === payload.id))
    }
  }
}

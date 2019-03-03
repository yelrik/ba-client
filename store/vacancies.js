export const state = () => ({
  list: []
})

export const mutations = {
  clearVacancies(state) {
    state.list = []
  },
  setVacancies(state, e) {
    state.list.push(e)
  }
}

export const getters = {
  getVacancies: state => {
    return state.list
  }
}

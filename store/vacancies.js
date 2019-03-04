export const state = () => ({
  list: [],
  filterVacancyType: 0,
  filteredVacancies: []
})

export const mutations = {
  clearVacancies(state) {
    state.list = []
  },
  setVacancies(state, e) {
    state.list.push(e)
  },
  setFilteredVacancies(state, e) {
    state.filteredVacancies = e
  },
  setVacancyTypeFilter(state, vacancy) {
    state.filterVacancyType = +vacancy.target.value
  }
}

export const getters = {
  getVacancies: state => {
    return state.list
  },
  getFilteredVacancies: state => {
    return state.filteredVacancies
  },
  getVacancyTypeFilter: state => {
    return state.filterVacancyType
  }
}

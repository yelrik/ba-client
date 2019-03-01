export const state = () => ({
  counter: 0,
  cityChangedId: 4
})

export const mutations = {
  increment(state) {
    state.counter++
  },
  changeCityId(state, event) {
    state.cityChangedId = +event.target.value
  }
}

export const getters = {
  cityChangedId: state => {
    return state.cityChangedId
  }
}

import uniqueBy from 'lodash.uniqby'

export const state = () => ({
  counter: 0,
  cityChangedId: 4,
  cities: []
})

export const mutations = {
  resetCities(state) {
    state.cities = []
  },
  changeCityId(state, event) {
    state.cityChangedId = +event.target.value
  },
  setCities(state, e) {
    const arr = []
    e.data.forEach(el => {
      arr.push({ id: el.city_id.id, title: el.city_id.title })
      state.cities = uniqueBy(arr, 'id')
    })
  }
}

export const getters = {
  cityChangedId: state => {
    return state.cityChangedId
  },
  getCities: state => {
    return state.cities
  }
}

export const actions = {
  async nuxtServerInit({ commit }, { app }) {
    const cities = await app.$axios.$get('http://62.109.31.76/_/items/events', {
      params: { fields: ['city_id.*'] }
    })
    // eslint-disable-next-line no-console
    console.log(cities)
    commit('setCities', cities)
  }
}

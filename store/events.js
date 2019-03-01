import uniqBy from 'lodash.uniqby'
export const state = () => ({
  list: [],
  filterEventType: 0,
  filterSpecType: 0,
  filterMonth: 'all'
})

export const mutations = {
  add(state, event) {
    state.list.push(event)
  },
  emptyList(state) {
    state.list = []
  },
  changeEventType(state, event) {
    state.filterEventType = event.target.value
  },
  changeSpecType(state, event) {
    state.filterSpecType = +event.target.value
  },
  changeMonthFilter(state, event) {
    state.filterMonth = event
  },
  setMonthNull(state) {
    state.filterMonth = null
  }
}

export const getters = {
  list: state => {
    return state.list
  },
  filterMonth: state => {
    return String(state.filterMonth)
  },
  filterEventType: state => {
    return state.filterEventType
  },
  filterSpecType: state => {
    return state.filterSpecType
  },
  eventsType: state => {
    const arr = state.list.map(function(el) {
      return {
        id: el.event_type_id.id,
        title: el.event_type_id.title
      }
    })
    return uniqBy(arr, 'id')
  },
  specsType: state => {
    const arr = state.list.map(function(el) {
      return {
        id: el.spec_id.id,
        title: el.spec_id.title
      }
    })
    return uniqBy(arr, 'id')
  },
  activeEventsMonth: state => {
    const arr = state.list.map(function(el) {
      return String(new Date(el.start_datetime).getMonth())
    })
    return uniqBy(arr)
  }
}

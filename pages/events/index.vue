<template>
  <section class="container">
    <div class="columns">
      <div class="column">
        Тип:
        <EventsType />
      </div>
      <div class="column">
        Специализация:
        <SpecsType />
      </div>
    </div>
    <div class="columns">
      <div class="column">
        Месяц проведения: <DateFilters />
      </div>
    </div>
    <div v-for="eventsArr in chunkFilteredEvents" :key="eventsArr.id" class="columns">
      <div v-for="event in eventsArr" :key="event.id" class="column is-6">
        <div class="card">
          <div class="card-image">
            <figure class="image is-16by9">
              <img :src="event.image.data.full_url">
            </figure>
          </div>
          <header class="card-header">
            <router-link :to="{ name: 'events-id', params: { id: event.id } }">
              <a class="card-header-title" style="color: #3273dc">{{
                event.title
              }}</a>
            </router-link>
          </header>
          <div class="card-content">
            {{ event.place.title }}, {{ event.place.address }}
          </div>
          <footer class="card-footer">
            <p class="card-footer-item">
              <span class="icon">
                <img src="https://ionicons.com/ionicons/svg/md-time.svg">
              </span>
              {{ formateDate(event.start_datetime).time }}
            </p>
            <p class="card-footer-item">
              <span class="icon">
                <img src="https://ionicons.com/ionicons/svg/md-calendar.svg">
              </span>
              {{ formateDate(event.start_datetime).date }}
            </p>
            <router-link :to="{ name: 'events-id', params: { id: event.id } }">
              <p class="card-footer-item" style="justify-content: flex-end">
                Подробнее
              </p>
            </router-link>
          </footer>
        </div>
      </div>
    </div>
    <div v-if="chunkFilteredEvents.length === 0" class="columns">
      <div class="column">
        Мероприятий с данными настройками фильтров нет
      </div>
    </div>
  </section>
</template>

<script>
import chunk from 'lodash.chunk'
import DirectusSDK from '@directus/sdk-js'

import EventsType from '~/components/filters/eventsType.vue'
import SpecsType from '~/components/filters/specsType.vue'
import DateFilters from '~/components/filters/datefilters.vue'

export default {
  components: {
    EventsType,
    SpecsType,
    DateFilters
  },
  data() {
    return {}
  },
  computed: {
    filterCity() {
      return this.$store.getters.cityChangedId
    },
    filterEventType() {
      return this.$store.getters['events/filterEventType']
    },
    filterSpecType() {
      return this.$store.getters['events/filterSpecType']
    },
    filterMonth() {
      return this.$store.getters['events/filterMonth']
    },
    events() {
      return this.$store.getters['events/list']
    },
    chunkFilteredEvents() {
      return chunk(
        this.events.filter(e => {
          return (
            !!(
              this.filterEventType === 0 ||
              e.event_type_id.id === this.filterEventType
            ) &&
            (this.filterSpecType === 0 ||
              e.spec_id.id === this.filterSpecType) &&
            e.city_id.id === this.filterCity &&
            (this.filterMonth === 'all' ||
              new Date(e.start_datetime).getMonth() === +this.filterMonth)
          )
        }),
        2
      )
    },
    chunkEvents() {
      return chunk(this.events, 2)
    }
  },
  async fetch({ store }) {
    store.commit('events/emptyList')
    const client = new DirectusSDK({
      url: 'http://62.109.31.76',
      project: '_'
    })
    const response = await client.getItems('events', {
      fields: [
        'id',
        'city_id.*',
        'description',
        'image.*',
        'place.title',
        'place.address',
        'price',
        'title',
        'start_datetime',
        'end_datetime',
        'event_type_id.*',
        'spec_id.*'
      ]
    })
    response.data.forEach(event => {
      store.commit('events/add', {
        id: event.id,
        ...event
      })
    })
  },
  methods: {
    filters(item) {
      let result = false
      if (this.filterCity !== 0) {
        item.city_id.id === this.filterCity ? (result = true) : (result = false)
      }
      if (this.filterEventType !== 0) {
        item.event_type_id.id === this.filterEventType
          ? (result = true)
          : (result = false)
      }
      if (this.filterSpecType !== 0) {
        item.spec_id.id === this.filterSpecType
          ? (result = true)
          : (result = false)
      }
      return result
    },
    formateDate(strDatetime) {
      const arrDatetime = strDatetime.split(' ')
      const arrDate = arrDatetime[0].split('-')
      const arrTime = arrDatetime[1].split(':')
      const newArr = arrDate.concat(arrTime)
      const formated = {}
      const rawDate = new Date(...newArr)
      formated.raw = rawDate
      formated.date = arrDate[2] + '.' + arrDate[1] + '.' + arrDate[0]
      formated.time = arrTime[0] + ':' + arrTime[1]
      return formated
    }
  }
}
</script>

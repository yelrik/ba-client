<template>
  <section class="container">
    <div class="columns">
      <div class="column is-7">
        <div class="card">
          <div class="card-image">
            <figure class="image is-16by9">
              <img :src="event.image.data.full_url">
            </figure>
          </div>
          <header class="card-header">
            <p class="card-header-title">
              {{ event.title }}
            </p>
          </header>
          <div class="card-content">
            <p>
              <span class="icon">
                <img src="https://ionicons.com/ionicons/svg/md-time.svg">
              </span>
              <span>
                {{ formatStartDateTime.time }} {{ formatStartDateTime.date }} -
                {{ formatEndDateTime.time }} {{ formatEndDateTime.date }}
              </span>
            </p>
            <p>
              <span class="icon">
                <img src="https://ionicons.com/ionicons/svg/md-pin.svg">
              </span>
              <span>{{ event.place.title }}, {{ event.place.address }}</span>
            </p>
          </div>
          <div class="card-content" v-html="event.description">
            {{ event.description || "Описание скоро появится" }}
          </div>
        </div>
      </div>
      <div class="column is-1" />
      <div class="column is-4">
        <div class="columns">
          <div class="column">
            <strong>Организатор</strong>
          </div>
        </div>
        <div class="columns">
          <div class="column is-3">
            <figure class="image is-96x96">
              <img
                :src="event.organizer_id.picture.data.full_url"
                class="is-rounded"
              >
            </figure>
          </div>
          <div class="column is-7 is-offset-1">
            <p>
              <strong>{{ event.organizer_id.title }}</strong>
            </p>
            <p>
              <span class="icon">
                <img src="https://ionicons.com/ionicons/svg/md-globe.svg">
              </span>
              <span>
                <a :href="event.organizer_id.site">
                  {{ event.organizer_id.site }}
                </a>
              </span>
            </p>
            <p>
              <span class="icon">
                <img
                  src="https://ionicons.com/ionicons/svg/md-phone-portrait.svg"
                >
              </span>
              <span>{{ event.organizer_id.phone }}</span>
            </p>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <strong>Информация о билетах</strong>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <p>
              Стоимость:
              {{ event.price == "0" ? "бесплатно" : event.price + "руб." }}
            </p>
            <p v-if="event.booking_url.length">
              <a :href="event.booking_url" class="button is-success">Забронировать</a>
            </p>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <strong>Место проведения</strong>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <figure class="image">
              <img :src="mapUrl">
            </figure>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import DirectusSDK from '@directus/sdk-js'

export default {
  head() {
    return {
      title:
        this.event.organizer_id.title +
        ': ' +
        this.event.title +
        ' ' +
        this.formatStartDateTime.date +
        ' ' +
        this.event.place.address
    }
  },
  data() {
    return {
      event: {}
    }
  },
  computed: {
    latPlusLng() {
      return this.event.place.map.lng + ',' + this.event.place.map.lat
    },
    mapUrl() {
      return (
        'https://static-maps.yandex.ru/1.x/?ll=' +
        this.latPlusLng +
        '&size=375,375&z=16&l=map&pt=' +
        this.latPlusLng +
        ',pm2orgm'
      )
    },
    id() {
      return this.$route.params.id
    },
    formatStartDateTime() {
      return this.formateDate(this.event.start_datetime)
    },
    formatEndDateTime() {
      return this.formateDate(this.event.end_datetime)
    }
  },
  async asyncData({ params }) {
    const client = new DirectusSDK({
      url: 'http://62.109.31.76',
      project: '_'
    })
    const response = await client.getItem('events', params.id, {
      fields: [
        'id',
        'city_id.title',
        'description',
        'image.*',
        'place.*',
        'price',
        'title',
        'start_datetime',
        'end_datetime',
        'organizer_id.*',
        'organizer_id.picture.*',
        'booking_url'
      ]
    })
    return { event: response.data }
  },
  methods: {
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

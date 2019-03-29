<template>
  <div class="container">
    <div class="columns">
      <div class="column is-offset-1">
        <div class="columns">
          <div class="column">
            <div class="content">
              <h1>{{ vacancy.title }}</h1>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <div class="content">
              <h3>{{ vacancy.salary ? vacancy.salary + ' руб.' : 'зарплата договорная' }}</h3>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <p><span class="has-text-grey has-text-weight-bold">Система оплаты: </span>{{ vacancy.payment_type_id.title }}</p>
            <p><span class="has-text-grey has-text-weight-bold">Оплата за выход: </span>{{ vacancy.exit_fee ? 'да' : 'нет' }}</p>
            <p><span class="has-text-grey has-text-weight-bold">График работы: </span>{{ vacancy.employment_type_id.title }}</p>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <div class="content" v-html="vacancy.description">
              {{ vacancy.description }}
            </div>
          </div>
        </div>
      </div>
      <div class="column is-offset-1">
        <div class="columns">
          <div class="column">
            <div class="content">
              <p class="has-text-weight-bold is-uppercase">
                Место работы
              </p>
              <p>{{ vacancy.city_id.title }} , {{ vacancy.adress }}</p>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <figure class="image is-5by4">
              <img :src="mapUrl">
            </figure> 
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <span class="has-text-grey-light">Вакансия опубликована {{ new Date(vacancy.created_on).toLocaleDateString() }}</span>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <a href="#contacts" class="button is-info" @click="isActive = true">Узнать контакты</a>
          </div>
        </div>
        <div v-if="isActive" id="contacts" class="columns">
          <div class="column">
            <article class="message is-success">
              <div class="message-body">
                <p>
                  <span>Контактное лицо: </span>
                  <span class="has-text-weight-bold is-uppercase">{{ vacancy.contact_person }}</span>
                </p>
                <p>
                  <span>Телефон: </span>
                  <span class="has-text-weight-bold is-uppercase">
                    <a :href="'tel:' + '+7' + vacancy.phone" class="has-text-black button is-small">+7{{ vacancy.phone }}</a>
                  </span>
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DirectusSDK from '@directus/sdk-js'

export default {
  head() {
    return {
      title:
        'Вакансия: ' +
        this.vacancy.title +
        ' ' +
        'в г. ' +
        this.vacancy.city_id.title
    }
  },
  data() {
    return {
      vacancy: {},
      isActive: false
    }
  },
  computed: {
    latPlusLng() {
      return this.vacancy.coordinates.lng + ',' + this.vacancy.coordinates.lat
    },
    mapUrl() {
      return (
        'https://static-maps.yandex.ru/1.x/?ll=' +
        this.latPlusLng +
        '&size=300,240&z=16&l=map&pt=' +
        this.latPlusLng +
        ',pm2orgm'
      )
    },
    id() {
      return this.$route.params.id
    }
  },
  async asyncData({ params }) {
    const client = new DirectusSDK({
      url: 'http://62.109.31.76',
      project: '_'
    })
    const response = await client.getItem('vacancies', params.id, {
      fields: ['*.*']
    })
    return { vacancy: response.data }
  },
  methods: {}
}
</script>

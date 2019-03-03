<template>
  <div class="container">
    <div class="columns">
      <div v-for="vacancy in vacancies" :key="vacancy.id" class="column is-8">
        <div class="columns is-o">
          <div class="column is-8">
            <div class="content">
              <h3 class="has-text-success">
                {{ vacancy.title }}
              </h3>
            </div>
          </div>
          <div class="column is-4">
            <div class="content">
              <strong><span>{{ vacancy.salary }} руб.</span></strong>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <strong><span class="has-text-info tag is-medium">{{ vacancy.work_place }}</span></strong>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <p><span class="has-text-grey has-text-weight-bold">Система оплаты: </span>{{ vacancy.payment_type_id.title }}</p>
            <p><span class="has-text-grey has-text-weight-bold">Оплата за выход: </span>{{ vacancy.exit_fee ? 'да' : 'нет' }}</p>
            <p><span class="has-text-grey has-text-weight-bold">График работы: </span>{{ vacancy.employment_type_id.title }}</p>
          </div>
        </div>
        <!-- <div class="columns">
          <div class="column">
            <div class="content" v-html="vacancy.description">
              {{ vacancy.description }}
            </div>
          </div>
        </div> -->
        <div class="columns .is-variable">
          <div class="content">
            <div class="column">
              <h6>
                <span class="icon">
                  <img src="  ionicons/svg/md-pin.svg">
                </span>{{ vacancy.city_id.title }}, {{ vacancy.adress }}
              </h6>
            </div>
          </div>
        </div>
        <div class="columns .is-variable">
          <div class="column">
            <router-link :to="{ name: 'vacancies-id', params: { id: vacancy.id } }">
              <a class="button is-info">Подробнее</a>
            </router-link>
          </div>
        </div>
      </div>
      <div class="column is-4">
        Правая часть
      </div>
    </div>
  </div>
</template>


<script>
import DirectusSDK from '@directus/sdk-js'

export default {
  data() {
    return {}
  },
  computed: {
    vacancies() {
      return this.$store.getters['vacancies/getVacancies']
    }
  },
  async fetch({ store, params }) {
    store.commit('vacancies/clearVacancies')
    const client = new DirectusSDK({
      url: 'http://62.109.31.76',
      project: '_'
    })
    const response = await client.getItems('vacancies', {
      fields: ['*.*']
    })
    response.data.forEach(vacancy => {
      store.commit('vacancies/setVacancies', {
        id: vacancy.id,
        ...vacancy
      })
    })
  }
}
</script>

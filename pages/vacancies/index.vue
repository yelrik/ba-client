<template>
  <div class="container">
    <div class="columns">
      <div class="column">
        <span>Фильтр по специализации: </span><SpecType />
      </div>
    </div>
    <div v-for="vacanciesArr in chunkVacancies" :key="vacanciesArr.id" class="columns">
      <div v-for="vacancy in vacanciesArr" :key="vacancy.id" class="column is-offset-1 has-text-centered-mobile">
        <div class="columns">
          <div class="column">
            <div class="columns">
              <div class="column">
                <div class="content">
                  <h2 class="has-text-success">
                    {{ vacancy.title }}
                  </h2>
                </div>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <div class="content">
                  <strong><span>{{ vacancy.salary ? vacancy.salary + ' руб.' : ' зарплата договорная' }}</span></strong>
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
            <div class="columns">
              <div class="content">
                <div class="column">
                  <h6>
                    {{ vacancy.city_id.title }}, {{ vacancy.adress }}
                  </h6>
                </div>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <router-link :to="{ name: 'vacancies-id', params: { id: vacancy.id } }">
                  <a class="button is-info">Подробнее</a>
                </router-link>
              </div>
              <div class="column">
                <span class="has-text-grey-light">{{ new Date(vacancy.created_on).toLocaleDateString() }}</span>
              </div>
            </div>
          </div>
        </div>  
      </div>
    </div>
    <div v-if="chunkVacancies.length === 0" class="columns">
      <div class="column">
        Вакансий с данными настройками фильтров нет
      </div>
    </div>
  </div>
</template>

<script>
import DirectusSDK from '@directus/sdk-js'
import chunk from 'lodash.chunk'
import SpecType from '~/components/filters/vacancySpec.vue'

export default {
  head() {
    return {
      title: 'Актуальные вакансии',
      meta: [
        {
          name: 'description',
          content:
            'Вакансии парикмахера, мастера маникюра, косметолога' +
            this.cityTitle
        }
      ]
    }
  },
  components: {
    SpecType
  },
  data() {
    return {
      cityTitle: 'Краснодар'
    }
  },
  computed: {
    vacancies() {
      return this.$store.getters['vacancies/getVacancies']
    },
    filterVacancyType() {
      return this.$store.getters['vacancies/getVacancyTypeFilter']
    },
    filteredVacancies() {
      const filteredVacancies = this.vacancies.filter(e => {
        return (
          e.city_id.id === this.$store.getters.cityChangedId &&
          (e.spec_id.id === this.filterVacancyType ||
            this.filterVacancyType === 0)
        )
      })
      return filteredVacancies
    },
    sortFilteredVacancies() {
      const arr = this.filteredVacancies
      arr.sort(function(a, b) {
        return new Date(b.created_on) - new Date(a.created_on)
      })
      return arr
    },
    chunkVacancies() {
      return chunk(this.sortFilteredVacancies, 2)
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

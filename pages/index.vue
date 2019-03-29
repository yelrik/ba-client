<template>
  <div class="container">
    <section class="section">
      <div class="columns">
        <div class="column">
          <p class="title is-4 is-uppercase has-text-grey-light">
            Ближайшие события
          </p>
          <hr> 
        </div>
      </div>
      <div v-if="last5Events.length" class="content has-text-centered-mobile">
        <div v-for="event in last5Events" :key="event.id" class="columns is-vcentered">
          <div class="column is-2 is-size-4">
            <span class="has-text-weight-bold">{{ event.start_datetime | getDate }} </span>
          </div>
          <div class="column is-2">
            <span class="tag is-info">{{ event.price ? event.price + ' руб.' : 'бесплатно' }}</span>
          </div>
          <div class="column is-4">
            <span class="has-text-weight-semibold">"{{ event.title }}"</span>
          </div>
          <div class="column is-3">
            <span>{{ event.place.address }}</span>
          </div>
          <div class="column is-1">
            <router-link :to="{ name: 'events-id', params: { id: event.id } }">
              <span class="button is-small is-primary">Подробнее</span>
            </router-link>
          </div>
        </div>
      </div>
      <div v-else class="columns">
        <div class="columns">
          Событий нет
        </div>
      </div>
    </section>
    <section class="section">
      <div class="columns">
        <div class="column">
          <p class="title is-4 is-uppercase has-text-grey-light">
            Новые вакансии
          </p>
          <hr> 
        </div>
      </div>
      <div v-if="last5Vacancies.length" class="content has-text-centered-mobile">
        <div v-for="vacancy in last5Vacancies" :key="vacancy.id" class="columns is-vcentered">
          <div class="column is-2">
            <span class="has-text-weight-bold is-size-4">{{ vacancy.created_on | getDate }} </span>
          </div>
          <div class="column is-2">
            <span class="tag is-info">{{ vacancy.salary ? vacancy.salary + ' руб.' : 'зп на собеседовании' }}</span>
          </div>
          <div class="column is-4">
            <span class="has-text-weight-semibold">{{ vacancy.title }}</span>
          </div>
          <div class="column is-3">
            <span>{{ vacancy.adress }}</span>
          </div>
          <div class="column is-1">
            <router-link :to="{ name: 'vacancies-id', params: { id: vacancy.id } }">
              <span class="button is-small is-primary">Подробнее</span>
            </router-link>
          </div>
        </div>
      </div>
      <div v-else class="columns">
        <div class="column">
          <p>Вакансий пока нет</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
div.content > div.columns {
  border-bottom: dotted 1px #636060;
}
</style>


<script>
export default {
  head() {
    return {
      title: 'Главные события для профессионалов бьюти сферы',
      meta: [
        {
          name: 'description',
          content:
            'Мы собираем информацию о главных событиях бьюти индустрии в вашем городе. Мастер-классы для парикмахеров, мастеров маникюра, косметологов, а также для владельцев бьюти бизнеса'
        }
      ]
    }
  },
  data() {
    return {
      last5Events: [],
      last5Vacancies: [],
      cityTitle: ''
    }
  },
  computed: {
    cityId() {
      return this.$store.getters.cityChangedId
    }
  },
  watch: {
    cityId: function() {
      this.getList()
    }
  },
  mounted: async function() {
    const events = await this.$axios.$get(
      'http://62.109.31.76/get_last_events.php?id=' +
        this.$store.getters.cityChangedId
    )
    const vacancies = await this.$axios.$get(
      'http://62.109.31.76/_/items/vacancies?filter[city_id][eq]=' +
        this.$store.getters.cityChangedId +
        '&sort=-created_on&limit=5'
    )
    const cityTitle = await this.$axios.$get(
      'http://62.109.31.76/_/items/cities/' + this.$store.getters.cityChangedId
    )
    this.last5Vacancies = vacancies.data
    this.last5Events = events
    this.cityTitle = cityTitle.data.title
  },
  methods: {
    async getList() {
      const events = await this.$axios.$get(
        'http://62.109.31.76/get_last_events.php?id=' +
          this.$store.getters.cityChangedId
      )
      const vacancies = await this.$axios.$get(
        'http://62.109.31.76/_/items/vacancies?filter[city_id][eq]=' +
          this.$store.getters.cityChangedId +
          '&sort=-created_on&limit=5'
      )
      this.last5Vacancies = vacancies.data
      this.last5Events = events
    }
  }
}
</script>

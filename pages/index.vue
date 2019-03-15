<template>
  <section class="section hero">
    <div class="hero-body">
      <div v-for="event in last3Events" :key="event.id" class="container">
        <div class="columns">
          <div class="column">
            <p class="title is-2 has-text-centered">
              {{ event.title }}
            </p>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <p class="title is-4">
              {{ event.start_datetime | getDateAndTime }}
            </p>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <img :src="event.image.data.full_url" alt="">
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <p class="title is-5">
              {{ event.place.adress }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      last3Events: []
    }
  },
  computed: {
    cityId: function() {
      return this.$store.getters.cityChangedId
    }
  },
  watch: {
    cityId: function() {
      this.getList()
    }
  },
  mounted: async function() {
    const response = await this.$axios.$get(
      'http://62.109.31.76/test.php?id=' + this.$store.getters.cityChangedId
    )
    this.last3Events = response
  },
  methods: {
    async getList() {
      const response = await this.$axios.$get(
        'http://62.109.31.76/test.php?id=' + this.cityId
      )
      this.last3Events = response
    }
  }
}
</script>

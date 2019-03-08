<template>
  <div class="select is-small">
    <select :value="changedCityId" @change="onChange">
      <option v-for="city in cities" :key="city.id" :value="city.id">
        {{
          city.title
        }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      test: []
    }
  },

  computed: {
    changedCityId() {
      return this.$store.getters.cityChangedId
    },
    events() {
      return this.$store.getters['events/list']
    },
    cities() {
      return this.$store.getters.getCities
    }
  },
  methods: {
    onChange(e) {
      // const target = e.target.value
      this.$store.commit('changeCityId', e)
      // console.log(e.target.value)
    }
  }
}
</script>

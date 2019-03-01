<template>
  <div class="select is-rounded is-small">
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
import uniqBy from 'lodash.uniqby'

export default {
  data() {
    return {
      test: 0
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
      const arr = this.events.map(function(el) {
        return { id: el.city_id.id, title: el.city_id.title }
      })
      return uniqBy(arr, 'id')
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

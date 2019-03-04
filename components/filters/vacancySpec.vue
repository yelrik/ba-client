<template>
  <div class="select is-rounded is-small">
    <select :value="changedSpecType" @change="onChange">
      <option value="0">
        Все
      </option>
      <option v-for="spec in specsTypeList" :key="spec.id" :value="spec.id">
        {{
          spec.title
        }}
      </option>
    </select>
  </div>
</template>

<script>
import uniqBy from 'lodash.uniqby'

export default {
  computed: {
    changedSpecType() {
      return this.$store.getters['vacancies/getVacancyTypeFilter']
    },
    specsTypeList() {
      const specsList = []
      this.$store.getters['vacancies/getVacancies'].forEach(e => {
        specsList.push({ id: e.spec_id.id, title: e.spec_id.title })
      })
      return uniqBy(specsList, 'id')
    }
  },
  methods: {
    onChange(e) {
      // const target = e.target.value
      this.$store.commit('vacancies/setVacancyTypeFilter', e)
      // console.log(e.target.value)
    }
  }
}
</script>

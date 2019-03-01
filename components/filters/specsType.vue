<template>
  <div class="select is-rounded is-small">
    <select :value="changedSpecType" @change="onChange">
      <option value="0">
        Все
      </option>
      <option v-for="spec in specsType" :key="spec.id" :value="spec.id">
        {{
          spec.title
        }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  computed: {
    changedSpecType() {
      return this.$store.getters['events/filterSpecType']
    },
    specsType() {
      return this.$store.getters['events/specsType']
    }
  },
  methods: {
    onChange(e) {
      // const target = e.target.value
      this.$store.commit('events/changeSpecType', e)
      // console.log(e.target.value)
    }
  }
}
</script>

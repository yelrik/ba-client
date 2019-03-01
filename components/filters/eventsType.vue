<template>
  <!-- <div class="field"> -->
  <!-- <div class="control"> -->
  <div class="select is-rounded is-small">
    <select :value="changedEventType" @change="onChange">
      <option value="0">
        Все
      </option>
      <option v-for="type in eventsType" :key="type.id" :value="type.id">
        {{
          type.title
        }}
      </option>
    </select>
  </div>
  <!-- </div> -->
  <!-- </div> -->
</template>

<script>
export default {
  computed: {
    changedEventType() {
      return this.$store.getters['events/filterEventType']
    },
    eventsType() {
      return this.$store.getters['events/eventsType']
    }
  },
  methods: {
    onChange(e) {
      // const target = e.target.value
      this.$store.commit('events/changeEventType', e)
      // console.log(e.target.value)
    }
  }
}
</script>

<template>
  <div class="select is-small is-rounded">
    <select :value="value" @change="onChange">
      <option value="0">
        Все
      </option>
      <option
        v-for="el in filteredMonthObject"
        :key="el.value"
        :value="el.value"
      >
        {{ el.title }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      monthObject: [
        { value: '0', title: 'январь' },
        { value: '1', title: 'февраль' },
        { value: '2', title: 'март' },
        { value: '3', title: 'апрель' },
        { value: '4', title: 'май' },
        { value: '5', title: 'июнь' },
        { value: '6', title: 'июль' },
        { value: '7', title: 'август' },
        { value: '8', title: 'сентябрь' },
        { value: '9', title: 'октябрь' },
        { value: '10', title: 'ноябрь' },
        { value: '11', title: 'декабрь' }
      ]
    }
  },
  computed: {
    value() {
      return this.$store.getters['events/filterMonth']
    },
    activeMonth() {
      return this.$store.getters['events/activeEventsMonth']
    },
    filteredMonthObject() {
      return this.monthObject.filter(function(e) {
        return ['1', '2'].includes(e.value)
      })
    }
  },
  methods: {
    onChange(e) {
      this.$store.commit('events/changeMonthFilter', e.target.value)
    },
    clearDate() {
      this.$store.commit('events/setMonthNull')
    }
  }
}
</script>

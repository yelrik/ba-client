<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <nuxt-link active-class="navbar-item" to="/">
        <span style="color: red">BEAUTY</span>
        <span style="color: blue">AFISHA</span>
      </nuxt-link>
      <a
        :class="{ 'is-active': burgerIsActive }"
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
        @click="toogle"
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </a>
    </div>
    <div :class="{ 'is-active': burgerIsActive }" class="navbar-menu">
      <div class="navbar-start">
        <nuxt-link class="navbar-item" to="/">
          Главная
        </nuxt-link>
        <nuxt-link class="navbar-item" to="/events">
          Мероприятия
        </nuxt-link>
        <nuxt-link class="navbar-item" to="/vacancies">
          Вакансии
        </nuxt-link>
        <nuxt-link class="navbar-item" to="/schools">
          Куда пойти учиться
        </nuxt-link>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          Выберите город:
          <Filters />
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
import Filters from '~/components/filters/changeCity.vue'

export default {
  components: {
    Filters
  },
  data() {
    return {
      burgerIsActive: false
    }
  },
  methods: {
    toogle() {
      this.burgerIsActive = !this.burgerIsActive
    }
  }
}
</script>

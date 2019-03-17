<template>
  <section class="hero is-primary">
    <div class="hero-head">
      <nav class="navbar is-size-4">
        <div class="navbar-brand">
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
          <div class="navbar-start has-text-centered content">
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
            <div class="navbar-item is-size-6">
              <span>Ваш город:&nbsp;</span><Filters />
            </div>
          </div>
        </div>
      </nav>
    </div>
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title">
          Beauty Afisha
        </h1>
        <h2 class="subtitle">
          Путеводитель для профессионалов в сфере красоты
        </h2>
      </div>
    </div>
  </section>
</template>

<style>
.hero {
  margin-bottom: 30px;
}
</style>

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

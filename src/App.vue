<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useTimerStore } from '@/stores/timer'

const timer = useTimerStore()
</script>

<template>
  <div v-if="!timer.isTiming" class="title-bar"></div>

  <section class="container">
    <header v-if="!timer.isTiming">
      <div class="wrapper">
        <nav>
          <RouterLink to="/">专注</RouterLink>
          <RouterLink to="/about">关于</RouterLink>
        </nav>
      </div>
    </header>

    <RouterView />
  </section>
</template>

<style scoped>
.title-bar {
  height: 35px;
  background-color: #323233;
  -webkit-app-region: drag;
}

.container {
  width: 100%;
  height: 100%;
  background-color: #1e1e1e;
  color: #fff;
  flex: 1;
}

header {
  line-height: 1.5;
  margin-top: 16px;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}
</style>

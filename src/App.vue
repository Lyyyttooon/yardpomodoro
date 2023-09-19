<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useTimerStore } from '@/stores/timer'
import { ref } from 'vue'

const timer = useTimerStore()
</script>

<template>
  <div v-if="!timer.isTiming" class="title-bar"></div>

  <header v-if="!timer.isTiming">
    <div class="wrapper">
      <nav>
        <RouterLink to="/">专注</RouterLink>
        <RouterLink to="/about">关于</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
.title-bar {
  height: 35px;
  background-color: #1f1f1f;
  -webkit-app-region: drag;
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

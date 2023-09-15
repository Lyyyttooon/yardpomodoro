<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useTimerStore } from '@/stores/timer'
import { ref } from 'vue'

const timer = useTimerStore()
const isTiming = ref('')
</script>

<template>
  <div class="content" :class="isTiming">
    <header>
      <div class="wrapper" v-if="!timer.isTiming">
        <nav>
          <RouterLink to="/">专注</RouterLink>
          <RouterLink to="/about">关于</RouterLink>
        </nav>
      </div>
    </header>

    <RouterView />
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}
</style>

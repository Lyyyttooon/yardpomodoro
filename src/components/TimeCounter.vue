<script setup>
import { ref } from 'vue'

const timeCount = ref(0)

setInterval(() => {
  timeCount.value++
}, 1000);
</script>

<template>
  <div>{{ timeCount }}</div>
</template>

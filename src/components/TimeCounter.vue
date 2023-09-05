<script setup lang="ts">
import { ref, computed } from 'vue'
import { formatToTime } from '@/utils/time'

const timeCount = ref(0)

setInterval(() => {
  timeCount.value++
}, 1000)

const countHours = computed(() => {
  return formatToTime(Math.floor(timeCount.value / 3600))
})

const countMinutes = computed(() => {
  return formatToTime(Math.floor((timeCount.value % 3600) / 60))
})

const countSeconds = computed(() => {
  return formatToTime(Math.floor(timeCount.value % 60))
})
</script>

<template>
  <div>{{ countHours }}:{{ countMinutes }}:{{ countSeconds }}</div>
</template>

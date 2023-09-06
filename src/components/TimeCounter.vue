<script setup lang="ts">
import { ref, computed } from 'vue'
import { formatToTime } from '@/utils/time'

const timeCount = ref(0)
let timingInterval: number | undefined = undefined
let isStop = true

const countHours = computed(() => {
  return formatToTime(Math.floor(timeCount.value / 3600))
})

const countMinutes = computed(() => {
  return formatToTime(Math.floor((timeCount.value % 3600) / 60))
})

const countSeconds = computed(() => {
  return formatToTime(Math.floor(timeCount.value % 60))
})

function startTiming() {
  if (!isStop) {
    return
  }
  isStop = false
  timingInterval = window.setInterval(() => {
    timeCount.value++
  }, 1000)
}

function stopTiming() {
  if (isStop) {
    return
  }
  isStop = true
  window.clearInterval(timingInterval)
  timeCount.value = 0
}
</script>

<template>
  <div>{{ countHours }}:{{ countMinutes }}:{{ countSeconds }}</div>
  <el-button @click="startTiming" round>开始计时</el-button>
  <el-button @click="stopTiming" round>停止计时</el-button>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { formatToTime } from '@/utils/time'

const setMinutes = ref(25)
const timeCount = ref(0)
const isTiming = ref(false)

let timingInterval: number | undefined = undefined

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
  if (isTiming.value) {
    return
  }
  isTiming.value = true
  timeCount.value = setMinutes.value * 60

  timeCount.value--
  timingInterval = window.setInterval(() => {
    timeCount.value--
  }, 1000)
}

function stopTiming() {
  if (!isTiming.value) {
    return
  }
  isTiming.value = false
  window.clearInterval(timingInterval)
  timeCount.value = 0
}
</script>

<template>
  <p v-if="!isTiming">
    <span>时间：</span>
    <el-input-number v-model="setMinutes" :min="1" :max="600" />
  </p>
  <div v-else>{{ countHours }}:{{ countMinutes }}:{{ countSeconds }}</div>
  <el-button v-if="!isTiming" @click="startTiming" round>开始计时</el-button>
  <el-button v-else @click="stopTiming" round>停止计时</el-button>
</template>

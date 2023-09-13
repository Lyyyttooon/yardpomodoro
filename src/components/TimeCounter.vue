<script setup lang="ts">
import { ref, computed } from 'vue'
import { formatToTime } from '@/utils/time'
import { useTimerStore } from '@/stores/timer'
import { Select, Close } from '@element-plus/icons-vue'

const timer = useTimerStore()

const minFouceMinutes = 10
const maxFouceMinutes = 1440
const defaultFouceMinutes = 25

const setMinutes = ref(defaultFouceMinutes)
const countTimeSeconds = ref(0)
const isCounting = ref(false)
const dialogVisible = ref(false)

let timingInterval: number | undefined = undefined

const countHours = computed(() => {
  return formatToTime(Math.floor(countTimeSeconds.value / 3600))
})

const countMinutes = computed(() => {
  return formatToTime(Math.floor((countTimeSeconds.value % 3600) / 60))
})

const countSeconds = computed(() => {
  return formatToTime(Math.floor(countTimeSeconds.value % 60))
})

function startTiming() {
  if (isCounting.value) {
    return
  }

  window.electronAPI.setFullScreen(true)
  timer.toggle()

  isCounting.value = true
  countTimeSeconds.value = setMinutes.value * 60

  countTimeSeconds.value--
  timingInterval = window.setInterval(() => {
    if (countTimeSeconds.value <= 0) {
      dialogVisible.value = true
      stopTiming()
      return
    }
    countTimeSeconds.value--
  }, 1000)
}

function stopTiming() {
  if (!isCounting.value) {
    return
  }

  window.electronAPI.setFullScreen(false)
  timer.toggle()

  isCounting.value = false
  window.clearInterval(timingInterval)
  countTimeSeconds.value = 0
}

function setMinutesBlur() {
  setMinutes.value = Math.floor(setMinutes.value)
}
</script>

<template>
  <div v-if="!isCounting" class="timer-setting">
    <p>
      <span>计划时间：</span>
      <el-input-number
        v-model="setMinutes"
        :min="minFouceMinutes"
        :max="maxFouceMinutes"
        @blur="setMinutesBlur"
      />
      <span style="margin-left: 8px">分钟</span>
    </p>
    <el-button type="primary" :icon="Select" @click="startTiming">开始专注</el-button>
  </div>

  <div v-else class="timer-counting">
    <div class="timer">{{ countHours }}:{{ countMinutes }}:{{ countSeconds }}</div>
    <el-button type="danger" :icon="Close" @click="stopTiming">停止计时</el-button>
  </div>

  <el-dialog v-model="dialogVisible" :close-on-click-modal="false" title="完成">
    <span>恭喜您完成了{{ setMinutes }}分钟的专注！</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
.timer-setting {
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  align-items: center;
}
.timer-counting {
  display: flex;
  flex-direction: column;
  align-items: center;

  > .timer {
    font-size: 296px;
  }
}
</style>

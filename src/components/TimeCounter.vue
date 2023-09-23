<script setup lang="ts">
import { ref, computed } from 'vue'
import { formatToTime } from '@/utils/time'
import { useTimerStore } from '@/stores/timer'
import { Select, Close } from '@element-plus/icons-vue'

const timer = useTimerStore()

// 专注时间
const minFouceMinutes = 10
const maxFouceMinutes = 1440
const defaultFouceMinutes = 25

// 小休时间
const minShortBreakMinutes = 5
const maxShortBreakMinutes = 60
const defaultShortBreakMinutes = 5

// 大休时间
const minLongBreakMinutes = 15
const maxLongBreakMinutes = 60
const defaultLongBreakMinutes = 15

let countBreakTime = 0

const setFouceMinutes = ref(defaultFouceMinutes)
const setShortBreakMinutes = ref(defaultShortBreakMinutes)
const setLongBreakMinutes = ref(defaultLongBreakMinutes)

const countTimeSeconds = ref(0)
const isFoucing = ref(false)
const isCounting = ref(false)
const dialogVisible = ref(false)
const showStopButton = ref(false)

let timingInterval: number | undefined = undefined
let visibilityHiddenTimeout: number | undefined = undefined

// 计算小时
const countHours = computed(() => {
  return formatToTime(Math.floor(countTimeSeconds.value / 3600))
})

// 计算分钟
const countMinutes = computed(() => {
  return formatToTime(Math.floor((countTimeSeconds.value % 3600) / 60))
})

// 计算秒数
const countSeconds = computed(() => {
  return formatToTime(Math.floor(countTimeSeconds.value % 60))
})

// 开始计时
function startTiming() {
  if (isCounting.value) {
    return
  }

  window.electronAPI.setFullScreen(true)
  timer.toggle()

  isCounting.value = true
  isFoucing.value = true
  countTimeSeconds.value = setFouceMinutes.value * 60

  countTimeSeconds.value--
  timingInterval = window.setInterval(() => {
    if (countTimeSeconds.value <= 0) {
      if (isFoucing.value && countBreakTime < 2) {
        isFoucing.value = false
        countBreakTime++
        countTimeSeconds.value = setShortBreakMinutes.value * 60
      } else if (isFoucing.value && countBreakTime === 2) {
        isFoucing.value = false
        countBreakTime = 0
        countTimeSeconds.value = setLongBreakMinutes.value * 60
      } else {
        isFoucing.value = true
        dialogVisible.value = true
        stopTiming()
        return
      }
    }
    countTimeSeconds.value--
  }, 1000)
}

// 停止计时
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

// 页面隐藏时，首先提示用户，然后3秒后停止计时
function visibilityChangeHandler() {
  if (!isCounting.value) {
    return
  }
  if (document.visibilityState === 'hidden') {
    const n = new Notification('提示！', {
      body: '页面隐藏，在3秒后停止计时'
    })
    n.onclick = () => {
      console.log('click Notification')
    }
  } else {
    window.clearTimeout(visibilityHiddenTimeout)
  }
}

// 3秒后隐藏停止计时按钮
window.setInterval(() => {
  if (isCounting.value && showStopButton.value) {
    showStopButton.value = false
  }
}, 3000)

// 鼠标移动时，显示停止计时按钮
window.onmousemove = () => {
  if (isCounting.value) {
    showStopButton.value = true
  }
}

document.addEventListener('visibilitychange', visibilityChangeHandler)
</script>

<template>
  <div v-if="!isCounting" class="timer-setting">
    <p>
      <span>专注时间：</span>
      <el-input-number
        v-model="setFouceMinutes"
        :min="minFouceMinutes"
        :max="maxFouceMinutes"
        @blur="() => (setFouceMinutes = Math.floor(setFouceMinutes))"
      />
      <span style="margin-left: 4px">分钟</span>
    </p>
    <p>
      <span>小休时间：</span>
      <el-input-number
        v-model="setShortBreakMinutes"
        :min="minShortBreakMinutes"
        :max="maxShortBreakMinutes"
        @blur="() => (setShortBreakMinutes = Math.floor(setShortBreakMinutes))"
      />
      <span style="margin-left: 8px">分钟</span>
    </p>
    <p>
      <span>大休时间：</span>
      <el-input-number
        v-model="setLongBreakMinutes"
        :min="minLongBreakMinutes"
        :max="maxLongBreakMinutes"
        @blur="() => (setLongBreakMinutes = Math.floor(setLongBreakMinutes))"
      />
      <span style="margin-left: 8px">分钟</span>
    </p>
    <el-button type="primary" :icon="Select" @click="startTiming">开始专注</el-button>
  </div>

  <div v-else class="timer-counting">
    <div class="timer">{{ countHours }}:{{ countMinutes }}:{{ countSeconds }}</div>
    <transition name="fade">
      <el-button type="danger" :icon="Close" @click="stopTiming" v-show="showStopButton"
        >停止计时</el-button
      >
    </transition>
  </div>

  <el-dialog v-model="dialogVisible" :close-on-click-modal="false" title="完成">
    <span>恭喜您完成了{{ setFouceMinutes }}分钟的专注！</span>
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
  height: 100%;
  width: 100%;
  color: #d4d4d4;

  > .timer {
    font-size: 296px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

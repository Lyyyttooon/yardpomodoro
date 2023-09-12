import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTimerStore = defineStore('timer', () => {
  const isTiming = ref(false)
  function toggle() {
    isTiming.value = !isTiming.value
  }

  return { isTiming, toggle }
})

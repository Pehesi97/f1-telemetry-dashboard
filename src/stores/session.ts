import { defineStore } from 'pinia'

export const useSessionStore = defineStore({
  id: 'session',
  state: () => ({
    aiDifficulty: -1,
    track: -1,
    weather: null,
    players: [],
    playerNumbers: -1
  })
})

import { create } from 'zustand'

interface ViewerSettings {
  /** Player model animation enabled */
  playerAnimate: boolean
  /** Player model auto-rotation enabled */
  playerRotate: boolean
  /** Equipment model auto-rotation enabled */
  equipmentRotate: boolean
  /** Enemy model auto-rotation enabled */
  enemyRotate: boolean
}

interface SettingsState extends ViewerSettings {
  /** Toggle player animation */
  setPlayerAnimate: (value: boolean) => void
  /** Toggle player rotation */
  setPlayerRotate: (value: boolean) => void
  /** Toggle equipment rotation */
  setEquipmentRotate: (value: boolean) => void
  /** Toggle enemy rotation */
  setEnemyRotate: (value: boolean) => void
}

/**
 * Settings Store
 * 
 * In-memory app settings (persists during session)
 */
export const useSettingsStore = create<SettingsState>((set) => ({
  // Default values
  playerAnimate: true,
  playerRotate: true,
  equipmentRotate: true,
  enemyRotate: true,

  setPlayerAnimate: (value) => set({ playerAnimate: value }),
  setPlayerRotate: (value) => set({ playerRotate: value }),
  setEquipmentRotate: (value) => set({ equipmentRotate: value }),
  setEnemyRotate: (value) => set({ enemyRotate: value }),
}))

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

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

interface AppSettings {
  /** Custom Minecraft-style cursor enabled */
  customCursor: boolean
  /** Show isometric 3D head in header instead of 2D face */
  isometricHeaderAvatar: boolean
}

interface SettingsState extends ViewerSettings, AppSettings {
  /** Toggle player animation */
  setPlayerAnimate: (value: boolean) => void
  /** Toggle player rotation */
  setPlayerRotate: (value: boolean) => void
  /** Toggle equipment rotation */
  setEquipmentRotate: (value: boolean) => void
  /** Toggle enemy rotation */
  setEnemyRotate: (value: boolean) => void
  /** Toggle custom cursor */
  setCustomCursor: (value: boolean) => void
  /** Toggle isometric header avatar */
  setIsometricHeaderAvatar: (value: boolean) => void
}

/**
 * Settings Store
 *
 * Persisted app settings using localStorage
 */
export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      // Default values - Viewer settings
      playerAnimate: true,
      playerRotate: true,
      equipmentRotate: true,
      enemyRotate: true,

      // Default values - App settings
      customCursor: false,
      isometricHeaderAvatar: true,

      setPlayerAnimate: (value) => set({ playerAnimate: value }),
      setPlayerRotate: (value) => set({ playerRotate: value }),
      setEquipmentRotate: (value) => set({ equipmentRotate: value }),
      setEnemyRotate: (value) => set({ enemyRotate: value }),
      setCustomCursor: (value) => set({ customCursor: value }),
      setIsometricHeaderAvatar: (value) => set({ isometricHeaderAvatar: value }),
    }),
    {
      name: 'requiem-settings',
    }
  )
)

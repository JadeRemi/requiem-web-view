import { create } from 'zustand'
import type { PlayerDTO } from '../types/api'

interface PlayerState {
  /** Currently selected player for profile view */
  selectedPlayer: PlayerDTO | null
  /** Set the selected player */
  setSelectedPlayer: (player: PlayerDTO) => void
  /** Clear selected player */
  clearSelectedPlayer: () => void
}

/**
 * Player Store
 * 
 * Manages selected player state for profile viewing
 */
export const usePlayerStore = create<PlayerState>((set) => ({
  selectedPlayer: null,
  
  setSelectedPlayer: (player) => set({ selectedPlayer: player }),
  
  clearSelectedPlayer: () => set({ selectedPlayer: null }),
}))


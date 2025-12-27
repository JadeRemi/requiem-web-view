import { useState, useEffect, useCallback, createContext, useContext, ReactNode } from 'react'
import { Icon, IconName } from './Icon'

export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'achievement'

/** Base duration for toasts in ms */
const BASE_DURATION = 2500

export interface ToastMessage {
  id: string
  type: ToastType
  message: string
  /** When this toast should be removed (timestamp) */
  removeAt: number
  /** Whether toast is in exit animation */
  isExiting?: boolean
  /** Fixed position index (assigned at creation) */
  slotIndex: number
  /** Achievement-specific fields */
  achievementTitle?: string
  achievementIcon?: IconName
}

interface AchievementOptions {
  title: string
  description: string
  icon?: IconName
  duration?: number
}

interface ToastContextValue {
  toasts: ToastMessage[]
  addToast: (type: ToastType, message: string, duration?: number) => void
  addAchievement: (options: AchievementOptions) => void
  dismissToast: (id: string) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

/** Generate unique ID for toasts */
function generateId(): string {
  return `toast-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

/** Height of each toast slot in pixels (largest toast + gap) */
const TOAST_SLOT_HEIGHT = 72

/** Achievement toast item */
function AchievementToastItem({
  toast,
  onDismiss,
}: {
  toast: ToastMessage
  onDismiss: () => void
}) {
  const topOffset = toast.slotIndex * TOAST_SLOT_HEIGHT

  return (
    <div
      className={`toast-achievement ${toast.isExiting ? 'toast-exiting' : ''}`}
      style={{ top: topOffset }}
      onClick={onDismiss}
    >
      <div className="toast-achievement-icon">
        {toast.achievementIcon && <Icon name={toast.achievementIcon} size={24} />}
      </div>
      <div className="toast-achievement-content">
        <span className="toast-achievement-title">{toast.achievementTitle}</span>
        <span className="toast-achievement-description">{toast.message}</span>
      </div>
    </div>
  )
}

/** Toast notification item */
function ToastItem({
  toast,
  onDismiss,
}: {
  toast: ToastMessage
  onDismiss: () => void
}) {
  const icons: Record<Exclude<ToastType, 'achievement'>, string> = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  }

  if (toast.type === 'achievement') {
    return <AchievementToastItem toast={toast} onDismiss={onDismiss} />
  }

  const topOffset = toast.slotIndex * TOAST_SLOT_HEIGHT

  return (
    <div
      className={`toast toast-${toast.type} ${toast.isExiting ? 'toast-exiting' : ''}`}
      style={{ top: topOffset }}
      onClick={onDismiss}
    >
      <span className="toast-icon">{icons[toast.type]}</span>
      <span className="toast-message">{toast.message}</span>
      <button className="toast-close" onClick={onDismiss}>×</button>
    </div>
  )
}

/** How much to reduce remaining time when a new toast is added (ms) */
const TIME_REDUCTION = 500
/** Minimum time a toast will remain visible (ms) */
const MIN_TIME_LEFT = 400

/** Toast container - renders all active toasts */
function ToastContainer() {
  const context = useContext(ToastContext)
  if (!context) return null

  const { toasts, dismissToast } = context

  if (toasts.length === 0) return null

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onDismiss={() => dismissToast(toast.id)}
        />
      ))}
    </div>
  )
}

/** Exit animation duration in ms */
const EXIT_ANIMATION_DURATION = 300

/** Toast provider - wrap app to enable toasts */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  // Handle automatic toast timing
  useEffect(() => {
    if (toasts.length === 0) return

    const now = Date.now()

    // Find the next toast that needs to start exiting (not already exiting)
    const nonExitingToasts = toasts.filter((t) => !t.isExiting)
    if (nonExitingToasts.length === 0) return

    // Find earliest removeAt among non-exiting toasts
    const nextExitTime = Math.min(...nonExitingToasts.map((t) => t.removeAt - EXIT_ANIMATION_DURATION))
    const delay = Math.max(0, nextExitTime - now)

    const timer = setTimeout(() => {
      const currentTime = Date.now()
      setToasts((prev) =>
        prev.map((t) => {
          // Start exit animation for toasts whose time has come
          if (!t.isExiting && t.removeAt - EXIT_ANIMATION_DURATION <= currentTime) {
            return { ...t, isExiting: true }
          }
          return t
        })
      )
    }, delay)

    return () => clearTimeout(timer)
  }, [toasts])

  // Handle removal after exit animation completes
  useEffect(() => {
    const exitingToasts = toasts.filter((t) => t.isExiting)
    if (exitingToasts.length === 0) return

    const now = Date.now()
    // Find the earliest removal time
    const nextRemoveTime = Math.min(...exitingToasts.map((t) => t.removeAt))
    const delay = Math.max(0, nextRemoveTime - now)

    const timer = setTimeout(() => {
      const currentTime = Date.now()
      setToasts((prev) => prev.filter((t) => !t.isExiting || t.removeAt > currentTime))
    }, delay)

    return () => clearTimeout(timer)
  }, [toasts])

  const addToast = useCallback((type: ToastType, message: string, duration?: number) => {
    const id = generateId()
    const now = Date.now()
    setToasts((prev) => {
      // Reduce remaining time for existing non-exiting toasts
      const updated = prev.map((t) => {
        if (t.isExiting) return t
        const newRemoveAt = Math.max(now + MIN_TIME_LEFT + EXIT_ANIMATION_DURATION, t.removeAt - TIME_REDUCTION)
        return { ...t, removeAt: newRemoveAt }
      })
      // Find next available slot index
      const usedSlots = new Set(prev.map((t) => t.slotIndex))
      let slotIndex = 0
      while (usedSlots.has(slotIndex)) slotIndex++

      const baseDuration = duration ?? BASE_DURATION
      const newToast: ToastMessage = { id, type, message, removeAt: now + baseDuration, slotIndex }
      return [...updated, newToast]
    })
  }, [])

  const addAchievement = useCallback((options: AchievementOptions) => {
    const id = generateId()
    const now = Date.now()
    setToasts((prev) => {
      // Reduce remaining time for existing non-exiting toasts
      const updated = prev.map((t) => {
        if (t.isExiting) return t
        const newRemoveAt = Math.max(now + MIN_TIME_LEFT + EXIT_ANIMATION_DURATION, t.removeAt - TIME_REDUCTION)
        return { ...t, removeAt: newRemoveAt }
      })
      // Find next available slot index
      const usedSlots = new Set(prev.map((t) => t.slotIndex))
      let slotIndex = 0
      while (usedSlots.has(slotIndex)) slotIndex++

      const baseDuration = options.duration ?? BASE_DURATION
      const newToast: ToastMessage = {
        id,
        type: 'achievement',
        message: options.description,
        achievementTitle: options.title,
        removeAt: now + baseDuration,
        slotIndex,
      }
      if (options.icon !== undefined) {
        newToast.achievementIcon = options.icon
      }
      return [...updated, newToast]
    })
  }, [])

  const dismissToast = useCallback((id: string) => {
    const now = Date.now()
    setToasts((prev) =>
      prev.map((t) => {
        if (t.id === id && !t.isExiting) {
          return { ...t, isExiting: true, removeAt: now + EXIT_ANIMATION_DURATION }
        }
        return t
      })
    )
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, addToast, addAchievement, dismissToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  )
}

/** Hook to use toast notifications */
export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }

  return {
    success: (message: string, duration?: number) => context.addToast('success', message, duration),
    error: (message: string, duration?: number) => context.addToast('error', message, duration),
    warning: (message: string, duration?: number) => context.addToast('warning', message, duration),
    info: (message: string, duration?: number) => context.addToast('info', message, duration),
    achievement: (options: AchievementOptions) => context.addAchievement(options),
  }
}

export type { AchievementOptions }


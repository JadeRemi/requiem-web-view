import { useState, useEffect, useCallback, createContext, useContext, ReactNode } from 'react'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface ToastMessage {
  id: string
  type: ToastType
  message: string
  duration?: number
}

interface ToastContextValue {
  toasts: ToastMessage[]
  addToast: (type: ToastType, message: string, duration?: number) => void
  removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

/** Generate unique ID for toasts */
function generateId(): string {
  return `toast-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

/** Toast notification item */
function ToastItem({ toast, onRemove }: { toast: ToastMessage; onRemove: () => void }) {
  useEffect(() => {
    const duration = toast.duration ?? 4000
    const timer = setTimeout(onRemove, duration)
    return () => clearTimeout(timer)
  }, [toast.duration, onRemove])

  const icons: Record<ToastType, string> = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  }

  return (
    <div className={`toast toast-${toast.type}`} onClick={onRemove}>
      <span className="toast-icon">{icons[toast.type]}</span>
      <span className="toast-message">{toast.message}</span>
      <button className="toast-close" onClick={onRemove}>×</button>
    </div>
  )
}

/** Toast container - renders all active toasts */
function ToastContainer() {
  const context = useContext(ToastContext)
  if (!context) return null

  const { toasts, removeToast } = context

  if (toasts.length === 0) return null

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onRemove={() => removeToast(toast.id)}
        />
      ))}
    </div>
  )
}

/** Toast provider - wrap app to enable toasts */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const addToast = useCallback((type: ToastType, message: string, duration?: number) => {
    const id = generateId()
    const newToast: ToastMessage = { id, type, message }
    if (duration !== undefined) {
      newToast.duration = duration
    }
    setToasts((prev) => [...prev, newToast])
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
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
  }
}


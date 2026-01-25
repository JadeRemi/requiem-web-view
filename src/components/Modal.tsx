import { useEffect, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import '../styles/components/modal.css'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

/**
 * Modal component with outside-click-to-close functionality
 * No close button - clicking the backdrop closes the modal
 */
export function Modal({ isOpen, onClose, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const [isClosing, setIsClosing] = useState(false)
  const [shouldRender, setShouldRender] = useState(isOpen)

  // Handle opening and closing animations
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true)
      setIsClosing(false)
    } else if (shouldRender) {
      setIsClosing(true)
      const timer = setTimeout(() => {
        setShouldRender(false)
        setIsClosing(false)
      }, 200) // Match animation duration
      return () => clearTimeout(timer)
    }
  }, [isOpen, shouldRender])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (shouldRender) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [shouldRender])

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!shouldRender) return null

  return createPortal(
    <div className={`modal-backdrop ${isClosing ? 'closing' : ''}`} onClick={handleBackdropClick}>
      <div className={`modal-content ${isClosing ? 'closing' : ''}`} ref={modalRef}>
        {children}
      </div>
    </div>,
    document.body
  )
}

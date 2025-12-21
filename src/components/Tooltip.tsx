import { useState, useRef, useCallback, ReactNode, CSSProperties, useEffect, RefObject } from 'react'
import { createPortal } from 'react-dom'

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right'

interface TooltipProps {
  /** Content to display in tooltip */
  content: ReactNode
  /** Position relative to trigger element */
  position?: TooltipPosition
  /** Element that triggers the tooltip */
  children: ReactNode
  /** Delay before showing tooltip (ms) */
  delay?: number
  /** Optional ref to element for positioning (tooltip points here instead of wrapper) */
  anchorRef?: RefObject<HTMLElement>
}

/**
 * Calculate tooltip position based on trigger element
 */
function getTooltipStyle(position: TooltipPosition, rect: DOMRect): CSSProperties {
  const gap = 8 // Distance from element
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2

  switch (position) {
    case 'top':
      return {
        left: centerX,
        top: rect.top - gap,
        transform: 'translate(-50%, -100%)',
      }
    case 'bottom':
      return {
        left: centerX,
        top: rect.bottom + gap,
        transform: 'translate(-50%, 0)',
      }
    case 'left':
      return {
        left: rect.left - gap,
        top: centerY,
        transform: 'translate(-100%, -50%)',
      }
    case 'right':
      return {
        left: rect.right + gap,
        top: centerY,
        transform: 'translate(0, -50%)',
      }
  }
}

/**
 * Portal wrapper for tooltip content
 */
function TooltipPortal({ 
  content, 
  position, 
  triggerRect 
}: { 
  content: ReactNode
  position: TooltipPosition
  triggerRect: DOMRect 
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  if (!mounted) return null

  const tooltipStyle = getTooltipStyle(position, triggerRect)

  return createPortal(
    <div className={`tooltip tooltip-${position}`} style={tooltipStyle}>
      <div className="tooltip-content">{content}</div>
      <div className={`tooltip-beak tooltip-beak-${position}`} />
    </div>,
    document.body
  ) as React.ReactElement
}

/**
 * Tooltip Component
 * 
 * Displays a tooltip bubble with a beak pointing to the trigger element.
 * Tooltip is destroyed on unhover, not just hidden.
 * 
 * @example
 * <Tooltip content="Click to animate" position="top">
 *   <button>Animate</button>
 * </Tooltip>
 */
export function Tooltip({ content, position = 'top', children, delay = 0, anchorRef }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [triggerRect, setTriggerRect] = useState<DOMRect | null>(null)
  const triggerRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<number | null>(null)

  const showTooltip = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    const show = () => {
      // Use anchorRef for positioning if provided, otherwise use trigger wrapper
      const targetElement = anchorRef?.current ?? triggerRef.current
      if (targetElement) {
        setTriggerRect(targetElement.getBoundingClientRect())
        setIsVisible(true)
      }
    }

    if (delay > 0) {
      timeoutRef.current = window.setTimeout(show, delay)
    } else {
      show()
    }
  }, [delay, anchorRef])

  const hideTooltip = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setIsVisible(false)
    setTriggerRect(null)
  }, [])

  return (
    <div
      ref={triggerRef}
      className="tooltip-trigger"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {children}
      {isVisible && triggerRect && (
        <TooltipPortal content={content} position={position} triggerRect={triggerRect} />
      )}
    </div>
  )
}

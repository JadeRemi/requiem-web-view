import { CSSProperties, ReactNode, createElement } from 'react'
import {
  TypographyVariant,
  VARIANT_FONTS,
  VARIANT_SIZES,
  VARIANT_WEIGHTS,
  VARIANT_ELEMENTS,
} from '../types/typography'

interface TypographyProps {
  /** Text variant determining font and size */
  variant: TypographyVariant
  /** Content to render */
  children: ReactNode
  /** Additional CSS class */
  className?: string
  /** Override text color */
  color?: string
  /** Center align text */
  center?: boolean
  /** Additional inline styles */
  style?: CSSProperties
  /** Override the semantic HTML element */
  as?: keyof JSX.IntrinsicElements
}

/**
 * Typography Component
 * 
 * Unified text rendering with consistent fonts based on variant type.
 * All text in the app should use this component.
 * 
 * @example
 * <Typography variant={TypographyVariant.H1}>Main Title</Typography>
 * <Typography variant={TypographyVariant.Caption}>Subtitle text</Typography>
 * <Typography variant={TypographyVariant.Body}>Regular paragraph</Typography>
 */
export function Typography({
  variant,
  children,
  className,
  color,
  center,
  style,
  as,
}: TypographyProps) {
  const elementType = as ?? VARIANT_ELEMENTS[variant]

  const computedStyle: CSSProperties = {
    fontFamily: VARIANT_FONTS[variant],
    fontSize: VARIANT_SIZES[variant],
    fontWeight: VARIANT_WEIGHTS[variant],
    color: color ?? 'inherit',
    textAlign: center ? 'center' : undefined,
    margin: 0,
    letterSpacing: variant === TypographyVariant.H1 || variant === TypographyVariant.H2 
      ? '0.08em' 
      : variant === TypographyVariant.Caption || variant === TypographyVariant.Label
        ? '0.05em'
        : undefined,
    textTransform: variant === TypographyVariant.H1 || variant === TypographyVariant.H2 
      ? 'uppercase' 
      : undefined,
    ...style,
  }

  return createElement(
    elementType,
    { className, style: computedStyle },
    children
  )
}

// Re-export variant enum for convenience
export { TypographyVariant }

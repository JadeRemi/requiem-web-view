/**
 * Typography Types
 * Defines text variants and their associated fonts
 */

/** Typography variant enum - determines font family and styling */
export const enum TypographyVariant {
  /** Main page headings - Ethnocentric */
  H1 = 'h1',
  /** Section headings - Ethnocentric */
  H2 = 'h2',
  /** Subsection headings - Orbitron */
  H3 = 'h3',
  /** Small headings - Orbitron */
  H4 = 'h4',
  /** Captions and labels - Orbitron */
  Caption = 'caption',
  /** Body text - System sans */
  Body = 'body',
  /** Small body text - System sans */
  BodySmall = 'bodySmall',
  /** Monospace/code text - Mono */
  Mono = 'mono',
  /** Pixel-style text - Pixelify Sans */
  Pixel = 'pixel',
  /** UI labels and buttons - Orbitron */
  Label = 'label',
  /** Minecraft font */
  Minecraft = 'minecraft',
  /** Press Start 2P - Retro pixel font */
  PressStart = 'pressStart',
}

/** Font family mapping for each variant */
export const VARIANT_FONTS: Record<TypographyVariant, string> = {
  [TypographyVariant.H1]: 'var(--font-ethnocentric)',
  [TypographyVariant.H2]: 'var(--font-ethnocentric)',
  [TypographyVariant.H3]: 'var(--font-orbitron)',
  [TypographyVariant.H4]: 'var(--font-orbitron)',
  [TypographyVariant.Caption]: 'var(--font-orbitron)',
  [TypographyVariant.Body]: 'var(--font-sans)',
  [TypographyVariant.BodySmall]: 'var(--font-sans)',
  [TypographyVariant.Mono]: 'var(--font-mono)',
  [TypographyVariant.Pixel]: 'var(--font-pixelify)',
  [TypographyVariant.Label]: 'var(--font-orbitron)',
  [TypographyVariant.Minecraft]: 'var(--font-minecraft)',
  [TypographyVariant.PressStart]: 'var(--font-press-start)',
}

/** Font size mapping for each variant */
export const VARIANT_SIZES: Record<TypographyVariant, string> = {
  [TypographyVariant.H1]: 'var(--text-4xl)',
  [TypographyVariant.H2]: 'var(--text-2xl)',
  [TypographyVariant.H3]: 'var(--text-xl)',
  [TypographyVariant.H4]: 'var(--text-lg)',
  [TypographyVariant.Caption]: 'var(--text-sm)',
  [TypographyVariant.Body]: 'var(--text-base)',
  [TypographyVariant.BodySmall]: 'var(--text-sm)',
  [TypographyVariant.Mono]: 'var(--text-sm)',
  [TypographyVariant.Pixel]: 'var(--text-base)',
  [TypographyVariant.Label]: 'var(--text-xs)',
  [TypographyVariant.Minecraft]: 'var(--text-sm)',
  [TypographyVariant.PressStart]: 'var(--text-xs)',
}

/** Font weight mapping for each variant */
export const VARIANT_WEIGHTS: Record<TypographyVariant, number> = {
  [TypographyVariant.H1]: 400,
  [TypographyVariant.H2]: 400,
  [TypographyVariant.H3]: 600,
  [TypographyVariant.H4]: 600,
  [TypographyVariant.Caption]: 500,
  [TypographyVariant.Body]: 400,
  [TypographyVariant.BodySmall]: 400,
  [TypographyVariant.Mono]: 400,
  [TypographyVariant.Pixel]: 400,
  [TypographyVariant.Label]: 500,
  [TypographyVariant.Minecraft]: 400,
  [TypographyVariant.PressStart]: 400,
}

/** HTML element mapping for semantic rendering */
export const VARIANT_ELEMENTS: Record<TypographyVariant, keyof JSX.IntrinsicElements> = {
  [TypographyVariant.H1]: 'h1',
  [TypographyVariant.H2]: 'h2',
  [TypographyVariant.H3]: 'h3',
  [TypographyVariant.H4]: 'h4',
  [TypographyVariant.Caption]: 'p',
  [TypographyVariant.Body]: 'p',
  [TypographyVariant.BodySmall]: 'p',
  [TypographyVariant.Mono]: 'code',
  [TypographyVariant.Pixel]: 'span',
  [TypographyVariant.Label]: 'span',
  [TypographyVariant.Minecraft]: 'span',
  [TypographyVariant.PressStart]: 'span',
}


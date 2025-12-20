/**
 * Game Attributes Mock Data
 * Based on REQ ABILITIES - Attributes.csv
 */

export interface GameAttribute {
  id: string
  name: string
  description: string
  canBeFlat: boolean
  canBePercent: boolean
}

export const GAME_ATTRIBUTES: GameAttribute[] = [
  { id: 'damage', name: 'Damage', description: 'Base damage dealt by attacks', canBeFlat: true, canBePercent: true },
  { id: 'bleed-duration', name: 'Bleed duration', description: 'Duration of bleed effects applied', canBeFlat: true, canBePercent: true },
  { id: 'bleed-damage', name: 'Bleed damage', description: 'Damage dealt by bleed effects', canBeFlat: true, canBePercent: true },
  { id: 'bleed-speed', name: 'Bleed speed', description: 'Rate at which bleed damage is applied', canBeFlat: false, canBePercent: true },
  { id: 'move-speed', name: 'Move speed', description: 'Character movement speed', canBeFlat: false, canBePercent: true },
  { id: 'crit-damage', name: 'Crit damage', description: 'Damage multiplier on critical hits (procs on landing)', canBeFlat: true, canBePercent: true },
  { id: 'crit-chance', name: 'Crit chance', description: 'Chance to land a critical hit', canBeFlat: false, canBePercent: true },
  { id: 'evasion', name: 'Evasion', description: 'Chance to dodge hit fully', canBeFlat: false, canBePercent: true },
  { id: 'block', name: 'Block', description: 'Chance to receive no damage from hit', canBeFlat: false, canBePercent: true },
  { id: 'accuracy', name: 'Accuracy', description: 'Projectile dispersion reduction in degrees', canBeFlat: false, canBePercent: true },
  { id: 'exp-bonus', name: 'Exp bonus', description: 'Bonus experience gained', canBeFlat: true, canBePercent: true },
  { id: 'health-regen', name: 'Health regen', description: 'Percentage from max capped life regenerated over time', canBeFlat: false, canBePercent: true },
  { id: 'healing', name: 'Healing', description: 'Effectiveness of healing received', canBeFlat: true, canBePercent: true },
  { id: 'armor', name: 'Armor', description: 'Percentage of reduced damage taken', canBeFlat: false, canBePercent: true },
  { id: 'absorption', name: 'Absorption', description: 'Substracted flat value from damage received', canBeFlat: true, canBePercent: true },
  { id: 'culling', name: 'Culling', description: 'Ability to execute low-health enemies', canBeFlat: false, canBePercent: true },
  { id: 'maximum-health', name: 'Maximum health', description: 'Total health pool', canBeFlat: true, canBePercent: true },
  { id: 'maximum-power', name: 'Maximum power', description: 'Total power pool (mana, stamina, energy and hunger)', canBeFlat: true, canBePercent: true },
  { id: 'thorns-damage', name: 'Thorns damage', description: 'Damage reflected back to attackers', canBeFlat: true, canBePercent: true },
  { id: 'reflect-chance', name: 'Reflect chance', description: 'Chance to reflect damage back', canBeFlat: false, canBePercent: true },
  { id: 'health-steal', name: 'Health steal', description: 'Life leeched from damage dealt', canBeFlat: true, canBePercent: true },
  { id: 'power-steal', name: 'Power steal', description: 'Power leeched from damage dealt', canBeFlat: true, canBePercent: true },
  { id: 'blind-duration', name: 'Blind duration', description: 'Duration of blind effects applied', canBeFlat: true, canBePercent: true },
  { id: 'slow-duration', name: 'Slow duration', description: 'Duration of slow effects applied', canBeFlat: true, canBePercent: true },
  { id: 'slow-effect', name: 'Slow effect', description: 'Intensity of slow effects', canBeFlat: false, canBePercent: true },
  { id: 'attack-speed', name: 'Attack speed', description: 'Rate of attacks', canBeFlat: false, canBePercent: true },
  { id: 'reload-speed', name: 'Reload speed', description: 'Speed of reloading weapons', canBeFlat: false, canBePercent: true },
  { id: 'disarm-duration', name: 'Disarm duration', description: 'Duration of disarm effects applied', canBeFlat: true, canBePercent: true },
  { id: 'disarm-chance', name: 'Disarm chance', description: 'Chance to disarm enemies', canBeFlat: false, canBePercent: true },
  { id: 'stun-duration', name: 'Stun duration', description: 'Duration of stun effects applied', canBeFlat: true, canBePercent: true },
  { id: 'stun-chance', name: 'Stun chance', description: 'Chance to stun enemies', canBeFlat: false, canBePercent: true },
  { id: 'burn-duration', name: 'Burn duration', description: 'Duration of burn effects applied', canBeFlat: true, canBePercent: true },
  { id: 'burn-damage', name: 'Burn damage', description: 'Damage dealt by burn effects (victim max life percentage)', canBeFlat: false, canBePercent: true },
  { id: 'burn-speed', name: 'Burn speed', description: 'Rate at which burn damage is applied', canBeFlat: false, canBePercent: true },
  { id: 'jump-height', name: 'Jump height', description: 'Height of jumps', canBeFlat: false, canBePercent: true },
  { id: 'bleed-resist', name: 'Bleed resist', description: 'Resistance to bleed effects', canBeFlat: true, canBePercent: true },
  { id: 'burn-resist', name: 'Burn resist', description: 'Resistance to burn effects', canBeFlat: true, canBePercent: true },
  { id: 'underwater-speed', name: 'Underwater speed', description: 'Movement speed while underwater', canBeFlat: false, canBePercent: true },
  { id: 'underwater-breath', name: 'Underwater breath', description: 'Duration of breath underwater', canBeFlat: true, canBePercent: true },
  { id: 'loot-bonus', name: 'Loot bonus', description: 'Increased loot drop rates', canBeFlat: false, canBePercent: true },
  { id: 'power-regen', name: 'Power regen', description: 'Percentage from max capped power regenerated over time', canBeFlat: false, canBePercent: true },
  { id: 'power-renewal', name: 'Power renewal', description: 'Flat power regeneration and its increase', canBeFlat: true, canBePercent: true },
  { id: 'power-cost-reduction', name: 'Power cost reduction', description: 'Reduced power cost for abilities', canBeFlat: true, canBePercent: true },
  { id: 'colossal-strike-chance', name: 'Colossal strike chance', description: 'Chance to land a colossal strike', canBeFlat: false, canBePercent: true },
  { id: 'colossal-strike-multiplier', name: 'Colossal strike multiplier', description: 'Damage multiplier for colossal strikes', canBeFlat: false, canBePercent: true },
  { id: 'grace-period', name: 'Grace period', description: 'Increases invincibility duration between hits', canBeFlat: true, canBePercent: true },
  { id: 'effect-area', name: 'Effect area', description: 'Area of effect for abilities', canBeFlat: false, canBePercent: true },
  { id: 'phase-shields', name: 'Phase shields', description: 'Number of phase shields', canBeFlat: true, canBePercent: false },
  { id: 'phase-speed', name: 'Phase speed', description: 'Reduction of phase shield recovery time', canBeFlat: false, canBePercent: true },
  { id: 'knockback-distance', name: 'Knockback distance', description: 'Distance enemies are knocked back', canBeFlat: true, canBePercent: true },
  { id: 'knockback-chance', name: 'Knockback chance', description: 'Chance to knock back enemies', canBeFlat: false, canBePercent: true },
  { id: 'knockback-decrease', name: 'Knockback decrease', description: 'Defensive stat reducing knockback received', canBeFlat: false, canBePercent: true },
  { id: 'landing-damage', name: 'Landing damage', description: 'Damage dealt when landing', canBeFlat: true, canBePercent: true },
  { id: 'power-damage-mitigation', name: 'Power damage mitigation', description: 'Reduced damage to power', canBeFlat: true, canBePercent: true },
  { id: 'range', name: 'Range', description: 'Attack and ability range', canBeFlat: true, canBePercent: true },
  { id: 'pierce-chance', name: 'Pierce chance', description: 'Chance for attacks to pierce through', canBeFlat: false, canBePercent: true },
  { id: 'fall-damage-reduction', name: 'Fall damage reduction', description: 'Reduced damage from falling', canBeFlat: true, canBePercent: true },
  { id: 'flask-sip-cost-reduction', name: 'Flask sip cost reduction', description: 'Reduced cost per flask sip', canBeFlat: true, canBePercent: true },
  { id: 'decapitation', name: 'Decapitation', description: 'Chance to decapitate enemies', canBeFlat: false, canBePercent: true },
  { id: 'minions', name: 'Minions', description: 'Number of minions summoned', canBeFlat: true, canBePercent: false },
  { id: 'minion-duration', name: 'Minion duration', description: 'Duration minions remain active', canBeFlat: true, canBePercent: true },
  { id: 'health-bonus-on-kill', name: 'Health bonus on kill', description: 'Health gained when killing enemies', canBeFlat: true, canBePercent: false },
  { id: 'power-bonus-on-kill', name: 'Power bonus on kill', description: 'Power gained when killing enemies', canBeFlat: true, canBePercent: false },
  { id: 'life-bonus-on-hit', name: 'Life bonus on hit', description: 'Health gained on hitting enemies', canBeFlat: true, canBePercent: false },
  { id: 'power-bonus-on-hit', name: 'Power bonus on hit', description: 'Power gained on hitting enemies', canBeFlat: true, canBePercent: false },
  { id: 'chance-to-keep-power', name: 'Chance to keep power', description: 'Chance to not consume power on ability use', canBeFlat: false, canBePercent: true },
  { id: 'burn-chance', name: 'Burn chance', description: 'Chance to inflict burn on enemies', canBeFlat: false, canBePercent: true },
  { id: 'thorns-chance', name: 'Thorns chance', description: 'Chance to activate thorns', canBeFlat: false, canBePercent: true },
  { id: 'bleed-chance', name: 'Bleed chance', description: 'Chance to inflict bleed on enemies', canBeFlat: false, canBePercent: true },
  { id: 'blind-chance', name: 'Blind chance', description: 'Chance to blind enemies', canBeFlat: false, canBePercent: true },
  { id: 'slow-chance', name: 'Slow chance', description: 'Chance to slow enemies', canBeFlat: false, canBePercent: true },
  { id: 'gold-bonus', name: 'Gold bonus', description: 'Increased gold drops', canBeFlat: false, canBePercent: true },
  { id: 'gold-leech', name: 'Gold leech', description: 'Gold gained from damage dealt', canBeFlat: true, canBePercent: true },
  { id: 'piercing-damage', name: 'Piercing damage', description: 'If not blocked or evaded, deals true value ignoring reductions', canBeFlat: true, canBePercent: false },
  { id: 'thrift', name: 'Thrift', description: 'Reduces the amount of gold or items you spend in trades', canBeFlat: true, canBePercent: true },
  { id: 'savvy', name: 'Savvy', description: 'Increases the amount of gold or items you gain in trades', canBeFlat: true, canBePercent: true },
  { id: 'ricochet', name: 'Ricochet', description: 'Allows projectiles which do not get destroyed on impact to bounce off walls X times, accounting for gravity, ballistics and directional vector angle', canBeFlat: true, canBePercent: false },
  { id: 'gib-chance', name: 'Gib chance', description: 'Procs gib on kill, granting no inherent effects on its own', canBeFlat: false, canBePercent: true },
  { id: 'recoup-chance', name: 'Recoup chance', description: 'If procs on receiving hit, restores X% damage from this hit after a delay', canBeFlat: false, canBePercent: true },
  { id: 'recoup-delay', name: 'Recoup delay', description: 'Delay before recoup healing occurs', canBeFlat: true, canBePercent: true },
  { id: 'recoup-amount', name: 'Recoup amount', description: 'Amount of damage recouped as healing', canBeFlat: false, canBePercent: true },
  { id: 'periodical-damage-frequency', name: 'Periodical damage frequency', description: 'Increases rate of dealing Periodical damage procs in ticks', canBeFlat: true, canBePercent: true },
]

/** Get N random preview attributes (shuffled based on current date for variety) */
export const getPreviewAttributes = (count: number = 5): GameAttribute[] => {
  const today = new Date().toDateString()
  let seed = 0
  for (let i = 0; i < today.length; i++) {
    seed = ((seed << 5) - seed) + today.charCodeAt(i)
    seed = seed & seed
  }

  const shuffled = [...GAME_ATTRIBUTES].sort((a, b) => {
    const hashA = ((seed << 5) - seed) + a.id.charCodeAt(0)
    const hashB = ((seed << 5) - seed) + b.id.charCodeAt(0)
    return hashA - hashB
  })

  return shuffled.slice(0, count)
}

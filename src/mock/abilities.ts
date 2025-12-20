/**
 * Class abilities mock data
 * Data extracted from REQ ABILITIES - Classes.csv
 *
 * Structure:
 * - Each class has exactly one Main ability (isMainAbility: true)
 * - Abilities are NOT a linked list - they can be scrambled during gameplay
 * - Each ability belongs to exactly one class
 * - Abilities without names use "—" as fallback
 */

export interface ClassAbility {
  id: string
  classId: string
  /** Ability name, use "—" if missing */
  name: string
  /** Multi-line description with bullet points */
  description: string
  /** True if this is the main class ability (marked with ❂ in source) */
  isMainAbility: boolean
}

/**
 * All class abilities from the game
 * Grouped by class for readability
 */
export const CLASS_ABILITIES: ClassAbility[] = [
  // ========================================
  // SEEKER
  // ========================================
  {
    id: 'seeker-main',
    classId: 'seeker',
    name: 'Golden flair',
    description: `- Loot chances roll twice
- 10% chance when opening a chest to roll additionally to fill empty slots
- Damaging a player steals 1% of their gold for each 10% of their lost max health
- Damaging a player has a 20% chance to drop a random item from their inventory (if stack > 1, if received damage > 1)
- 5% chance to keep gold
- 5% chance to keep Collectible cards
- Killing a player highlights seeker on the web map and applies glowing effect for 1 day. Player killing seeker during this period receives all the gold previously deleted from seeker's victims.`,
    isMainAbility: true,
  },
  {
    id: 'seeker-1',
    classId: 'seeker',
    name: 'Avidity vision',
    description: `- All dropped items and chests gain glowing effect
- All players leave trails each 3 seconds visible for 1 minute`,
    isMainAbility: false,
  },
  {
    id: 'seeker-2',
    classId: 'seeker',
    name: 'Proficient hunting',
    description: `- Killing a player has 70% chance to steal their random ability (if enemy level >= seeker level, if ability non-native)
- Unlocks inventory for stolen abilities, allows to replace any ability. Max 27 slots, replacing the oldest.`,
    isMainAbility: false,
  },
  {
    id: 'seeker-3',
    classId: 'seeker',
    name: 'Carved perpetuation',
    description: '- Killing a player has 30% chance to drop their Figurine. Either inventory or level + skills are saved.',
    isMainAbility: false,
  },

  // ========================================
  // VENTRILOQUIST
  // ========================================
  {
    id: 'ventriloquist-main',
    classId: 'ventriloquist',
    name: 'Silky bond',
    description: `- On positive effect gain share it with minions
- On negative effect lost remove it from all minions
- Cannot deal non-melee damage`,
    isMainAbility: true,
  },
  {
    id: 'ventriloquist-1',
    classId: 'ventriloquist',
    name: 'Driven call',
    description: `- On enemy kill 15% chance to summon a Driven. Driven has 10% max health of killed enemy. Driven deals 1 damage per attack or picks up the first weapon and attacks with it. Driven lasts for 30 seconds, released afterwards. Driven can target only one target, being released when it is dead. When killed or released, Driven leaves an explosive mine and drops held item. Driven attacks can summon Driven.
- On weapon drop 5% chance to summon a weaker Driven picking it up. Driven attacks once and drops the item. Driven lasts 30 seconds and has 1 hp.`,
    isMainAbility: false,
  },
  {
    id: 'ventriloquist-2',
    classId: 'ventriloquist',
    name: 'Glass smashing',
    description: `- Can deal non-melee damage.
- Receives all the damage target takes after all reductions.`,
    isMainAbility: false,
  },
  {
    id: 'ventriloquist-3',
    classId: 'ventriloquist',
    name: 'Reconstruction attempt',
    description: '- On enemy kill 5% chance to reconstruct them as Replica. Replica has 100% reduced attack and movement speed.',
    isMainAbility: false,
  },

  // ========================================
  // ARTIFICER
  // ========================================
  {
    id: 'artificer-main',
    classId: 'artificer',
    name: 'Picky handyman',
    description: '- Crafting an item with a locked recipe succeeds if artificer already has one of this item in the inventory',
    isMainAbility: true,
  },
  {
    id: 'artificer-1',
    classId: 'artificer',
    name: 'Observer creation',
    description: '- Unlocks crafting Observer. Observer is an immobile entity that lasts forever. If artificer receives a positive effect, nearby Observers receive same effect with infinite duration (radius < 10). Maximum active Observers - 3. Shift-clicking Observer in hand allows for spectating all active observers in the world.',
    isMainAbility: false,
  },
  {
    id: 'artificer-2',
    classId: 'artificer',
    name: 'Sketch creation',
    description: `- Unlocks crafting Sketch. Sketch is an item that randomly starts filling with progression percentage. Sketch can copy other player's armor (when witnessing the other player receiving damage) or weapon (when they deal damage) or flask (on sip), adding a percent randomly to the progression. On first proc Sketch has 50% chance to add the witnessed player's UUID to NBT blacklist (10 possible slots, rewriting the oldest) of all the Sketches in Artificer inventory, so their equipment would not be copied. Only one Sketch in inventory progresses. Name of the outcome is hidden until reaching 100%, when the Sketch can be turned into said outcome. Allows to copy other players' equipment by being near them. Some unfinished sketches will never fill completely, if their condition (source player and item) are no longer met. Guild and party members skip the proc by default.`,
    isMainAbility: false,
  },
  {
    id: 'artificer-3',
    classId: 'artificer',
    name: 'Concentrator creation',
    description: '- Unlocks crafting Concentrator. Concentrator in stackable, 80% to upgrade weapon damage by 1-5 when applied, 15% to lower damage by 1-5, 5% to modify weapon with Warped or to remove Warpproof. 0.5% additional chance to remove a random non-damage attribute from weapon.',
    isMainAbility: false,
  },

  // ========================================
  // CUSTODIAN
  // ========================================
  {
    id: 'custodian-main',
    classId: 'custodian',
    name: '—',
    description: `- Fully invincible to any type of damage.
- Cannot deal damage, neither damage over time, nor projectiles or hits.
- On start a Familiar is summoned. Familiar is a Wither skeleton with 10x the damage from the equipment. Requipped on shift RMB click with item in hand, drops old equipment on reequip. Base Familiar maximum hp without equipment is calculated from custodian's max health with current equipment, multiplied by 20. Can be increased further by equipping Familiar with armor too. Familiar follows custodian, is teleported if left and autotargets nearest enemy. Shift RMB click with food heals Familiar.
- If Familiar dies, custodian is instagibbed.
- Familiar has no native health regeneration and cannot leech or regenerate with armor stats or effects.
- Familiar uses only melee attacks.
- Other players see a line of blue particles connecting custodian and his Familiar.
- When Familiar dies, it drops all equipment.`,
    isMainAbility: true,
  },
  {
    id: 'custodian-1',
    classId: 'custodian',
    name: '—',
    description: '- Familiar has basic 1%/sec health regen and can have leech and regen from equipment',
    isMainAbility: false,
  },
  {
    id: 'custodian-2',
    classId: 'custodian',
    name: '—',
    description: `- Familiar is allowed to use a ranged weapon
- Familiar has 40% reduced accuracy with ranged weapons`,
    isMainAbility: false,
  },
  {
    id: 'custodian-3',
    classId: 'custodian',
    name: '—',
    description: `- Enemies killed by Familiar drop Shards. Shards can only be seen and picked by this Familiar's custodian.
- Custodian can shift RMB click on any Familiar with a Shard, even other player's, to give them a 10% damage boost for one minute. Shard is consumed. Effect stacks, new clicks refresh duration. If effect finishes, stacks are depleted.`,
    isMainAbility: false,
  },

  // ========================================
  // PROWLER
  // ========================================
  {
    id: 'prowler-main',
    classId: 'prowler',
    name: '—',
    description: `- Default class, cannot be removed from class menu, itemized or traded.
- Figurines found by prowler always have 1-10 abilities from Prowler class instead.
- On death drops all equipment, current level exp, and loses 1 level + ability associated with it. When progressing to new level again, new ability is chosen.
- Abilities have deterministically rolled numerical values out of provided range. Each figurine will have different values.`,
    isMainAbility: true,
  },
  {
    id: 'prowler-1',
    classId: 'prowler',
    name: '—',
    description: '- [Armor/Evasion/Block/Speed] cannot get a total negative value.',
    isMainAbility: false,
  },
  {
    id: 'prowler-2',
    classId: 'prowler',
    name: '—',
    description: `- [1-100]% increased damage against players
- Cannot find class figurines`,
    isMainAbility: false,
  },
  {
    id: 'prowler-3',
    classId: 'prowler',
    name: '—',
    description: '- +[1-50]% chance not to consume item durability.',
    isMainAbility: false,
  },

  // ========================================
  // WARPED
  // ========================================
  {
    id: 'warped-main',
    classId: 'warped',
    name: 'Eldritch corruption',
    description: `- Is a source of the "Warped" modifier.
- When hitting a player has a chance curse their equipment with Warp, if it is not Warpproof. Warp infects the item and slowly replaces the description with purple hexagons, deleting stats. Warp progresses with item event (armor on dmg received, weapon on dmg dealt). When item has multiple lines of Warp in description, it can migrate to adjacent equipment items.
- When hitting a player with Warped item has higher chance to progress the Warp spreading on this item.
- It totally warpproof. All items equipped get Warped modifier instantly, but do not get Warp progression.
- All items crafted are Warped.
- 10% chance to receive random low level item instead on crafting and trading cards.
- Figurine only dropped with a chance on max level Prowler death or on player killed by Warped. 5% chance to turn other class figurine into Warped figurine when it gets warped.
- 30% chance for dropped equipment items to be Warped.
- 10% chance for figurines found to be Warped class figurines.
- When opening a chest has 15% to apply warped effect on this and one next opening of this chest. Warped chest has much less items, and equipment items have 20% chance to be Warped.
- Figurines found by Warped have 40% chance to be warped, having 1-10 abilities missing and replaced by warp modifier.`,
    isMainAbility: true,
  },
  {
    id: 'warped-1',
    classId: 'warped',
    name: 'Parasitech',
    description: `- When lower than 30% hp, shift RMB allows to infect any unit.
- If unit dies, warped dies too. If unit disappears or is removed due to duration finishing, warped is ejected.
- Spectates this unit indefinitely, RMB to finish. Player body is removed for the time of this effect.
- All time-based effects like regeneration and power regain apply while infecting.
- Player unit infected only gets half exp. Second half leeched to warped.
- Only one warped can infect one unit.
- Host cannot regenerate power and life, but still can leech.`,
    isMainAbility: false,
  },
  {
    id: 'warped-2',
    classId: 'warped',
    name: '—',
    description: '- 5% chance to apply Tangle when hitting enemy in melee. Tangle stacks with no limits. Tangle has duration of 10 seconds. Applying new Tangle refreshes duration.\n- Each Tangle reduces enemy movement speed by 5% and attack speed by 1%. If multiple enemies are hit when Tangle procs, all of them get the highest Tangle count.\n- Each Tangle reduces enemy damage by 2.',
    isMainAbility: false,
  },
  {
    id: 'warped-3',
    classId: 'warped',
    name: '—',
    description: '- Each DoT effect on enemy deals 100% more damage per DoT effect on enemy.',
    isMainAbility: false,
  },

  // ========================================
  // INSPIRER
  // ========================================
  {
    id: 'inspirer-main',
    classId: 'inspirer',
    name: '—',
    description: `- When has same ally nearby for > 5 minutes, starts Guarding them. Guarded player can only be Guarded by one Inspirer. Inspirer can only guard one non-Inspirer target. Cannot select target to Guard.
- While Guarding, both players receive 1 hp over max each 10 seconds if both on max hp.
- Guarded pair share max life regen and power regen, both receiving the highest value between both players for each attribute.
- Cannot kill enemies with damage, as they are left with 1 hp.
- If Guarded player dies, Inspirer rolls to die instead. Can be avoided by defensive attributes like Evasion.`,
    isMainAbility: true,
  },
  {
    id: 'inspirer-1',
    classId: 'inspirer',
    name: '—',
    description: '- The closer party mates are, the more exp they get. Starting radius - 15 blocks, up to 5x when in same block.',
    isMainAbility: false,
  },
  {
    id: 'inspirer-2',
    classId: 'inspirer',
    name: '—',
    description: '- Converts all items dropped nearby into experience based on their level and rarity.',
    isMainAbility: false,
  },
  {
    id: 'inspirer-3',
    classId: 'inspirer',
    name: '—',
    description: '- When hp drops to < 50%, cannot receive damage from players or deal damage to players for 10 seconds. Cooldown 30 seconds (if there are allies nearby) or 5 minutes (if not).',
    isMainAbility: false,
  },

  // ========================================
  // SHELLGUARD
  // ========================================
  {
    id: 'shellguard-main',
    classId: 'shellguard',
    name: '—',
    description: `- Adapts to damage received, 30% chance to get 1 Scale with each new hit of the same type from same entity. Receives 3% less damage per scale active, up to 100%. Hit effects still apply. If a new damaging entity or damage type is introduced, Scales are removed and start from zero. Scales always affect damage from the hit depleting them. If hit deals no damage, the Scales still deplete.
- Base max Scale amount - 10. Can be increased by abilities.
- 100% accuracy
- 30% reduced walk speed
- 50% reduced jump height
- 50% reduced attack speed
- 10x damage taken from falling
- 2% to be stunned for 1 second when taking damage`,
    isMainAbility: true,
  },
  {
    id: 'shellguard-1',
    classId: 'shellguard',
    name: '—',
    description: '- Upon receiving a positive temporary effect its duration is increased indefinitely. Upon receiving same effect of higher level the effect is upgraded with new level.',
    isMainAbility: false,
  },
  {
    id: 'shellguard-2',
    classId: 'shellguard',
    name: '—',
    description: '- +1000% hp per missing armor piece',
    isMainAbility: false,
  },
  {
    id: 'shellguard-3',
    classId: 'shellguard',
    name: '—',
    description: `- Receive 3% less damage for each 5% of missing hp.
- Cannot suicide with spending life, as the action is prevented if life is insufficient.`,
    isMainAbility: false,
  },

  // ========================================
  // DEVOURER
  // ========================================
  {
    id: 'devourer-main',
    classId: 'devourer',
    name: '—',
    description: `- When gibbing an enemy, 30% chance to drop Blood, visible and consumable only by devourer. Blood does not stack.
- If did not drink Blood for 10 minutes, starts losing 2% of power per second, 2% of health per second, power regeneration becomes disabled, leech is increased 3x. Healing still works.
- Blood restores amount of life and power proportional to gibbed enemy max life divided by devourer current life. Can be sipped from a type of flask.
- Cannot regenerate health
- Cannot eat any food but raw meat types
- If remains under open sunny sky for > 5 seconds, starts burning. Stops burning on reaching ceiling.`,
    isMainAbility: true,
  },
  {
    id: 'devourer-1',
    classId: 'devourer',
    name: 'Brain food',
    description: '- Enemy decapitation fully restores power and makes it infinite for 30 seconds.',
    isMainAbility: false,
  },
  {
    id: 'devourer-2',
    classId: 'devourer',
    name: '—',
    description: '- 40% chance for killed enemies to drop "Blood droplet". Instantly auto-consumed on picking up, refreshing blood thirst. Has separate thirst saturation duration of 5 minutes, meaning devourer still has 10 minutes after each Blood, but only 5 minutes after Blood saturation finished and Droplet is consumed.',
    isMainAbility: false,
  },
  {
    id: 'devourer-3',
    classId: 'devourer',
    name: '—',
    description: '- On killing a player regenerates 5% health per second, deals 3x damage, leeches 5x health and power for 20 minutes.',
    isMainAbility: false,
  },

  // ========================================
  // HERBALIST
  // ========================================
  {
    id: 'herbalist-main',
    classId: 'herbalist',
    name: 'Go green',
    description: `- Can only consume plants. Consuming plants fills the Satiated percentage, 0.01-1% per plant. Gains 20% increased attack and walk speed when Satiated. If did not consume a plant for 10 minutes, starts losing Satiated, 1% per 10 seconds.
- Plants are leaves, vines, tall grass, flowers and fruits.
- Not losing Satiated or Power when invisible.
- Cannot regain power when not Satiated.
- Attacking or getting hit breaks invisibility.
- Many abilities are named after plants and flowers.`,
    isMainAbility: true,
  },
  {
    id: 'herbalist-1',
    classId: 'herbalist',
    name: 'Stoic prananoiac',
    description: '- 30% chance to receive 30% of power each 5 seconds under sunny sky even if not Satiated.',
    isMainAbility: false,
  },
  {
    id: 'herbalist-2',
    classId: 'herbalist',
    name: 'Indiscernible camouflage',
    description: `- If did not receive or deal damage for 1 minute, gain invisibility.
- When getting invisibility becomes fully invisible: armor and any items, particles are invisible too. Minions, pets, footprints stay visible.
- First hit by herbalist from invisibility deals no damage.
- Dispel glowing on gaining invisibility`,
    isMainAbility: false,
  },
  {
    id: 'herbalist-3',
    classId: 'herbalist',
    name: 'Vibe check',
    description: `- First hit from invisibility deals an additional attack, which rolls for crit and stun thrice.
- If gibbing the enemy with this hit, instantly regain invisibility.
- Damage from this hit is reflected.`,
    isMainAbility: false,
  },

  // ========================================
  // MECHANITE
  // ========================================
  {
    id: 'mechanite-main',
    classId: 'mechanite',
    name: '—',
    description: `- Figurine can only be crafted by artificer.
- Mecha Shards have a chance to drop from enemies killed. Shards are visible, pickable and consumable only my mechanites.
- On start equipped with Mechanical armor set. Mechanical armor is upgraded with Mecha Shards.
- Mechanical armor is non-unequippable and does not drop on death
- The only class able to install Casings. Casing is a consumable stackable item. RMB with casing item installs it in holder's inventory, taking up one slot, starting from the top left. Casing does not drop from the inventory on death. Casing cannot be removed from the slot. Max amount of installed casings is 36. Crafting casings is unlocked separately. Installing casings does not require having crafting unlocked. Casings in inventory are displayed as the same non-distinctive placeholder casing and have minimal description and act as buttons to open the menu containing the casing types player has installed. Casing can be only installed in a safe zone.`,
    isMainAbility: true,
  },
  {
    id: 'mechanite-1',
    classId: 'mechanite',
    name: '—',
    description: `- Replaces Mechanical chestplate with Mechanical elytra. Flying does not consume power.
- Cannot launch themself with fireworks.`,
    isMainAbility: false,
  },
  {
    id: 'mechanite-2',
    classId: 'mechanite',
    name: '—',
    description: `- Equips offhand with Mechanical shield, upgradable with Mecha Shards.
- Mechanical shield has 100% increased blocking recovery.
- Mechanical shield has 50% chance to deflect incoming projectile when blocking
- Mechanical shield is non-unequippable`,
    isMainAbility: false,
  },
  {
    id: 'mechanite-3',
    classId: 'mechanite',
    name: '—',
    description: '- Gain 1 phase shield if break one on enemy.',
    isMainAbility: false,
  },

  // ========================================
  // JAEGER
  // ========================================
  {
    id: 'jaeger-main',
    classId: 'jaeger',
    name: '—',
    description: `- 80% reduced accuracy with melee attacks
- 50% increased accuracy with ranged attacks
- 20% reduced melee damage
- Receive additional 5% of max hp as damage with incoming melee attacks`,
    isMainAbility: true,
  },
  {
    id: 'jaeger-1',
    classId: 'jaeger',
    name: '—',
    description: '- Pierce chance adds equal chance for homing projectiles to search for a new target on hit. Radius is 10 blocks. Cannot choose same target.',
    isMainAbility: false,
  },
  {
    id: 'jaeger-2',
    classId: 'jaeger',
    name: '—',
    description: `- If did not receive or deal damage for 2 minutes, next ranged attack becomes Charged.
- If Charged attack breaks 1 phase shield on enemy, it breaks all phase shields on all affected enemies.
- Charged attack rolls Pierce chance thrice.`,
    isMainAbility: false,
  },
  {
    id: 'jaeger-3',
    classId: 'jaeger',
    name: '—',
    description: `- Multiplies ranged attack damage by 5% of distance to enemy
- Multiplies ranged attack damage by 5% of current level`,
    isMainAbility: false,
  },

  // ========================================
  // SCOURGER
  // ========================================
  {
    id: 'scourger-main',
    classId: 'scourger',
    name: 'Sacrificial self-flagellation',
    description: `- Spend life instead of power. May suicide this way.
- Power cost, power regen, power gain and power leech apply to life instead.
- Regenerate 2% of max life per second.
- Picking up exp deals as much damage as it grants exp, but never higher than 20% of max life.`,
    isMainAbility: true,
  },
  {
    id: 'scourger-1',
    classId: 'scourger',
    name: 'Clawface terror',
    description: `- Reflect damage received.
- Cannot take reflected damage.`,
    isMainAbility: false,
  },
  {
    id: 'scourger-2',
    classId: 'scourger',
    name: '—',
    description: `- Deals 500% of current health with unarmed melee hits.
- Cannot crit when unarmed.`,
    isMainAbility: false,
  },
  {
    id: 'scourger-3',
    classId: 'scourger',
    name: '—',
    description: '- If receives more than 20% max life of damage per second, receives delaying effect for 10 seconds. All incoming damage is delayed by 1 second, and each 2 received attacks during effect increase delaying time by 1 second.',
    isMainAbility: false,
  },

  // ========================================
  // PRETORIAN
  // ========================================
  {
    id: 'pretorian-main',
    classId: 'pretorian',
    name: '—',
    description: `- Figurine only rarely found in high tier chests.
- Offhand is permanently occupied by Ancestor totem. RMB with totem allows to place it on a block. Totem is an immobile untargetable entity. Totem melee attacks nearby enemies. When Totem hp reaches 0, Totem stops attacking until fully regenerated. Totem aura turns off too. Totem regenerates 1% per second. Offhand is still occupied when Totem placed. Shift RMB on Totem to pick it up.
- Most abilities affect Totem.
- Placed Totem creates spherical aura granting pretorian and allies 5% stun chance, 20% reduced damage taken, 2% hp regen, 50% reduced manacost, 80% reduced damage taken from projectiles from enemies outside of aura.
- 25% increased walk speed when Totem not placed.
- Totem inherits pretorian mainhand weapon and deals same amount of damage. Totem gets all pretorian's equipment damage buffs.
- Deals no damage and takes 10x damage when not near placed Totem.
- When pretorian leaves, Totem persists inactive.`,
    isMainAbility: true,
  },
  {
    id: 'pretorian-1',
    classId: 'pretorian',
    name: '—',
    description: '- Totem pulls enemies in aura towards itself.',
    isMainAbility: false,
  },
  {
    id: 'pretorian-2',
    classId: 'pretorian',
    name: '—',
    description: `- +5 blocks Totem reach distance
- +5 blocks Totem aura radius`,
    isMainAbility: false,
  },
  {
    id: 'pretorian-3',
    classId: 'pretorian',
    name: '—',
    description: "- Totem gets current pretorian crit chance, stun chance, colossal damage chance and DoTs.",
    isMainAbility: false,
  },

  // ========================================
  // MARTYR
  // ========================================
  {
    id: 'martyr-main',
    classId: 'martyr',
    name: "Razor's Edge",
    description: `- Cannot receive healing from any source.
- Constantly taunts surrounding mobs.
- On receiving a hit (including hits negated by Block or Phase Shields), gains a Suffering token (stacking buff) for 30 seconds. Suffering has unlimited stacking.

Does not die when taking a fatal hit, instead gaining Lethal Rapture modifier.
When Lethal Rapture activates:
- All DoT effects and debuffs are dispelled, Martyr gains 3 Suffering tokens per DoT/Debuff. Cannot gain DoT effects and debuffs for the duration of Lethal Rapture.
- Dies from any HP-depleting hit.
- Gains 3 Phase Shields.
- Taunting disabled.
- Cannot gain Suffering tokens for the duration of Lethal Rapture.

Lethal Rapture lasts for 10 seconds. When it expires:
- All stacked Suffering tokens are consumed.
- Martyr recovers 5% of maximum HP per token. This effect can overheal, temporarily granting extra health.
- Martyr receives a small buff to a random stat for every token for 1 minute.
- All currently active Phase Shields are dispelled. Healing is reduced by 10% of maximum HP for each dispelled Phase Shield.`,
    isMainAbility: true,
  },
  {
    id: 'martyr-1',
    classId: 'martyr',
    name: 'Unbound Virtue',
    description: `- All damage to party members within 10 blocks is redirected to Martyr.
- All DoT effects and debuffs are dispelled on party members and transferred onto the Martyr.
- When Lethal Rapture expires, healing effects and buffs are also propagated to all party members.
- Does not affect other Martyrs in the party.
- Does not work during the effect of Lethal Rapture.`,
    isMainAbility: false,
  },
  {
    id: 'martyr-2',
    classId: 'martyr',
    name: 'Mortal Ward',
    description: `Grants additional effects when Lethal Rapture activates:
- Gains 2 extra Phase Shields
- Gains 33% Evasion chance and 33% Block chance`,
    isMainAbility: false,
  },
  {
    id: 'martyr-3',
    classId: 'martyr',
    name: 'Righteous Penance',
    description: `- Receive 10% of damage dealt to enemies.
- Additionally receive 15% of damage dealt by other sources to the target which got attacked by Martyr in the last 5 seconds.`,
    isMainAbility: false,
  },

  // ========================================
  // WEBBER
  // ========================================
  {
    id: 'webber-main',
    classId: 'webber',
    name: 'Spider engine',
    description: `- Is invisible, can move through air unaffected by gravity. Movement snaps to block grid, only allowing movement between air block centers. Cannot pass through solid blocks. Can move in 6 possible directions.
- In invincible and cannot take damage directly. Ignored by monsters. Gameplay is similar to spectator gamemode.
- Cannot pick items directly. Can directly drop them. Cannot proc abilities or benefit from armor stats.
- Has Stabilization scale, 0% to 100%.
- Main gameplay mechanic is chunk control called Domination. When on full Stabilization, entering a new chunk starts claiming it. Chunk borders are highlighted. Claiming a chunk is only possible when there are no enemies present in the chunk. Claiming a chunk depletes Stabilization to 0%. Has a menu displaying map layout of claimed chunks. Claiming may take around 1-5 minutes. Before claiming you have to consume all dropped items, get rid of all the mobs and entities.
- Enemies in a claimed chunk you are in take Periodical damage. Item drops and experience from them are automatically received by you.
- Claiming chunks resembles mechanics from Sokoban, Tron and SAMP. Abilities reference Andrew Lloyd Webber.
- Is sensitive to Positive and Negative events in current chunk. Positive events include ally healing or enemy taking damage not from you. Negative events include ally taking damage or enemy spawning. Negative event has 20% chance to deplete 1% of Stabilization. Positive event has 20% chance to restore 1% Stabilization.
- Starts game with 50% Stabilization. When on 0% Stabilization, takes damage from Negative events in unclaimed chunks.
- Negative events in claimed chunks which were not recently visited starts unclaiming them.
- Can open containers in claimed chunks. Cannot use most consumables, weapons or flasks.
- Gains a bonus from amount of claimed chunks.
- Health is replaced with Weight measured in Bytes, same ones as obtained from Datamining. Damage from Negative events is dealt towards Weight instead. Items not picked up in claimed chunks are consumed as Bytes. Higher weight increases chunk claim speed.
- Gameplay usually relies on being in a party with a non-Webber player.`,
    isMainAbility: true,
  },

  // ========================================
  // TINKERER
  // ========================================
  {
    id: 'tinkerer-main',
    classId: 'tinkerer',
    name: 'Uncontained swarm',
    description: `- Unlocks crafting Swarmer. Swarmer is a mobile flying uncontrollable entity. Swarmer has 10 hp.
- When placed, Swarmer starts following tinkerer keeping itself above and behind. If equipped with an item, Swarmer starts using it to attack enemies. Swarmer has infinite power.
- Tinkerer has a unique inventory for controlling Swarmers' behavior, AI traits and strategy. Also allows for reequipping them with weapons and converting them back to items.
- Has a limit of 4 active Swarmers.
- When swarmer is destroyed, its equipped item is destroyed, and powerful explosion is created, allowing for chaining explosions throughout the swarm. Explosion damages both enemies and the tinkerer.
- Swarmers cannot directly damage tinkerer or each other. They attack nearby enemy or the enemy dealing damage to tinkerer.
- When not in battle, Swarmers roam in radius of 20 blocks. If chasing an enemy, they can get up to 40 blocks away from tinkerer.`,
    isMainAbility: true,
  },
  {
    id: 'tinkerer-1',
    classId: 'tinkerer',
    name: '—',
    description: `- Swarmers have +5 phase shields. They restore 1 shield per 5 seconds when off-battle.
- +1 Swarmer.`,
    isMainAbility: false,
  },
  {
    id: 'tinkerer-2',
    classId: 'tinkerer',
    name: 'Sparing shockwave',
    description: '- Receives no damage from own explosions, but keeps the knockback velocity.',
    isMainAbility: false,
  },
  {
    id: 'tinkerer-3',
    classId: 'tinkerer',
    name: '—',
    description: `- Swarmers get all damage bonuses from tinkerer's equipment.
- +1 Swarmer.`,
    isMainAbility: false,
  },
]

/** Get abilities for a specific class */
export const getClassAbilities = (classId: string): ClassAbility[] =>
  CLASS_ABILITIES.filter(ability => ability.classId === classId)

/** Get main ability for a class */
export const getMainAbility = (classId: string): ClassAbility | undefined =>
  CLASS_ABILITIES.find(ability => ability.classId === classId && ability.isMainAbility)

/** Get all non-main abilities for a class */
export const getSecondaryAbilities = (classId: string): ClassAbility[] =>
  CLASS_ABILITIES.filter(ability => ability.classId === classId && !ability.isMainAbility)

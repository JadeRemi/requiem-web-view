/**
 * Game Achievements Mock Data
 * Based on REQ ABILITIES - Achievements.csv
 * First cluster (general) + PvP/Coop/Social achievements
 */

export interface Achievement {
  id: string
  name: string
  description: string
}

export const ACHIEVEMENTS: Achievement[] = [
  // === General Achievements ===
  { id: 'pacifist', name: 'Pacifist', description: 'Reach maximum class level without engaging in PvP.' },
  { id: 'vegan', name: 'Vegan', description: 'Reach maximum class level without killing an enemy.' },
  { id: 'completionist', name: 'Completionist', description: 'Reach maximum level on all classes.' },
  { id: 'fashionista', name: 'Fashionista', description: 'Obtain all armor set bonuses.' },
  { id: 'cartographer', name: 'Cartographer', description: 'Explore a temporal region fully. Chunks may be just seen and not visited.' },
  { id: 'novice', name: 'Novice', description: 'Reach level 15.' },
  { id: 'health-nut', name: 'Health Nut', description: 'Reach 10000 health. Maximum health may stay lower.' },
  { id: 'sharpshooter', name: 'Sharpshooter', description: 'Gib a player with a single ranged shot from at least 100 blocks away.' },
  { id: 'demolitionist', name: 'Demolitionist', description: 'Kill 40 enemies in one second with explosives.' },
  { id: 'overkill', name: 'Overkill', description: 'Deal damage higher than 100000x of your health. Enemy does not need to have corresponding health.' },
  { id: 'collector', name: 'Collector', description: 'Obtain each class figurine naturally. Receiving figurines from other players does not count.' },
  { id: 'power-surge', name: 'Power Surge', description: 'Fill power from zero to full in one action.' },
  { id: 'scholar', name: 'Scholar', description: 'Unlock each ability on each class by level progression.' },
  { id: 'iron-will', name: 'Iron Will', description: 'Survive a hit dealing 100x of your current health.' },
  { id: 'card-shark', name: 'Card Shark', description: 'Exchange every deck of collection cards.' },
  { id: 'chipmaster', name: 'Chipmaster', description: 'Inlay each chip into armor.' },
  { id: 'time-traveler', name: 'Time Traveler', description: 'Visit all locations in 20 sequential temporal region.' },
  { id: 'exterminator', name: 'Exterminator', description: 'Kill 100000 enemies in a single temporal region.' },
  { id: 'medic', name: 'Medic', description: 'Heal 1000000 total health for allies.' },
  { id: 'scavenger', name: 'Scavenger', description: 'Obtain 10000 items with natural drops without visiting Safe zones.' },
  { id: 'horde-lord', name: 'Horde Lord', description: 'Have 30 minions simultaneously.' },
  { id: 'attribute-master', name: 'Attribute Master', description: 'Equip armor with 30 different positive numerical attributes.' },
  { id: 'tank', name: 'Tank', description: 'Equip armor with 20000 total durability.' },
  { id: 'regenerator', name: 'Regenerator', description: 'Obtain 50% health regeneration and 50% power regeneration simultaneously.' },
  { id: 'phase-walker', name: 'Phase Walker', description: 'Obtain 200 phase shields.' },
  { id: 'debilitator', name: 'Debilitator', description: 'Inflict every negative effect on an enemy with a single hit.' },
  { id: 'executioner', name: 'Executioner', description: 'Decapitate 5000 enemies.' },
  { id: 'blood-trail', name: 'Blood Trail', description: 'Travel 10000 blocks while non-stop bleeding.' },
  { id: 'colossal-killer', name: 'Colossal Killer', description: 'Kill 100 full health enemies with colossal damage.' },
  { id: 'six-figures', name: 'Six Figures', description: 'Earn 100000 total gold with natural non-player drops.' },
  { id: 'penetrator', name: 'Penetrator', description: 'Pierce 20 enemies with one ranged hit.' },
  { id: 'craftsman', name: 'Craftsman', description: 'Craft 1000 items.' },
  { id: 'scaled-up', name: 'Scaled Up', description: 'Obtain 40 Scales.' },
  { id: 'triple-gib', name: 'Triple Gib', description: 'Gib 3 enemies in melee sequentially.' },
  { id: 'swarm-keeper', name: 'Swarm Keeper', description: 'Obtain 20 swarmers.' },
  { id: 'purifier', name: 'Purifier', description: 'Remove Warp from 200 items.' },
  { id: 'blast-zone', name: 'Blast Zone', description: 'Fully destroy 1000 blocks with explosions.' },
  { id: 'data-miner', name: 'Data Miner', description: 'Datamine 1 Petabyte.' },
  { id: 'meteor', name: 'Meteor', description: 'Fall from 320 block height onto an enemy and take no damage.' },
  { id: 'splash-damage', name: 'Splash Damage', description: 'Kill 20 enemies with single melee hit splash damage.' },
  { id: 'tigrine-hunter', name: 'Tigrine Hunter', description: 'Obtain all 4 items in Tigrine armor set of tier 20 with natural drops.' },
  { id: 'untouchable', name: 'Untouchable', description: 'Receive no damage from 100 attacks in 1 second.' },
  { id: 'any-percent', name: 'Any Percent', description: 'Kill all bosses in a temporal region in 1 hour after generation as Purist.' },
  { id: 'treasure-hunter', name: 'Treasure Hunter', description: 'Discover 1000 fully filled loot chests with at least 27 item slots.' },
  { id: 'at-deaths-door', name: 'At Death\'s Door', description: 'Obtain 5k missing health at one moment.' },
  { id: 'boomerang', name: 'Boomerang', description: 'Gib an enemy with projectile which pierced you twice.' },
  { id: 'delta-collector', name: 'Delta Collector', description: 'Obtain 40 Δ-Fragments simultaneously on worn armor, which dropped with player-bound stat.' },
  { id: 'grape-stomp', name: 'Grape Stomp', description: 'Gib 100 enemies in 1 minute by landing onto them. Instakill gibbing 10k enemies landing onto them. Gib 100 unique bosses by landing onto them.' },
  { id: 'interior-designer', name: 'Interior Designer', description: 'Unlock all apartment variations.' },
  { id: 'survivor', name: 'Survivor', description: 'Survive 1 minute on 1 health when in battle and when it is not your max health.' },
  { id: 'damage-amplifier', name: 'Damage Amplifier', description: 'Have your enemy receive 10x more damage from a hit than you deal to them, when source of this hit is neither a melee attack nor a projectile.' },
  { id: 'nesting-doll', name: 'Nesting Doll', description: 'Telefrag a unit which has telefragged a unit in the previous 5 seconds which has telefragged a unit in the previous 5 seconds.' },
  { id: 'long-shot', name: 'Long Shot', description: 'Gib an enemy from 100 blocks with every type of projectile. For most projectiles this means increasing projectile lifespan duration and length of flight.' },
  { id: 'lucky-find', name: 'Lucky Find', description: 'Find a level 10 figurine in a chest.' },
  { id: 'overcapper', name: 'Overcapper', description: 'Instantly gain overcap health of value exceeding your max health when your max health exceeds 100.' },
  { id: 'visual-effects', name: 'Visual Effects', description: 'Wear armor with all possible visual effects, not simultaneously.' },
  { id: 'herbalist-master', name: 'Herbalist Master', description: 'Collect all herbs playing as Herbalist.' },
  { id: 'head-collector', name: 'Head Collector', description: 'Obtain heads of all enemies via decapitation natural drops.' },
  { id: 'chip-synergy', name: 'Chip Synergy', description: 'While wearing armor with total 12 inlaid Chips, have them all proc from a single trigger event.' },
  { id: 'stat-stacker', name: 'Stat Stacker', description: 'Equip armor with 32 different stats.' },
  { id: 'giant', name: 'Giant', description: 'Reach size of 15 blocks by scaling your own model with armor stats or effects.' },
  { id: 'grace-master', name: 'Grace Master', description: 'Avoid receiving fall damage equal to 10x of your current health by being in Grace period.' },
  { id: 'home-grown', name: 'Home Grown', description: 'Reach level 10 on a class which figurine with level 0 was obtained in the same temporal region where it later reached level 10.' },
  { id: 'bore-breaker', name: 'Bore Breaker', description: 'Fully break a durable mining bore with total durability of 100k.' },
  { id: 'merchant', name: 'Merchant', description: 'Trade 600 times within a single temporal region.' },
  { id: 'biome-hunter', name: 'Biome Hunter', description: 'Find a class figurine in each biome.' },
  { id: 'comebacker', name: 'Comebacker', description: 'Reflect a projectile to an enemy, sending it back. It has to travel 50 blocks before being redirected and 50 blocks after and deal a headshot.' },
  { id: 'decorator', name: 'Decorator', description: 'Unlock all possible decorations in each type of apartment.' },
  { id: 'home-upgrader', name: 'Home Upgrader', description: 'Fully upgrade an apartment with functional stations. This progress is shared between apartment types.' },
  { id: 'thievery', name: 'Thievery', description: 'Loot 1000 chests in one temporal region staying out of combat. Entering safe zone breaks the streak.' },
  { id: 'pioneer', name: 'Pioneer', description: 'Visit 100 Point Of Interest locations first.' },
  { id: 'black-sun-rises', name: 'Black Sun Rises', description: 'Kill 200 unarmed enemies using explosions during a single solar eclipse while staying out of combat. Enemy maximum health has to be higher than your maximum health.' },
  { id: 'thousand-cuts', name: 'Thousand Cuts', description: 'Kill a regenerating enemy with only 1 damage DoT. Maximum enemy health has to exceed 1000.' },
  { id: 'shoot-to-kill', name: 'Shoot to Kill', description: 'Deal 20 sequential hits which oneshot enemies while standing in the same place. Enemy health has to exceed 100. Time limit is 20 seconds.' },
  { id: 'vinyl-collector', name: 'Vinyl Collector', description: 'Obtain every vinyl with natural drops and put them into your apartment collection.' },
  { id: 'astray', name: 'Astray', description: 'Spend 20 ingame days in a row outside safe areas.' },
  { id: 'mass-decapitation', name: 'Mass Decapitation', description: 'Decapitate 7 enemies with 1 explosion which deals over 10000 damage.' },
  { id: 'orbital-research', name: 'Orbital Research', description: 'Complete 50 space station quests where you control drone remotely.' },
  { id: 'graffiti-scanner', name: 'Graffiti Scanner', description: 'Scan every type of graffiti with a Scanner to unlock it as an apartment decor.' },
  { id: 'regen-killer', name: 'Regen Killer', description: 'Deal total of 1000x of enemy\'s maximum health to them. This is possible by having them regenerate.' },
  { id: 'lakhsury', name: 'Lakhsury', description: 'Sell items for total of 100k gold.' },
  { id: 'naked-warrior', name: 'Naked Warrior', description: 'Gib 50000 enemies equipped in full armor, while you have no armor.' },
  { id: 'shellshock', name: 'Shellshock', description: 'Inflict at least 10 minutes of a single debuff effect duration on enemy using explosives.' },
  { id: 'skol', name: 'Skol', description: 'Completely fill and completely empty each flask type.' },
  { id: 'far-from-any-road', name: 'Far From Any Road', description: 'Travel 1000 blocks without using any roads or paths in a temporal region.' },
  { id: 'lose-no-faith', name: 'Lose No Faith', description: 'Instagib 100 enemies with colossal damage.' },
  { id: 'never-have-i-ever', name: 'Never Have I Ever', description: 'Complete 10 temporal zones without being affected by a negative effect / temporal debuff.' },
  { id: 'recipe-master', name: 'Recipe Master', description: 'Unlock and use every crafting recipe or blueprint. Does not matter, whether they are figurine-bound or account-bound.' },
  { id: 'consumable-expert', name: 'Consumable Expert', description: 'Use every type of consumable on equipment items to modify their stats.' },
  { id: 'flight-master', name: 'Flight Master', description: 'Traverse 10000 blocks without touching the ground, using movement abilities or flight.' },
  { id: 'max-gear', name: 'Max Gear', description: 'Wear armor each piece of which has maximum level and maximum rarity.' },
  { id: 'dual-wielder', name: 'Dual Wielder', description: 'Gib 100 enemies with dealing overkill damage to them exceeding 10x of their maximum health while you are wielding 2 non-weapon items. Does not proc while unarmed.' },
  { id: 'power-foodie', name: 'Power Foodie', description: 'Restore 1000 Power with every food type restoring Power.' },
  { id: 'treating-symptoms', name: 'Treating Symptoms', description: 'Acquire 10% degen (non-DoT, permanent effect) negated by 10% regen.' },
  { id: 'region-champion', name: 'Region Champion', description: 'End up with the most enemy kills in a temporal region after it disappears.' },
  { id: 'figurine-farmer', name: 'Figurine Farmer', description: 'Naturally drop 20 figurines while playing on a single figurine.' },
  { id: 'quest-runner', name: 'Quest Runner', description: 'Complete 10 quests without entering battle (not in a row).' },
  { id: 'neutrality', name: 'Neutrality', description: 'Reach level 10 on a figurine dropped as minimum level without entering battle state with a player or joining a party.' },
  { id: 'pet-explorer', name: 'Pet Explorer', description: 'Reveal 50 new locations of Temporal regions for yourself riding every pet.' },
  { id: 'physical-removal', name: 'Physical Removal', description: 'Remove 100 enemies from the battlefield using environmental hazards.' },
  { id: 'block-collector', name: 'Block Collector', description: 'Collect every type of building block.' },
  { id: 'as-above-so-below', name: 'As Above, So Below', description: 'Kill an enemy which is below the world in the void while you are above building height.' },
  { id: 'carpet-bombing', name: 'Carpet Bombing', description: 'Fully clean every location in the region using explosives.' },
  { id: 'knife-to-meet-you', name: 'Knife To Meet You', description: 'Kill 50 enemies with throwing knives in a single temporal region.' },
  { id: 'making-dreams-flesh', name: 'Making Dreams Flesh', description: 'Summon and defeat a nightmare entity.' },
  { id: 'big-bang-theory', name: 'Big Bang Theory', description: 'Have an explosion with 50 block radius.' },
  { id: 'speed-runner', name: 'Speed Runner', description: 'Kill a location boss within 10 minutes since the drop of figurine you are playing as.' },
  { id: 'minion-army', name: 'Minion Army', description: 'Have total Maximum health of your minions sum up to 1 million.' },
  { id: 'minion-vs-minion', name: 'Minion vs Minion', description: 'Have your minions kill an enemy which has 30 minions.' },
  { id: 'perfect-roll', name: 'Perfect Roll', description: 'Identify a 5-tier rarity item to have 5 of its stats get maximum value rolls.' },
  { id: 'carelessness', name: 'Carelessness', description: 'Upgrade to level 10 without activating any class abilities.' },
  { id: 'highborn', name: 'Highborn', description: 'Upgrade to level 10 without ever equipping armor of rarity lower than 5.' },
  { id: 'effect-master', name: 'Effect Master', description: 'Have your projectile simultaneously remove 5 positive effects from the target and apply 5 negative effects.' },
  { id: 'warped-warrior', name: 'Warped Warrior', description: 'Defeat a level 10 Boss enemy while wearing 4 parts of broken and Warped armor.' },
  { id: 'trip-master', name: 'Trip Master', description: 'Fully fill the Trip purse.' },
  { id: 'kick-808', name: 'Kick 808', description: 'Knockback an enemy 20 blocks away.' },
  { id: 'loyal-minion', name: 'Loyal Minion', description: 'Have your single minion kill 500 enemies.' },
  { id: 'reflector', name: 'Reflector', description: 'Reflect 10k damage to a single enemy.' },
  { id: 'long-range-minion', name: 'Long Range Minion', description: 'Have your minion kill an enemy 100 blocks away from them.' },
  { id: 'multi-decap', name: 'Multi Decap', description: 'Decapitate 5 enemies with a single projectile.' },
  { id: 'flask-hoarder', name: 'Flask Hoarder', description: 'Obtain 100 flask sips in 5 seconds.' },
  { id: 'friends-in-high-places', name: 'Friends In High Places', description: 'Reach maximum reputation with all factions simultaneously.' },

  // === PvP/Coop/Social Achievements ===
  { id: 'kill-streak', name: 'Kill Streak', description: 'Have a streak of 5 player kills without dying to a player. Can be completed on different classes.' },
  { id: 'class-slayer', name: 'Class Slayer', description: 'Kill 5 players on one class figurine.' },
  { id: 'million-damage', name: 'Million Damage', description: 'Deal 1 million damage to players.' },
  { id: 'guild-member', name: 'Guild Member', description: 'Join a guild.' },
  { id: 'meritocracy', name: 'Meritocracy', description: 'Have your party full with players of different classes.' },
  { id: 'headhunter', name: 'Headhunter', description: 'Gib a player with a crit headshot.' },
  { id: 'assassin', name: 'Assassin', description: 'Kill a player in one melee hit from invisibility.' },
  { id: 'temporal-killer', name: 'Temporal Killer', description: 'Kill a player while being in another temporal region.' },
  { id: 'damage-sponge', name: 'Damage Sponge', description: 'Take 10000 damage from players on a single figurine.' },
  { id: 'vulture', name: 'Vulture', description: 'Kill a player that took damage from 2 other players within last 10 seconds.' },
  { id: 'class-hunter', name: 'Class Hunter', description: 'Kill a player of each class.' },
  { id: 'versatile-killer', name: 'Versatile Killer', description: 'Kill a player as each class.' },
  { id: 'bully', name: 'Bully', description: 'Kill a player of 10 level.' },
  { id: 'above-domination', name: 'Above Domination', description: 'Kill a single player 5 times. Can be completed on multiple classes.' },
  { id: 'double-kill', name: 'Double Kill', description: 'Kill 2 players with a single action.' },
  { id: 'aerial-sniper', name: 'Aerial Sniper', description: 'Kill a player from 50 blocks above and 100 blocks afar in any direction.' },
  { id: 'dismounter', name: 'Dismounter', description: 'Kill a player who is riding a mount.' },
  { id: 'opportunist', name: 'Opportunist', description: 'Kill a player who is looting a container.' },
  { id: 'revenge', name: 'Revenge', description: 'Kill a player who killed you.' },
  { id: 'clutch', name: 'Clutch', description: 'Kill a player while having less than 5% of your Maximum health.' },
  { id: 'rage-quit', name: 'Rage Quit', description: 'Have your enemy killed due to leaving while in battle.' },
  { id: 'guardian-angel', name: 'Guardian Angel', description: 'As an Inspirer have your Guarded player kill a player.' },
  { id: 'party-explorer', name: 'Party Explorer', description: 'Enter every location in a temporal region with your party while it has at least 3 players.' },
  { id: 'anti-air', name: 'Anti-Air', description: 'Kill a flying player.' },
  { id: 'dot-finisher', name: 'DoT Finisher', description: 'Kill a stunned player with Periodical damage.' },
  { id: 'third-party', name: 'Third Party', description: 'Kill a player who is in battle with another player (who is not your ally).' },
  { id: 'death-dealer', name: 'Death Dealer', description: 'When player is in battle with you, have them killed with each of the following damage sources: Drowning, Falling, Object with gravity falling onto them from above, Suffocation.' },
  { id: 'telefrag', name: 'Telefrag', description: 'Telefrag a player.' },
  { id: 'debuff-mirror', name: 'Debuff Mirror', description: 'Kill a player while you both have same negative effects. Duration and values are ignored. Requires at least two debuffs. If one player has more debuffs, does not count.' },
  { id: 'ability-thief', name: 'Ability Thief', description: 'Steal 10 abilities from other classes.' },
  { id: 'naked-champion', name: 'Naked Champion', description: 'Kill a player of other class while being naked and unarmed.' },
  { id: 'destructor', name: 'Destructor', description: 'Destroy 100 objects placed by enemy players.' },
  { id: 'contributor', name: 'Contributor', description: 'Receive a reward for a report or suggestion.' },
  { id: 'voter', name: 'Voter', description: 'Receive 100 voting rewards.' },
  { id: 'achievement-helper', name: 'Achievement Helper', description: 'Have 5 different allied players unlock an achievement each.' },
  { id: 'minion-slayer', name: 'Minion Slayer', description: 'Kill 100 minions of enemy players.' },
  { id: 'biome-killer', name: 'Biome Killer', description: 'Kill a player in each biome.' },
  { id: 'no-damage', name: 'No Damage', description: 'Survive through a battle status with a player initiated by them, while taking no damage.' },
  { id: 'armor-breaker', name: 'Armor Breaker', description: 'Break an armor item on enemy player with hits.' },
  { id: 'hard-time', name: 'Hard Time', description: 'Visit a jailed player.' },
  { id: 'self-destruct', name: 'Self Destruct', description: 'Commit suicide.' },
  { id: 'trader', name: 'Trader', description: 'Buy 10 items from different players. Sell 10 items to different players.' },
  { id: 'ploy', name: 'Ploy', description: 'Kill an ex-ally player within 30 seconds of ending the alliance.' },
  { id: 'ultimate-grounding', name: 'Ultimate Grounding', description: 'Survive a hit dealing Colossal damage.' },
  { id: 'underdog', name: 'Underdog', description: 'Kill a 10 level player while playing as a 1 level class.' },
  { id: 'minion-master', name: 'Minion Master', description: 'Have your minions kill a player which has more minions.' },
  { id: 'death-encyclopedia', name: 'Death Encyclopedia', description: 'Die from every possible source of damage.' },
  { id: 'afk-survivor', name: 'AFK Survivor', description: 'Spend a whole cycle AFK.' },
  { id: 'paradise-in-sabreshade', name: 'Paradise In Sabreshade', description: 'Participate in a deadly party on party mass PvP. Both parties must be full. There cannot be members of a single guild among enemies from opposing parties. Event counts on first kill.' },
]

export interface UnlockedAchievement {
  id: string
  unlockedAt: string // ISO date string
}

/**
 * Generate mock unlocked achievements with progressively older timestamps
 * Newest achievement is a few hours ago, each subsequent one is older
 */
function generateUnlockedAchievements(): UnlockedAchievement[] {
  const achievementIds = [
    'scavenger',      // Newest - 3 hours ago
    'damage-sponge',  // 18 hours ago
    'meritocracy',    // 2 days ago
    'biome-hunter',   // 4 days ago
    'voter',          // 1 week ago
    'self-destruct',  // 12 days ago
    'craftsman',      // 3 weeks ago
    'revenge',        // 1 month ago
    'cartographer',   // 6 weeks ago
    'trader',         // 2 months ago
    'collector',      // 3 months ago
    'kill-streak',    // 4 months ago
    'health-nut',     // 5 months ago
    'guild-member',   // 7 months ago
    'novice',         // 10 months ago (oldest)
  ]

  // Time offsets in milliseconds (progressively older)
  const timeOffsets = [
    3 * 60 * 60 * 1000,            // 3 hours
    18 * 60 * 60 * 1000,           // 18 hours
    2 * 24 * 60 * 60 * 1000,       // 2 days
    4 * 24 * 60 * 60 * 1000,       // 4 days
    7 * 24 * 60 * 60 * 1000,       // 1 week
    12 * 24 * 60 * 60 * 1000,      // 12 days
    21 * 24 * 60 * 60 * 1000,      // 3 weeks
    30 * 24 * 60 * 60 * 1000,      // 1 month
    42 * 24 * 60 * 60 * 1000,      // 6 weeks
    60 * 24 * 60 * 60 * 1000,      // 2 months
    90 * 24 * 60 * 60 * 1000,      // 3 months
    120 * 24 * 60 * 60 * 1000,     // 4 months
    150 * 24 * 60 * 60 * 1000,     // 5 months
    210 * 24 * 60 * 60 * 1000,     // 7 months
    300 * 24 * 60 * 60 * 1000,     // 10 months
  ]

  const now = new Date()

  return achievementIds.map((id, index) => ({
    id,
    unlockedAt: new Date(now.getTime() - (timeOffsets[index] ?? 0)).toISOString(),
  }))
}

/** Mock list of unlocked achievements with timestamps for the current user */
export const UNLOCKED_ACHIEVEMENTS: UnlockedAchievement[] = generateUnlockedAchievements()

/** Get list of unlocked achievement IDs */
export const UNLOCKED_ACHIEVEMENT_IDS: string[] = UNLOCKED_ACHIEVEMENTS.map(a => a.id)

/** Check if an achievement is unlocked */
export const isAchievementUnlocked = (achievementId: string): boolean => {
  return UNLOCKED_ACHIEVEMENT_IDS.includes(achievementId)
}

/** Get count of unlocked achievements */
export const getUnlockedCount = (): number => {
  return UNLOCKED_ACHIEVEMENT_IDS.length
}

/** Get total achievement count */
export const getTotalCount = (): number => {
  return ACHIEVEMENTS.length
}

/** Get random preview achievements */
export const getPreviewAchievements = (count: number = 5): Achievement[] => {
  const shuffled = [...ACHIEVEMENTS].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

/** Get achievement by ID */
export const getAchievementById = (id: string): Achievement | undefined => {
  return ACHIEVEMENTS.find(a => a.id === id)
}

/** Get unlocked achievements with full data, sorted by unlock date (newest first) */
export const getUnlockedAchievementsWithData = (): (Achievement & { unlockedAt: string })[] => {
  return UNLOCKED_ACHIEVEMENTS
    .sort((a, b) => new Date(b.unlockedAt).getTime() - new Date(a.unlockedAt).getTime())
    .map(unlocked => {
      const achievement = getAchievementById(unlocked.id)
      if (!achievement) return null
      return { ...achievement, unlockedAt: unlocked.unlockedAt }
    })
    .filter((a): a is Achievement & { unlockedAt: string } => a !== null)
}

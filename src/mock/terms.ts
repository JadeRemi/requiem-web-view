/**
 * Game Terms / Glossary
 * Dictionary of game terminology and mechanics
 */

export interface Term {
  id: string
  name: string
  description: string
}

export const GAME_TERMS: Term[] = [
  {
    id: 'gib',
    name: 'Gib',
    description: "Certain kills may destroy enemy's body and spawn additional gore particles. Gib kills play unique sound and may cause positive effects. Gibbed enemies cannot be revived, their corpses cannot be targeted.",
  },
  {
    id: 'out-of-battle',
    name: 'Out of battle',
    description: 'When attacking enemy or being attacked by one, player enters battle state. It gets depleted after 30 seconds after last attack. Some effects rely on this state. Another state is PvP, which lasts for 60 seconds and instantly kills the player if they leave the server during effect. PvP status ends preemptively if one of the two players dies.',
  },
  {
    id: 'periodical-damage',
    name: 'Periodical damage',
    description: 'DoT is dealt over a period of time as consistent damage. But several effects may stack up the effect, so that each stack counts as independent damage source. DoT is not divided into damage types, therefore there is no poison or wither, also getting on fire and bleeding deals same damage type.',
  },
  {
    id: 'received-damage',
    name: 'Received damage',
    description: 'Damage dealt is the outgoing damage by the attacker after all the increases. Damage received is the incoming damage of the victim, after applying all reduction calculations and counting the true value to subtract.',
  },
  {
    id: 'set-bonus',
    name: 'Set bonus',
    description: 'All attributes are applied onto the player the moment they equip the armor, not calculated with each incoming hit. A set can only include all four armor items. Set bonus applies when all for items belong to same set. If multiple items have same chip inlay, or provide same non-numerical bonus, only the first one counts and works.',
  },
  {
    id: 'gold',
    name: 'Gold',
    description: 'Currency only naturally obtained by Gilt class. Can be stolen by several abilities. Can be transferred via market. Attached to each class and is not shared between different figurines for same player. Received gold is rounded down, so receiving 0,9 gold gives no gold.',
  },
  {
    id: 'allies',
    name: 'Allies',
    description: 'Minions, party members and their minions. For targeting abilities only nearby allies count. Player is not an ally of themself.',
  },
  {
    id: 'safe-zone',
    name: 'Safe zone',
    description: 'Cuboid region of max height, where no damage can be dealt or taken. Enemies will not pathfind through safe zones.',
  },
  {
    id: 'minion',
    name: 'Minion',
    description: 'Non-controllable unit, which cannot be damage by allies. Attacks enemies and sticks to the owner, teleporting when far away.',
  },
  {
    id: 'claim',
    name: 'Claim',
    description: 'Parameter of naturally dropped loot. Claimed loot can only be picked by player claiming it. Other players will pass by the item without picking it up.',
  },
  {
    id: 'natural-drop',
    name: 'Natural drop',
    description: 'A drop from a broken container or killed enemy. Not a drop by player removing item from their inventory.',
  },
  {
    id: 'overcap',
    name: 'Overcap',
    description: 'Value over maximum. For health, this will indicate 51/50 health, 1 spare point being obtained over the top. This temporal value does not affect the permanent maximum. Natural restoration does not bypass the maximum, but certain abilities can.',
  },
  {
    id: 'guild',
    name: 'Guild',
    description: 'A persistent faction of players. Member amount is unlimited. Guild members do not count as allies and may damage each other. Entrance is invitation-based. Faction is only disbanded manually.',
  },
  {
    id: 'party',
    name: 'Party',
    description: 'A temporal team of players. Member amount is limited to 10. Entrance is invitation-based. Party members count as allies and cannot damage each other. Party is disbanded when last member goes offline.',
  },
  {
    id: 'chip-socket',
    name: 'Chip socket',
    description: 'A randomly generated attribute on armor items. Allows for inserting a Chip into the item.',
  },
  {
    id: 'headshot',
    name: 'Headshot',
    description: 'A projectile hit made to the upper 5-10% of enemy body. May grant bonuses.',
  },
  {
    id: 'temporal-region',
    name: 'Temporal region',
    description: 'A world with procedurally generated landscape, containing dozens of locations and surrounded by border. A new region is presented each 3 days, removing the oldest one. 3 regions are kept simultaneously. Region has settings, varying the gameplay with weather conditions, biomes, enemy stats, loot and others. Seed for a region is a deterministically calculated hexadecimal string based on number of the cycle and private key. This implies same seed creates same region for same cycle.',
  },
  {
    id: 'durability',
    name: 'Durability',
    description: 'Analog of health for the armor items. When wearer gets hit by an enemy, a random item loses 1 durability. Taking damage naturally or from oneself does not reduce durability. Does not rely on vanilla durability. Damaged items can be repaired. Reaching 0 durability makes item temporarily unusable and broken, but does not remove it.',
  },
  {
    id: 'flat-value',
    name: 'Flat value',
    description: 'An attribute value scaled by addition. For example, Health: +1. This does not rely on amount of health already present and extends the base value.',
  },
  {
    id: 'percentage-value',
    name: 'Percentage value',
    description: 'An attribute value scaled by multiplication. For example, Health: +12%. This relies on amount of base health and only scales the total amount.',
  },
  {
    id: 'ability',
    name: 'Ability',
    description: 'A skill belonging to a class. Some skills may be shared between classes. Leveling up unlocks a new skill, prompting to enable it or to keep it disabled. Abilities cannot be activated directly with a keyboard press, they either grant completely passive bonuses, or rely on triggering conditions. Figurines determine ability order and the pool of 10 abilities picked from total amount.',
  },
  {
    id: 'class',
    name: 'Class',
    description: 'A playable present of a character, activated by a tradable figurine.',
  },
  {
    id: 'ammo',
    name: 'Ammo',
    description: 'A consumable resource required for firing ranged weapons. Some weapons spend no ammo. Weapons may require different tiers of ammo. Ammo is spent from and refilled to the first ammo box in the hotbar.',
  },
  {
    id: 'flask',
    name: 'Flask',
    description: 'Item type, storing sips. Activating a flask consumes multiple sips in exchange for effects such as buffs or instant healing.',
  },
  {
    id: 'menu-inventory',
    name: 'Menu inventory',
    description: 'A type of interactive chest-like inventory that certain abilities may unlock. Contents of these are account-bound and do not get transferred when trading a figurine. Same inventory is accessible on any figurine by same player, when having required ability.',
  },
  {
    id: 'craft',
    name: 'Craft',
    description: 'Assembling an item on a crafting grid. Requires learning a recipe first. Recipes may be figurine-shared or account-shared. Some recipes improve ingredients inserted, relying on their stats and scaling them proportionally.',
  },
  {
    id: 'datamining',
    name: 'Datamining',
    description: 'Mining an ore or mineral cluster with a pickaxe having a stat with same title. Produces no items as loot, but grants bytes of information.',
  },
  {
    id: 'trade',
    name: 'Trade',
    description: 'Using a world-wide store to exchange items for gold generated by Gilt.',
  },
  {
    id: 'value-range',
    name: 'Value range',
    description: 'An acceptable range of possible values from which a new value instance is picked each activation. For example, Damage: 20-100 may pick a value within the range on each hit.',
  },
  {
    id: 'shelter',
    name: 'Shelter',
    description: 'A personal hideout, apartment or house, that player may rent for a few cycles ahead with gold. A safe zone with crafting stations, information stands, storage access and unlockable rooms.',
  },
  {
    id: 'dynamic-web-map',
    name: 'Dynamic web map',
    description: 'A website displaying the landscape of 3 temporal regions (5 for premium users). Only displays chunks unlocked by viewing player.',
  },
  {
    id: 'qred',
    name: 'Qred',
    description: 'Qred is a unit of in-game currency, obtained with donations. Can be obtained by filing bug-reports after they are fixed. Can be obtained by suggesting content for the game after it is implemented. Qreds are bought in bulk on the marketplace.',
  },
  {
    id: 'lore',
    name: 'Lore',
    description: 'Flavor text added after the description of preset unique items. Abilities and Materials do not have Lore, but cards, unique armor pieces, flasks and weapons do.',
  },
  {
    id: 'jail',
    name: 'Jail',
    description: "Preset place in lobby for offenders with indefinite sentence. After 10 days in jail all player's belongings are put on auction. This includes figurines and vault. Donation cancels jailtime.",
  },
  {
    id: 'cycle',
    name: 'Cycle',
    description: 'A period of 3 days rotating Temporal regions. Each cycle has a number, starting from Unix epoch.',
  },
  {
    id: 'cap',
    name: 'Cap',
    description: 'A limit applied to certain stats ensuring their value will not bypass it, even if value from armor exceeds the cap. Cap on Defence stats prevents invulnerability. Cap may be increased or decresed with abilities and effects.',
  },
  {
    id: 'balance',
    name: 'Balance',
    description: 'An assumed equality of classes, not present on the server. Instead of a balance, classes form a notable gradient from best to worst, or from easy to hard. Same with abilities, items and stats. Balance is a false presupposition, limiting worldbuilding diversity.',
  },
  {
    id: 'magnitude',
    name: 'Magnitude',
    description: 'Overall value summary over multiple stats. For example, increased Defence stats magnitude increases each of them respectively.',
  },
]

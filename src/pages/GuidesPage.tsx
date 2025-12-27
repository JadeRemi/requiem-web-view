import { usePageTitle } from '../hooks/usePageTitle'
import { Typography, TypographyVariant } from '../components/Typography'
import { ImageCard } from '../components/ImageCard'
import { assetPath } from '../utils/assetPath'

interface Guide {
  id: string
  title: string
  image: string
  content: string[]
}

const GUIDES: Guide[] = [
  {
    id: 'gathering-resources',
    title: 'Gathering Resources',
    image: assetPath('/images/screenshots/guides/guide-1.jpg'),
    content: [
      'Resource gathering in Requiem differs significantly from what you might expect. Most materials are obtained through combat drops, container loot, and specialized mining called datamining. Traditional block-breaking yields minimal resources.',
      'Datamining requires a pickaxe with matching stat to the ore cluster. Mining without the correct stat produces nothing. Information bytes are rewarded instead of physical items, contributing to your overall progression.',
      'Containers scattered throughout dungeons and temporal regions hold the majority of crafting materials. Higher-risk areas contain rarer drops. Always prioritize claimed loot — items claimed by your character cannot be picked up by others.',
    ],
  },
  {
    id: 'fighting-enemies',
    title: 'Fighting Enemies and Players',
    image: assetPath('/images/screenshots/guides/guide-2.png'),
    content: [
      'Combat in Requiem is punishing and rewards preparation. Each enemy type has unique behaviors, resistances, and attack patterns. Study enemy movesets before engaging — a single mistake can result in death and permanent figurine loss.',
      'Headshots deal bonus damage on projectile attacks. Aim for the upper portion of enemy hitboxes to maximize damage output. Gibbing enemies prevents revival and may trigger beneficial effects.',
      'Player versus player combat follows different rules. PvP status lasts 60 seconds after attacking or being attacked by another player. Logging out during PvP status results in instant death. Form parties to prevent friendly fire.',
    ],
  },
  {
    id: 'progressing',
    title: 'Progressing Your Character',
    image: assetPath('/images/screenshots/guides/guide-3.jpg'),
    content: [
      'Character progression is tied to your figurine. Each figurine represents a single life — death means starting over with a new class. Experience gained unlocks abilities, with each level prompting you to enable or disable the newly available skill.',
      'Abilities cannot be activated manually. They either provide passive bonuses or trigger automatically based on conditions. Your figurine determines which 10 abilities are available from your class total pool.',
      'Gold serves as the primary currency but is only naturally obtained by the Gilt class. Other classes must acquire gold through trading, stealing, or market transactions. Gold is figurine-bound and does not transfer when trading classes.',
    ],
  },
  {
    id: 'figurines',
    title: 'Finding and Swapping Figurines',
    image: assetPath('/images/screenshots/guides/guide-4.png'),
    content: [
      'Figurines are tradable items that unlock playable classes. Activating a figurine binds it to your account until death. Each figurine carries its own gold, abilities, and progression — nothing is shared between your characters.',
      'Finding new figurines requires exploring temporal regions and defeating challenging enemies. Rarer classes drop from more dangerous encounters. The market also offers figurine trading for gold.',
      'Before swapping classes, consider transferring valuable items to a menu inventory accessible across all your figurines. Some abilities unlock persistent storage that survives class changes. Plan your progression across multiple lives.',
    ],
  },
  {
    id: 'shelter',
    title: 'Renting an Apartment or Squatting a Shelter',
    image: assetPath('/images/screenshots/guides/guide-5.png'),
    content: [
      'Shelters provide personal safe zones with crafting stations, storage access, and unlockable rooms. Rent must be paid in gold for multiple cycles ahead. Missing payments results in eviction and loss of stored items.',
      'Safe zones within shelters prevent all damage. Enemies cannot pathfind through these areas. Use your shelter as a base of operations between dangerous expeditions into temporal regions.',
      'Premium shelters offer additional rooms and features. Squatting in abandoned shelters is possible but risky — the original owner may return. Establish your presence early each cycle to secure the best locations.',
    ],
  },
  {
    id: 'temporal-regions',
    title: 'Navigating Temporal Regions',
    image: assetPath('/images/screenshots/guides/guide-6.jpg'),
    content: [
      'Temporal regions are procedurally generated worlds that rotate every 3 days. Three regions exist simultaneously — current, previous, and next. Each has unique settings affecting weather, biomes, enemy stats, and loot tables.',
      'The dynamic web map displays explored chunks. Premium users see 5 regions instead of 3. Only chunks you personally discover appear on your map. Coordinate with guild members to efficiently scout new regions.',
      'Region seeds are deterministically calculated from cycle number and server key. Experienced players may recognize terrain patterns. Borders surround each region — venturing beyond results in instant death.',
    ],
  },
]

export function GuidesPage() {
  usePageTitle()

  return (
    <div className="guides-page">
      <div className="guides-content">
        {GUIDES.map((guide, index) => (
          <section key={guide.id} id={guide.id} className="guide-section">
            <Typography variant={TypographyVariant.H2} className="guide-title">
              {guide.title}
            </Typography>
            <div className={`guide-block ${index % 2 === 0 ? 'image-left' : 'image-right'}`}>
              <div className="guide-image-wrapper">
                <ImageCard
                  src={guide.image}
                  alt={guide.title}
                  width={480}
                  height={320}
                />
              </div>
              <div className="guide-text">
                {guide.content.map((paragraph, pIndex) => (
                  <Typography
                    key={pIndex}
                    variant={TypographyVariant.Body}
                    color="var(--color-text-secondary)"
                  >
                    {paragraph}
                  </Typography>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

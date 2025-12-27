import { useState } from 'react'
import { Typography, TypographyVariant } from '../components/Typography'
import { Icon } from '../components/Icon'
import { usePageTitle } from '../hooks/usePageTitle'

interface FaqItem {
  id: string
  question: string
  answer: string
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'getting-started',
    question: 'How do I start playing on Requiem?',
    answer: 'Launch the game with a supported version (1.16.5–1.21.5), add the server address to your multiplayer list, and connect. Upon first login, you will enter the Prologue — a guided tutorial that introduces you to the core mechanics, combat system, and navigation. Once you complete the Prologue, you will be transported to the main RPG worlds where your journey truly begins. Note: Cracked/pirated Minecraft versions are not supported and will be unable to connect.',
  },
  {
    id: 'resource-pack',
    question: 'Do I need to download a resource pack?',
    answer: 'No manual download is required. When you connect to the server, our custom resource pack is automatically downloaded and applied. This pack contains all custom textures, models, sounds, and visual enhancements that bring the Requiem experience to life. Simply accept the prompt when joining, and the pack will be installed within seconds.',
  },
  {
    id: 'death-mechanics',
    question: 'I lost my gear when I died. How do I recover it?',
    answer: 'In Requiem, death carries significant consequences — your inventory drops at the point of death. If your items were not destroyed by environmental hazards (lava, void, explosions) or picked up by another player, you can return to recover them. However, dropped items decay over time and will eventually despawn. Consider this a reminder that in the hostile sectors of space and corrupted dimensions, caution is your greatest ally. Invest in protective enchantments and always have an escape plan.',
  },
  {
    id: 'experience',
    question: 'Why does my experience progression feel inconsistent?',
    answer: 'Experience gain in Requiem is designed to reward challenge and exploration. Standard hostile entities grant baseline experience, but stronger, rarer, and elite-class enemies yield significantly greater rewards. Venturing into higher-tier zones, completing dungeon encounters, and defeating bosses will accelerate your progression. Grinding weak enemies will never be as efficient as pushing your limits against formidable foes.',
  },
  {
    id: 'pay-to-win',
    question: 'Is Requiem pay-to-win?',
    answer: 'Absolutely not. Requiem strictly adheres to a fair-play philosophy. All items available for purchase are either cosmetic enhancements (skins, particle effects, visual flair) or quality-of-life conveniences that do not affect combat effectiveness or progression speed. No purchasable item grants statistical advantages over other players. Your success is determined by skill, strategy, and dedication — not your wallet.',
  },
  {
    id: 'donations-permanent',
    question: 'Are purchased items permanent?',
    answer: 'It depends on the item type. Physical items (weapons, armor, consumables) behave like any in-game item — they can be lost upon death or traded. Subscriptions (such as premium ranks or recurring benefits) must be renewed monthly to maintain access. Account-bound cosmetics and unlocks (titles, permanent visual effects) remain on your account indefinitely once purchased.',
  },
  {
    id: 'transfer-items',
    question: 'Can I transfer purchased items to another account?',
    answer: 'No. All purchases are bound to the account that made the transaction. This policy exists to maintain server economy integrity and prevent fraudulent transfers. If you need to change your primary account, contact support through our Discord — but item migration is generally not permitted.',
  },
  {
    id: 'plugins',
    question: 'Which plugins does Requiem use?',
    answer: 'All server systems, mechanics, and gameplay features are developed entirely in-house by our development team. We do not rely on publicly available plugins. This allows us to create deeply integrated, unique experiences that are impossible to replicate elsewhere. From the class system to enemy AI, dungeon generation to item crafting — everything is custom-built for Requiem.',
  },
  {
    id: 'bug-reports',
    question: 'Where can I report bugs or issues?',
    answer: 'Our primary bug tracker is hosted on our official Discord server. Navigate to the designated bug-report channel, follow the template provided, and include as much detail as possible: steps to reproduce, screenshots, coordinates, and any relevant context. Our development team reviews submissions regularly and prioritizes fixes based on severity and impact.',
  },
  {
    id: 'classes',
    question: 'How do classes work in Requiem?',
    answer: 'After completing the Prologue, you will choose your initial class archetype. Each class offers a distinct playstyle with unique abilities, stat distributions, and combat mechanics. As you progress, you can specialize further through subclass paths and ability upgrades. Class selection is meaningful but not permanent — advanced players can eventually unlock the ability to switch or multiclass, though this requires significant investment.',
  },
  {
    id: 'guilds',
    question: 'How do I join or create a guild?',
    answer: 'Guilds are player-formed organizations that provide social features, shared resources, and access to exclusive guild content. To create a guild, you must reach a certain level threshold and pay a founding fee. To join an existing guild, search the guild directory or receive an invitation from a guild officer. Guild membership unlocks guild chat, shared storage, cooperative missions, and territory control mechanics.',
  },
  {
    id: 'world-cycles',
    question: 'What are World Cycles?',
    answer: 'Requiem operates on a rotating World Cycle system. Each cycle introduces different PvP rules, environmental hazards, and progression modifiers. The "Next" cycle is a protected zone ideal for newcomers, while "Current" and "Previous" cycles offer increasingly dangerous conditions with greater rewards. Check the World Map page for current cycle status and rule sets before venturing out.',
  },
]

export function FaqPage() {
  usePageTitle()
  // All items expanded by default
  const [openItems, setOpenItems] = useState<Set<string>>(() => new Set(FAQ_ITEMS.map(item => item.id)))

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <div className="faq-page">
      <div className="faq-content">
        <div className="faq-header">
          <Typography variant={TypographyVariant.H2}>Frequently Asked Questions</Typography>
          <Typography variant={TypographyVariant.Body} color="var(--color-text-secondary)">
            Common questions about Requiem, answered.
          </Typography>
        </div>

        <div className="faq-list">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openItems.has(item.id)
            return (
              <div key={item.id} className={`faq-item ${isOpen ? 'faq-item-open' : ''}`}>
                <button
                  className="faq-question"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                >
                  <Typography variant={TypographyVariant.Body} className="faq-question-text">
                    {item.question}
                  </Typography>
                  <Icon
                    name="chevron-down"
                    size={20}
                    className="faq-chevron"
                  />
                </button>
                <div className={`faq-answer ${isOpen ? 'faq-answer-open' : ''}`}>
                  <div className="faq-answer-content">
                    <Typography variant={TypographyVariant.BodySmall} color="var(--color-text-secondary)">
                      {item.answer}
                    </Typography>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

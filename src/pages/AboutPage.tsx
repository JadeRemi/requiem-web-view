import { useState, useRef } from 'react'
import { Typography, TypographyVariant } from '../components/Typography'
import { Icon, IconName } from '../components/Icon'
import { ImageCard } from '../components/ImageCard'
import { EquipmentViewer } from '../components/EquipmentViewer'
import { ItemTooltip } from '../components/ItemTooltip'
import { useToast } from '../components/Toast'
import { usePageTitle } from '../hooks/usePageTitle'
import { SHARE_CONFIG, SERVER_VERSION } from '../config'
import { EQUIPMENT_MODELS } from '../mock/equipment'
import { assetPath } from '../utils/assetPath'

const SERVER_IP = 'play.requiem.com:25565'

const SCREENSHOTS = [
  {
    src: assetPath('/images/screenshots/screen-1.jpg'),
    description: 'Explore vast custom dungeons filled with unique challenges',
  },
  {
    src: assetPath('/images/screenshots/screen-2.jpg'),
    description: 'Battle fearsome bosses with custom abilities and mechanics',
  },
]

/**
 * Server Statistics
 * - Cycles: ~3 days per cycle, running since 2022 (~365 cycles)
 * - Figurines: Player sessions (playable class instances)
 * - Deaths: Less than figurines (max 1 death per figurine before deletion)
 * - Gold: Scarce resource
 */
const SERVER_STATS = [
  { id: 'gold', label: 'Total Gold', value: 847_293 },
  { id: 'deaths', label: 'Total Deaths', value: 12_847 },
  { id: 'figurines', label: 'Figurines Activated', value: 18_432 },
  { id: 'cycles', label: 'Total Cycles', value: 365 },
]

/** Article blocks with placeholder text */
const ARTICLE_BLOCKS = [
  {
    id: 'block-1',
    text: 'Discover a vast world of adventure where every corner holds secrets waiting to be uncovered. From ancient ruins to mystical forests, the journey never ends. Explore hidden caves, forgotten temples, and treacherous dungeons that challenge even the most seasoned adventurers.',
  },
  {
    id: 'block-2',
    text: 'Master unique combat mechanics that reward skill and strategy. Each weapon type offers distinct playstyles, allowing you to craft your perfect warrior. Learn to time your attacks, manage your resources, and exploit enemy weaknesses to emerge victorious from every encounter.',
  },
  {
    id: 'block-3',
    text: 'Join forces with other players to tackle challenging dungeons and formidable bosses. Cooperation and coordination are the keys to victory. Form lasting alliances, share knowledge, and build a reputation as your guild conquers the most dangerous content the server has to offer.',
  },
  {
    id: 'block-4',
    text: 'Progress through an intricate class system that lets you specialize and evolve your character. Unlock powerful abilities as you grow stronger. Choose your path wisely — each class offers unique skills and playstyles that fundamentally change how you experience the game.',
  },
]

interface SocialLink {
  id: string
  name: string
  icon: IconName
  getUrl: (url: string, text: string) => string
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'vk',
    name: 'VK',
    icon: 'vk',
    getUrl: (url, text) => `https://vk.com/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`,
  },
  {
    id: 'x',
    name: 'X',
    icon: 'x',
    getUrl: (url, text) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
  },
  {
    id: 'telegram',
    name: 'Telegram',
    icon: 'telegram',
    getUrl: (url, text) => `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    icon: 'whatsapp',
    getUrl: (url, text) => `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
  },
  {
    id: 'viber',
    name: 'Viber',
    icon: 'viber',
    getUrl: (url, text) => `viber://forward?text=${encodeURIComponent(text + ' ' + url)}`,
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: 'facebook',
    getUrl: (url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: 'linkedin',
    getUrl: (url, text) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&summary=${encodeURIComponent(text)}`,
  },
]

/** Article block item card - square, no rotation, tooltip on hover */
function ArticleItemCard({ itemIndex, tooltipSide }: { itemIndex: number; tooltipSide: 'left' | 'right' }) {
  const [isHovered, setIsHovered] = useState(false)
  const itemRef = useRef<HTMLDivElement>(null)
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({})
  const item = EQUIPMENT_MODELS[itemIndex]

  // Calculate tooltip position on hover
  const handleMouseEnter = () => {
    setIsHovered(true)
    if (itemRef.current) {
      const rect = itemRef.current.getBoundingClientRect()
      const gap = 8
      if (tooltipSide === 'left') {
        setTooltipStyle({
          position: 'fixed',
          top: rect.top + rect.height / 2,
          right: window.innerWidth - rect.left + gap,
          transform: 'translateY(-50%)',
        })
      } else {
        setTooltipStyle({
          position: 'fixed',
          top: rect.top + rect.height / 2,
          left: rect.right + gap,
          transform: 'translateY(-50%)',
        })
      }
    }
  }

  if (!item) return null

  return (
    <div
      ref={itemRef}
      className="about-article-item"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="about-article-item-viewer">
        <EquipmentViewer model={item} autoRotate={false} disableControls />
      </div>
      {isHovered && item.tooltip && (
        <div className="about-article-item-tooltip" style={tooltipStyle}>
          <ItemTooltip item={item.tooltip} />
        </div>
      )}
    </div>
  )
}

export function AboutPage() {
  usePageTitle()
  const toast = useToast()
  const [ipCopied, setIpCopied] = useState(false)
  const [discordCopied, setDiscordCopied] = useState(false)
  const [shareExpanded, setShareExpanded] = useState(false)

  const handleCopyIP = async () => {
    try {
      await navigator.clipboard.writeText(SERVER_IP)
      setIpCopied(true)
      toast.success('IP copied to clipboard')
      setTimeout(() => setIpCopied(false), 2000)
    } catch {
      toast.error('Failed to copy IP')
    }
  }

  const handleCopyDiscord = async () => {
    try {
      await navigator.clipboard.writeText(SHARE_CONFIG.DISCORD_INVITE)
      setDiscordCopied(true)
      toast.success('Discord link copied to clipboard')
      setTimeout(() => setDiscordCopied(false), 2000)
    } catch {
      toast.error('Failed to copy Discord link')
    }
  }

  const handleShare = (social: SocialLink) => {
    const url = social.getUrl(SHARE_CONFIG.WEBSITE_URL, SHARE_CONFIG.SHARE_TEXT)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="about-page">
      <div className="about-content">
        <div className="ip-box-wrapper">
          <button className="ip-box" onClick={handleCopyIP}>
            <span className="ip-text">{SERVER_IP}</span>
            <Icon name="copy" size={18} className={`ip-copy-icon ${ipCopied ? 'copied' : ''}`} />
          </button>
        </div>

        <div className="about-actions">
          <button className="discord-box" onClick={handleCopyDiscord}>
            <Icon name="discord" size={18} className="discord-box-icon" />
            <span className="discord-text">Join Discord</span>
            <Icon name="copy" size={16} className={`discord-copy-icon ${discordCopied ? 'copied' : ''}`} />
          </button>

          <div className="share-section">
            <button
              className="share-toggle"
              onClick={() => setShareExpanded(!shareExpanded)}
            >
              <Icon name="share" size={18} className="share-toggle-icon" />
              <span className="share-toggle-text">Share</span>
              <Icon
                name={shareExpanded ? 'chevron-up' : 'chevron-down'}
                size={16}
                className="share-toggle-chevron"
              />
            </button>
          </div>
        </div>

        {shareExpanded && (
          <div className="share-panel">
            <div className="share-links">
              {SOCIAL_LINKS.map((social) => (
                <button
                  key={social.id}
                  className={`share-link share-link-${social.id}`}
                  onClick={() => handleShare(social)}
                  title={`Share on ${social.name}`}
                >
                  <Icon name={social.icon} size={20} />
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="about-description">
          <Typography variant={TypographyVariant.Body}>
            Requiem is a custom RPG server featuring unique gameplay mechanics,
            custom enemies, and an immersive experience.
          </Typography>
          <Typography variant={TypographyVariant.Body}>
            Works on versions {SERVER_VERSION.MIN}–{SERVER_VERSION.MAX}.
          </Typography>
          <Typography variant={TypographyVariant.Body}>
            Runs on vanilla client with no mods required. The server uses an automatically
            downloaded resource pack for custom textures and models.
          </Typography>
        </div>

        {/* Article Blocks */}
        <div className="about-article-section">
          {ARTICLE_BLOCKS.map((block, index) => (
            <div
              key={block.id}
              className={`about-article-block ${index % 2 === 0 ? 'illustration-left' : 'illustration-right'}`}
            >
              <ArticleItemCard itemIndex={index} tooltipSide={index % 2 === 0 ? 'right' : 'left'} />
              <div className="about-article-text">
                <Typography variant={TypographyVariant.Body}>
                  {block.text}
                </Typography>
              </div>
            </div>
          ))}
        </div>

        {/* Server Statistics */}
        <div className="about-stats">
          {SERVER_STATS.map((stat) => (
            <div key={stat.id} className="about-stat-card">
              <span className="about-stat-value">{stat.value.toLocaleString()}</span>
              <span className="about-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="screenshot-cards">
          {SCREENSHOTS.map((screenshot, index) => (
            <ImageCard
              key={index}
              src={screenshot.src}
              alt={`Screenshot ${index + 1}`}
              description={screenshot.description}
              width={540}
              height={360}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

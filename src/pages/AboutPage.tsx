import { useState } from 'react'
import { Typography, TypographyVariant } from '../components/Typography'
import { Icon, IconName } from '../components/Icon'
import { ImageCard } from '../components/ImageCard'
import { useToast } from '../components/Toast'
import { usePageTitle } from '../hooks/usePageTitle'
import { SHARE_CONFIG } from '../config'

const SERVER_IP = 'play.requiem.com:25565'

const SCREENSHOTS = [
  {
    src: '/images/screenshots/screen-1.jpg',
    description: 'Explore vast custom dungeons filled with unique challenges',
  },
  {
    src: '/images/screenshots/screen-2.jpg',
    description: 'Battle fearsome bosses with custom abilities and mechanics',
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
        <div className="about-header">
          <Typography variant={TypographyVariant.H1}>About</Typography>
        </div>

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

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Typography, TypographyVariant } from '../components/Typography'
import { Icon, IconName } from '../components/Icon'
import { Markdown } from '../utils/markdown'
import { useToast } from '../components/Toast'
import { usePageTitle } from '../hooks/usePageTitle'
import { ROUTES, SHARE_CONFIG } from '../config'
import { MOCK_PATCHES } from '../mock/changelog'
import { formatShortDate } from '../utils/dateFormat'

const SERVER_IP = 'play.requiem.com:25565'

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

export function HomePage() {
  usePageTitle()
  const toast = useToast()
  const [ipCopied, setIpCopied] = useState(false)
  const [discordCopied, setDiscordCopied] = useState(false)
  const [shareExpanded, setShareExpanded] = useState(false)

  const latestPatch = MOCK_PATCHES[0]

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
    <div className="page home-page">
      <div className="home-content">
        <div className="ip-box-wrapper">
          <button className="ip-box" onClick={handleCopyIP}>
            <span className="ip-text">{SERVER_IP}</span>
            <Icon name="copy" size={18} className={`ip-copy-icon ${ipCopied ? 'copied' : ''}`} />
          </button>
        </div>

        <div className="home-actions">
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
        </div>

        {latestPatch && (
          <div className="home-latest-patch">
            <div className="home-latest-patch-header">
              <Typography variant={TypographyVariant.H3}>Latest Update</Typography>
              <Typography variant={TypographyVariant.Caption} color="var(--color-text-tertiary)">
                v{latestPatch.version} — {formatShortDate(latestPatch.date)}
              </Typography>
            </div>
            <div className="home-latest-patch-content">
              <Markdown content={latestPatch.content} />
            </div>
            <Link to={ROUTES.CHANGELOG} className="home-latest-patch-link">
              View full changelog
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

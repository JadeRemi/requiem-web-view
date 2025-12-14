import { useState } from 'react'
import { Typography, TypographyVariant } from '../components/Typography'
import { Icon } from '../components/Icon'
import { ImageCard } from '../components/ImageCard'
import { useToast } from '../components/Toast'

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

export function AboutPage() {
  const toast = useToast()
  const [copied, setCopied] = useState(false)

  const handleCopyIP = async () => {
    try {
      await navigator.clipboard.writeText(SERVER_IP)
      setCopied(true)
      toast.success('IP copied to clipboard')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error('Failed to copy IP')
    }
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
            <Icon name="copy" size={18} className={`ip-copy-icon ${copied ? 'copied' : ''}`} />
          </button>
        </div>

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

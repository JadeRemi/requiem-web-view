import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Typography, TypographyVariant } from '../components/Typography'
import { Icon, IconName } from '../components/Icon'
import { FacePreview } from '../components/FacePreview'
import { Markdown } from '../utils/markdown'
import { useToast } from '../components/Toast'
import { usePageTitle } from '../hooks/usePageTitle'
import { ROUTES, SHARE_CONFIG } from '../config'
import { MOCK_PATCHES } from '../mock/changelog'
import { formatShortDate } from '../utils/dateFormat'
import { getOnlinePlayers, getOnlineCount, isServerOnline } from '../mock/online-players'
import {
  getHistoricalData,
  formatChartLabel,
  type TimeRange,
  type HistoricalDataPoint,
} from '../mock/historical-online'

const SERVER_IP = 'play.requiem.com:25565'

interface SocialLink {
  id: string
  name: string
  icon: IconName
  getUrl: (url: string, text: string) => string
}

const TIME_RANGE_LABELS: Record<TimeRange, string> = {
  today: 'Today',
  week: 'This week',
  month: 'This month',
  year: 'This year',
}

interface OnlineChartProps {
  data: HistoricalDataPoint[]
  range: TimeRange
}

function OnlineChart({ data, range }: OnlineChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const chartWidth = 400
  const chartHeight = 120
  const padding = { top: 10, right: 10, bottom: 25, left: 35 }
  const innerWidth = chartWidth - padding.left - padding.right
  const innerHeight = chartHeight - padding.top - padding.bottom

  const maxCount = Math.max(...data.map((d) => d.count), 1)
  const yTicks = [0, Math.round(maxCount / 2), maxCount]

  const points = data.map((d, i) => {
    const x = padding.left + (i / (data.length - 1)) * innerWidth
    const y = padding.top + innerHeight - (d.count / maxCount) * innerHeight
    return { x, y, data: d }
  })

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')

  // Show labels only at certain intervals based on data length
  const labelInterval = data.length <= 7 ? 1 : data.length <= 12 ? 1 : Math.ceil(data.length / 6)

  return (
    <svg className="online-chart" viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="xMidYMid meet">
      {/* Y-axis labels */}
      {yTicks.map((tick) => {
        const y = padding.top + innerHeight - (tick / maxCount) * innerHeight
        return (
          <g key={tick}>
            <line
              x1={padding.left}
              y1={y}
              x2={chartWidth - padding.right}
              y2={y}
              stroke="var(--grey-800)"
              strokeWidth="1"
            />
            <text
              x={padding.left - 5}
              y={y}
              textAnchor="end"
              dominantBaseline="middle"
              className="chart-label"
            >
              {tick}
            </text>
          </g>
        )
      })}

      {/* Line */}
      <path d={linePath} fill="none" stroke="var(--magenta-800)" strokeWidth="2" />

      {/* Data points */}
      {points.map((point, i) => {
        // Position tooltip below if point is near the top
        const tooltipAbove = point.y > 30
        const tooltipY = tooltipAbove ? point.y - 25 : point.y + 10
        const textY = tooltipAbove ? point.y - 13 : point.y + 22

        return (
          <g key={i}>
            <circle
              cx={point.x}
              cy={point.y}
              r={hoveredIndex === i ? 5 : 3}
              fill="var(--magenta-600)"
              className="chart-point"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
            {hoveredIndex === i && (
              <g className="chart-tooltip">
                <rect
                  x={point.x - 20}
                  y={tooltipY}
                  width="40"
                  height="18"
                  rx="4"
                  fill="var(--grey-800)"
                  stroke="var(--grey-600)"
                />
                <text
                  x={point.x}
                  y={textY}
                  textAnchor="middle"
                  className="chart-tooltip-text"
                >
                  {point.data.count}
                </text>
              </g>
            )}
          </g>
        )
      })}

      {/* X-axis labels */}
      {points.map((point, i) => {
        if (i % labelInterval !== 0 && i !== points.length - 1) return null
        return (
          <text
            key={i}
            x={point.x}
            y={chartHeight - 5}
            textAnchor="middle"
            className="chart-label"
          >
            {formatChartLabel(point.data.timestamp, range)}
          </text>
        )
      })}
    </svg>
  )
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
  const [timeRange, setTimeRange] = useState<TimeRange>('today')

  const latestPatch = MOCK_PATCHES[0]
  const onlinePlayers = useMemo(() => getOnlinePlayers(), [])
  const onlineCount = getOnlineCount()
  const serverOnline = isServerOnline()
  const historicalData = useMemo(() => getHistoricalData(timeRange), [timeRange])

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
          <div className="home-actions-row">
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
        </div>

        {/* Online Players Section */}
        <div className="home-online-section">
          <div className="home-online-header">
            <Typography variant={TypographyVariant.Body}>
              Server status: <span className="server-status-online">{serverOnline ? 'online' : 'offline'}</span>
              {' · '}
              Currently online: <span className="online-count">{onlineCount}</span>
            </Typography>
          </div>

          {onlineCount > 0 && (
            <div className="home-online-table">
              {onlinePlayers.map((player) => (
                <div key={player.uuid} className="online-player-row">
                  <Link to={`${ROUTES.PROFILE}?uuid=${player.uuid}`} className="online-player-link">
                    <FacePreview skinHash={player.skinHash} size={20} />
                    <span className="online-player-name">{player.username}</span>
                  </Link>
                  <span className="online-player-class-info">
                    <Link
                      to={`${ROUTES.WIKI_CLASSES}#${player.playerClass.id}`}
                      className="online-player-class"
                    >
                      {player.playerClass.name}
                    </Link>
                    <span className="online-player-level">level {player.level}</span>
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="home-online-chart-section">
            <div className="chart-range-filter">
              {(Object.keys(TIME_RANGE_LABELS) as TimeRange[]).map((range) => (
                <button
                  key={range}
                  className={`chart-range-option ${timeRange === range ? 'active' : ''}`}
                  onClick={() => setTimeRange(range)}
                >
                  {TIME_RANGE_LABELS[range]}
                </button>
              ))}
            </div>
            <OnlineChart data={historicalData} range={timeRange} />
          </div>
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

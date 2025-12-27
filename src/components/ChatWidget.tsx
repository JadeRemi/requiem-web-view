import { useState, useEffect, useRef, useCallback } from 'react'
import {
  startChatStream,
  FeedItemType,
  GameEventType,
  type ChatFeedItem,
  type ChatMessage,
  type DeathEvent,
  type KillEvent,
  type PlayerRef,
} from '../mock/chat'
import { findPlayerByUuid } from '../mock/ladder'
import { ROUTES } from '../config'

/** Maximum characters before message truncates with ellipsis */
const MAX_MESSAGE_LENGTH = 120

/** Time in ms before a message starts fading */
const FADE_START_MS = 20000

/** Time in ms for full fade (message becomes invisible in collapsed state) */
const FADE_DURATION_MS = 10000

/** Time in ms before a message is deleted */
const MESSAGE_TTL_MS = 60000

/** Maximum height of chat when expanded */
const MAX_HEIGHT_EXPANDED = 400

/** Maximum height of chat when collapsed */
const MAX_HEIGHT_COLLAPSED = 200

/** Clickable player name component */
function PlayerName({ player }: { player: PlayerRef }) {
  const playerExists = player.uuid ? !!findPlayerByUuid(player.uuid) : false
  const profileUrl = playerExists && player.uuid ? `${ROUTES.PROFILE}?uuid=${player.uuid}` : null

  if (profileUrl) {
    return (
      <a
        href={profileUrl}
        className="chat-nickname chat-nickname-link"
        onClick={(e) => e.stopPropagation()}
      >
        {player.username}
      </a>
    )
  }
  return <span className="chat-nickname">{player.username}</span>
}

interface ChatFeedItemProps {
  item: ChatFeedItem
  isExpanded: boolean
  now: number
}

/** Render a chat message */
function ChatMessageItem({ message, opacity }: { message: ChatMessage; opacity: number }) {
  // Truncate message text if too long
  const truncatedText = message.message.length > MAX_MESSAGE_LENGTH
    ? message.message.slice(0, MAX_MESSAGE_LENGTH) + '…'
    : message.message

  const statusClass = message.status ? `chat-status-${message.status.toLowerCase()}` : ''

  // Check if player exists in the ladder (has a valid profile)
  const playerExists = message.uuid ? !!findPlayerByUuid(message.uuid) : false
  const profileUrl = playerExists && message.uuid ? `${ROUTES.PROFILE}?uuid=${message.uuid}` : null

  return (
    <div className="chat-message" style={{ opacity }}>
      {message.status && (
        <span className={`chat-status ${statusClass}`}>
          [{message.status}]
        </span>
      )}
      {profileUrl ? (
        <a
          href={profileUrl}
          className="chat-nickname chat-nickname-link"
          onClick={(e) => e.stopPropagation()}
        >
          {message.nickname}
        </a>
      ) : (
        <span className="chat-nickname">{message.nickname}</span>
      )}
      <span className="chat-separator">: </span>
      <span className="chat-text">{truncatedText}</span>
    </div>
  )
}

/** Render a death event */
function DeathEventItem({ event, opacity }: { event: DeathEvent; opacity: number }) {
  return (
    <div className="chat-event chat-event-death" style={{ opacity }}>
      <PlayerName player={event.player} />
      <span className="chat-event-text"> {event.reason}</span>
    </div>
  )
}

/** Render a kill event */
function KillEventItem({ event, opacity }: { event: KillEvent; opacity: number }) {
  return (
    <div className="chat-event chat-event-kill" style={{ opacity }}>
      <PlayerName player={event.victim} />
      <span className="chat-event-text"> was slain by </span>
      <PlayerName player={event.killer} />
    </div>
  )
}

/** Render a feed item (message or event) */
function FeedItem({ item, isExpanded, now }: ChatFeedItemProps) {
  const age = now - item.timestamp
  const fadeProgress = Math.max(0, Math.min(1, (age - FADE_START_MS) / FADE_DURATION_MS))
  const opacity = isExpanded ? 1 : 1 - fadeProgress
  const isFullyFaded = !isExpanded && fadeProgress >= 1

  if (isFullyFaded) return null

  if (item.type === FeedItemType.Message) {
    return <ChatMessageItem message={item} opacity={opacity} />
  }

  // Event types
  if (item.eventType === GameEventType.Death) {
    return <DeathEventItem event={item} opacity={opacity} />
  }

  if (item.eventType === GameEventType.Kill) {
    return <KillEventItem event={item} opacity={opacity} />
  }

  return null
}

export function ChatWidget() {
  const [feedItems, setFeedItems] = useState<ChatFeedItem[]>([])
  const [isExpanded, setIsExpanded] = useState(false)
  const [now, setNow] = useState(Date.now())
  const containerRef = useRef<HTMLDivElement>(null)
  const chatRef = useRef<HTMLDivElement>(null)

  // Update "now" every second for fade calculations and cleanup old items
  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Date.now()
      setNow(currentTime)

      // Delete items older than TTL
      setFeedItems(prev => prev.filter(item => currentTime - item.timestamp < MESSAGE_TTL_MS))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // Start chat stream
  useEffect(() => {
    const stopStream = startChatStream((item) => {
      setFeedItems(prev => [item, ...prev])
    })
    return stopStream
  }, [])

  // Scroll to bottom when new item arrives (if not expanded)
  useEffect(() => {
    if (chatRef.current && !isExpanded) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [feedItems, isExpanded])

  // Toggle expanded state on click
  const handleClick = useCallback(() => {
    setIsExpanded(prev => !prev)
  }, [])

  // Count visible (non-faded) items
  const visibleCount = feedItems.filter(item => {
    const age = now - item.timestamp
    const fadeProgress = (age - FADE_START_MS) / FADE_DURATION_MS
    return fadeProgress < 1
  }).length

  const isEmpty = visibleCount === 0 && !isExpanded

  const handleOverlayClick = useCallback(() => {
    setIsExpanded(false)
  }, [])

  return (
    <>
      {/* Overlay to capture clicks outside chat when expanded */}
      {isExpanded && (
        <div 
          className="chat-overlay"
          onClick={handleOverlayClick}
        />
      )}
      <div
        ref={containerRef}
        className={`chat-widget ${isExpanded ? 'chat-expanded' : ''} ${isEmpty ? 'chat-empty' : ''}`}
        onClick={handleClick}
      >
        <div
          ref={chatRef}
          className="chat-messages"
          style={{
            maxHeight: isExpanded ? MAX_HEIGHT_EXPANDED : MAX_HEIGHT_COLLAPSED,
          }}
        >
          {feedItems.map(item => (
            <FeedItem
              key={item.id}
              item={item}
              isExpanded={isExpanded}
              now={now}
            />
          ))}
          {feedItems.length === 0 && (
            <div className="chat-empty-state">No messages yet...</div>
          )}
        </div>
        {!isExpanded && (
          <div className="chat-footer">
            <span className="chat-title">Game Chat</span>
          </div>
        )}
      </div>
    </>
  )
}

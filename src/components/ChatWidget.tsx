import { useState, useEffect, useRef, useCallback } from 'react'
import { startChatStream, type ChatMessage } from '../mock/chat'
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

interface ChatMessageItemProps {
  message: ChatMessage
  isExpanded: boolean
  now: number
}

function ChatMessageItem({ message, isExpanded, now }: ChatMessageItemProps) {
  const age = now - message.timestamp
  const fadeProgress = Math.max(0, Math.min(1, (age - FADE_START_MS) / FADE_DURATION_MS))
  const opacity = isExpanded ? 1 : 1 - fadeProgress
  const isFullyFaded = !isExpanded && fadeProgress >= 1

  if (isFullyFaded) return null

  // Truncate message text if too long
  const truncatedText = message.message.length > MAX_MESSAGE_LENGTH 
    ? message.message.slice(0, MAX_MESSAGE_LENGTH) + '…' 
    : message.message

  const statusClass = message.status ? `chat-status-${message.status.toLowerCase()}` : ''
  
  // Check if player exists in the ladder (has a valid profile)
  const playerExists = message.uuid ? !!findPlayerByUuid(message.uuid) : false
  const profileUrl = playerExists && message.uuid ? `${ROUTES.PROFILE}?uuid=${message.uuid}` : null

  return (
    <div 
      className="chat-message"
      style={{ opacity }}
    >
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

export function ChatWidget() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isExpanded, setIsExpanded] = useState(false)
  const [now, setNow] = useState(Date.now())
  const containerRef = useRef<HTMLDivElement>(null)
  const chatRef = useRef<HTMLDivElement>(null)

  // Update "now" every second for fade calculations and cleanup old messages
  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Date.now()
      setNow(currentTime)
      
      // Delete messages older than TTL
      setMessages(prev => prev.filter(msg => currentTime - msg.timestamp < MESSAGE_TTL_MS))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // Start chat stream
  useEffect(() => {
    const stopStream = startChatStream((msg) => {
      setMessages(prev => [msg, ...prev])
    })
    return stopStream
  }, [])

  // Scroll to bottom when new message arrives (if not expanded)
  useEffect(() => {
    if (chatRef.current && !isExpanded) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages, isExpanded])

  // Toggle expanded state on click
  const handleClick = useCallback(() => {
    setIsExpanded(prev => !prev)
  }, [])

  // Count visible (non-faded) messages
  const visibleCount = messages.filter(msg => {
    const age = now - msg.timestamp
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
        {messages.map(msg => (
          <ChatMessageItem
            key={msg.id}
            message={msg}
            isExpanded={isExpanded}
            now={now}
          />
        ))}
          {messages.length === 0 && (
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

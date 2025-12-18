import { ReactNode } from 'react'

/**
 * Simple markdown parser for patch notes
 * Supports:
 * - ## Section headers
 * - **bold text**
 * - - Bullet lists (up to 2 levels)
 * - Regular paragraphs
 */

interface ParsedBlock {
  type: 'header' | 'list' | 'paragraph'
  content: string
  items?: ParsedListItem[]
}

interface ParsedListItem {
  content: string
  children?: ParsedListItem[]
}

/**
 * Parse inline markdown (bold)
 */
function parseInline(text: string): ReactNode[] {
  const parts: ReactNode[] = []
  const regex = /\*\*(.+?)\*\*/g
  let lastIndex = 0
  let match

  while ((match = regex.exec(text)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }
    // Add bold text
    parts.push(<strong key={match.index}>{match[1]}</strong>)
    lastIndex = regex.lastIndex
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return parts.length > 0 ? parts : [text]
}

/**
 * Parse markdown content into blocks
 */
function parseBlocks(content: string): ParsedBlock[] {
  const lines = content.split('\n')
  const blocks: ParsedBlock[] = []
  let currentList: ParsedListItem[] | null = null
  let paragraphLines: string[] = []

  const flushParagraph = () => {
    if (paragraphLines.length > 0) {
      blocks.push({
        type: 'paragraph',
        content: paragraphLines.join(' ').trim(),
      })
      paragraphLines = []
    }
  }

  const flushList = () => {
    if (currentList && currentList.length > 0) {
      blocks.push({
        type: 'list',
        content: '',
        items: currentList,
      })
      currentList = null
    }
  }

  for (const line of lines) {
    const trimmed = line.trim()

    // Header
    if (trimmed.startsWith('## ')) {
      flushParagraph()
      flushList()
      blocks.push({
        type: 'header',
        content: trimmed.slice(3),
      })
      continue
    }

    // Nested list item (2 spaces or more before -)
    if (line.match(/^  +- /)) {
      flushParagraph()
      const itemContent = trimmed.slice(2) // Remove "- "
      if (currentList && currentList.length > 0) {
        const lastItem = currentList[currentList.length - 1]!
        if (!lastItem.children) {
          lastItem.children = []
        }
        lastItem.children.push({ content: itemContent })
      }
      continue
    }

    // Top-level list item
    if (trimmed.startsWith('- ')) {
      flushParagraph()
      if (!currentList) {
        currentList = []
      }
      currentList.push({ content: trimmed.slice(2) })
      continue
    }

    // Empty line
    if (trimmed === '') {
      flushParagraph()
      flushList()
      continue
    }

    // Regular text (paragraph)
    flushList()
    paragraphLines.push(trimmed)
  }

  flushParagraph()
  flushList()

  return blocks
}

/**
 * Render a list item with optional children
 */
function renderListItem(item: ParsedListItem, index: number): ReactNode {
  return (
    <li key={index}>
      {parseInline(item.content)}
      {item.children && item.children.length > 0 && (
        <ul className="markdown-list-nested">
          {item.children.map((child, i) => (
            <li key={i}>{parseInline(child.content)}</li>
          ))}
        </ul>
      )}
    </li>
  )
}

/**
 * Render parsed blocks to React elements
 */
function renderBlocks(blocks: ParsedBlock[]): ReactNode[] {
  return blocks.map((block, index) => {
    switch (block.type) {
      case 'header':
        return (
          <h3 key={index} className="markdown-header">
            {block.content}
          </h3>
        )
      case 'list':
        return (
          <ul key={index} className="markdown-list">
            {block.items?.map((item, i) => renderListItem(item, i))}
          </ul>
        )
      case 'paragraph':
        return (
          <p key={index} className="markdown-paragraph">
            {parseInline(block.content)}
          </p>
        )
      default:
        return null
    }
  })
}

interface MarkdownProps {
  content: string
  className?: string
}

/**
 * Simple Markdown renderer component
 */
export function Markdown({ content, className }: MarkdownProps) {
  const blocks = parseBlocks(content)
  return <div className={`markdown ${className ?? ''}`}>{renderBlocks(blocks)}</div>
}

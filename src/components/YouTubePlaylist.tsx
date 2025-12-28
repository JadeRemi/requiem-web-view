import { useState } from 'react'
import { Typography, TypographyVariant } from './Typography'

interface VideoItem {
  id: string
  title: string
  uploadDate: string
  uploadedBy: string
}

interface YouTubePlaylistProps {
  /** YouTube playlist ID */
  playlistId: string
  /** Videos in the playlist */
  videos: VideoItem[]
  /** Optional title for the section */
  title?: string
}

export function YouTubePlaylist({ playlistId, videos, title }: YouTubePlaylistProps) {
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0)
  const selectedVideo = videos[selectedVideoIndex]

  return (
    <div className="youtube-playlist-section">
      {title && (
        <Typography
          variant={TypographyVariant.H2}
          style={{ marginBottom: 'var(--space-4)' }}
        >
          {title}
        </Typography>
      )}

      <div className="youtube-playlist-container">
        {/* Video Player */}
        <div className="youtube-playlist-player">
          {selectedVideo && (
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo.id}?rel=0&modestbranding=1`}
              title={selectedVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>

        {/* Video List Sidebar */}
        <div className="youtube-playlist-sidebar">
          {/* Scrollable Video List */}
          <div className="youtube-playlist-list">
            {videos.map((video, index) => (
              <button
                key={video.id}
                className={`youtube-playlist-item ${index === selectedVideoIndex ? 'active' : ''}`}
                onClick={() => setSelectedVideoIndex(index)}
              >
                <div className="youtube-playlist-thumbnail">
                  <img
                    src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                    alt={video.title}
                  />
                  {index === selectedVideoIndex && (
                    <div className="youtube-playlist-playing">
                      <span className="youtube-playlist-playing-icon">▶</span>
                    </div>
                  )}
                </div>
                <div className="youtube-playlist-info">
                  <span className="youtube-playlist-title">{video.title}</span>
                  <span className="youtube-playlist-meta">
                    Uploaded on {video.uploadDate}
                    <br />
                    by {video.uploadedBy}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Sticky Link to full playlist */}
          <a
            href={`https://www.youtube.com/playlist?list=${playlistId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="youtube-playlist-link"
          >
            View full playlist on YouTube →
          </a>
        </div>
      </div>
    </div>
  )
}

export type { VideoItem }

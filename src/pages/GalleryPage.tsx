import { usePageTitle } from '../hooks/usePageTitle'
import { Typography, TypographyVariant } from '../components/Typography'
import { ImageCard } from '../components/ImageCard'
import { assetPath } from '../utils/assetPath'

interface GalleryItem {
  id: string
  src: string
  alt: string
  timestamp: string
  submittedBy: string
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'screen-1',
    src: assetPath('/images/screenshots/screen-1.jpg'),
    alt: 'Screenshot 1',
    timestamp: 'Dec 15, 2024',
    submittedBy: 'raphel256',
  },
  {
    id: 'screen-2',
    src: assetPath('/images/screenshots/screen-2.jpg'),
    alt: 'Screenshot 2',
    timestamp: 'Dec 12, 2024',
    submittedBy: 'Zigfrit',
  },
  {
    id: 'guide-1',
    src: assetPath('/images/screenshots/guides/guide-1.jpg'),
    alt: 'Screenshot 3',
    timestamp: 'Nov 28, 2024',
    submittedBy: 'I_Chample',
  },
  {
    id: 'guide-2',
    src: assetPath('/images/screenshots/guides/guide-2.png'),
    alt: 'Screenshot 4',
    timestamp: 'Nov 25, 2024',
    submittedBy: 'AGRESSOR',
  },
  {
    id: 'guide-3',
    src: assetPath('/images/screenshots/guides/guide-3.jpg'),
    alt: 'Screenshot 5',
    timestamp: 'Nov 20, 2024',
    submittedBy: 'Troll213',
  },
  {
    id: 'guide-4',
    src: assetPath('/images/screenshots/guides/guide-4.png'),
    alt: 'Screenshot 6',
    timestamp: 'Nov 18, 2024',
    submittedBy: 'Zigfrit',
  },
  {
    id: 'guide-5',
    src: assetPath('/images/screenshots/guides/guide-5.png'),
    alt: 'Screenshot 7',
    timestamp: 'Nov 15, 2024',
    submittedBy: 'Zazik',
  },
  {
    id: 'guide-6',
    src: assetPath('/images/screenshots/guides/guide-6.jpg'),
    alt: 'Screenshot 8',
    timestamp: 'Nov 10, 2024',
    submittedBy: 'Ogurec',
  },
]

export function GalleryPage() {
  usePageTitle()

  return (
    <div className="gallery-page">
      <div className="gallery-content">
        <div className="gallery-grid">
          {GALLERY_ITEMS.map((item) => (
            <div key={item.id} className="gallery-item">
              <ImageCard
                src={item.src}
                alt={item.alt}
                width={480}
                height={320}
              />
              <div className="gallery-item-meta">
                <Typography variant={TypographyVariant.BodySmall} color="var(--grey-500)">
                  {item.timestamp} — submitted by <span className="gallery-submitter">{item.submittedBy}</span>
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

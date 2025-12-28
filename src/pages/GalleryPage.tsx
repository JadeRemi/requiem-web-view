import { usePageTitle } from '../hooks/usePageTitle'
import { Typography, TypographyVariant } from '../components/Typography'
import { ImageCard } from '../components/ImageCard'
import { YouTubePlaylist, type VideoItem } from '../components/YouTubePlaylist'
import { assetPath } from '../utils/assetPath'

interface GalleryItem {
  id: string
  src: string
  alt: string
  timestamp: string
  submittedBy: string
}

/** YouTube playlist ID */
const YOUTUBE_PLAYLIST_ID = 'PLFiAlmsNUUuYplAfcE2dfoRRgADbneEnB'

/** Videos from the playlist */
const PLAYLIST_VIDEOS: VideoItem[] = [
  { id: 'DFSgH2VKClU', title: 'Requiem Video 1', uploadDate: 'Dec 20, 2024', uploadedBy: 'RequiemOfficial' },
  { id: 'JFsSxHeXVVs', title: 'Requiem Video 2', uploadDate: 'Dec 18, 2024', uploadedBy: 'RequiemOfficial' },
  { id: 'tsMwzlKMyjM', title: 'Requiem Video 3', uploadDate: 'Dec 15, 2024', uploadedBy: 'RequiemOfficial' },
  { id: 'Q7TGLWWFhc8', title: 'Requiem Video 4', uploadDate: 'Dec 12, 2024', uploadedBy: 'RequiemOfficial' },
  { id: 'PtiVispbFuA', title: 'Requiem Video 5', uploadDate: 'Dec 10, 2024', uploadedBy: 'RequiemOfficial' },
  { id: 'EV5A3WN7gUM', title: 'Requiem Video 6', uploadDate: 'Dec 8, 2024', uploadedBy: 'RequiemOfficial' },
  { id: '8dKTOUq-L-s', title: 'Requiem Video 7', uploadDate: 'Dec 5, 2024', uploadedBy: 'RequiemOfficial' },
  { id: '49L2oGtAhZI', title: 'Requiem Video 8', uploadDate: 'Dec 3, 2024', uploadedBy: 'RequiemOfficial' },
  { id: 'oo_RS1H8wfc', title: 'Requiem Video 9', uploadDate: 'Nov 30, 2024', uploadedBy: 'RequiemOfficial' },
  { id: 'UyYOx8jErdo', title: 'Requiem Video 10', uploadDate: 'Nov 28, 2024', uploadedBy: 'RequiemOfficial' },
  { id: 'qnSUDdDPIWg', title: 'Requiem Video 11', uploadDate: 'Nov 25, 2024', uploadedBy: 'RequiemOfficial' },
  { id: 'X0CEdXHPPDM', title: 'Requiem Video 12', uploadDate: 'Nov 22, 2024', uploadedBy: 'RequiemOfficial' },
  { id: 'uaJ9wbhfR-Y', title: 'Requiem Video 13', uploadDate: 'Nov 20, 2024', uploadedBy: 'RequiemOfficial' },
  { id: 'hycBBfJQA6A', title: 'Requiem Video 14', uploadDate: 'Nov 18, 2024', uploadedBy: 'RequiemOfficial' },
  { id: 'sxqL3dcDLeM', title: 'Requiem Video 15', uploadDate: 'Nov 15, 2024', uploadedBy: 'RequiemOfficial' },
  { id: '8HqYFPeF32k', title: 'Requiem Video 16', uploadDate: 'Nov 12, 2024', uploadedBy: 'RequiemOfficial' },
  { id: 'KeoJcUu7_7I', title: 'Requiem Video 17', uploadDate: 'Nov 10, 2024', uploadedBy: 'RequiemOfficial' },
  { id: 'aMLJT7KVZJA', title: 'Requiem Video 18', uploadDate: 'Nov 8, 2024', uploadedBy: 'RequiemOfficial' },
  { id: 'a0huHBgizNM', title: 'Requiem Video 19', uploadDate: 'Nov 5, 2024', uploadedBy: 'RequiemOfficial' },
  { id: 'cifkr5KQfqs', title: 'Requiem Video 20', uploadDate: 'Nov 3, 2024', uploadedBy: 'RequiemOfficial' },
  { id: 'wt-nR8_Rl-w', title: 'Requiem Video 21', uploadDate: 'Oct 30, 2024', uploadedBy: 'RequiemOfficial' },
  { id: 'pRDLRJ33Ww0', title: 'Requiem Video 22', uploadDate: 'Oct 28, 2024', uploadedBy: 'RequiemOfficial' },
  { id: 'xkqrfA5SCvw', title: 'Requiem Video 23', uploadDate: 'Oct 25, 2024', uploadedBy: 'RequiemOfficial' },
  { id: 'CMDzR60JwyQ', title: 'Requiem Video 24', uploadDate: 'Oct 22, 2024', uploadedBy: 'RequiemOfficial' },
  { id: 'jYjSJIkhp1w', title: 'Requiem Video 25', uploadDate: 'Oct 20, 2024', uploadedBy: 'RequiemOfficial' },
  { id: 'MtEvSbP00hE', title: 'Requiem Video 26', uploadDate: 'Oct 18, 2024', uploadedBy: 'RequiemOfficial' },
  { id: 'T5FCS6RW2nE', title: 'Requiem Video 27', uploadDate: 'Oct 15, 2024', uploadedBy: 'RequiemOfficial' },
  { id: 'sL-ST12Uj78', title: 'Requiem Video 28', uploadDate: 'Oct 12, 2024', uploadedBy: 'RequiemOfficial' },
  { id: 'CkSDAWTdm4o', title: 'Requiem Video 29', uploadDate: 'Oct 10, 2024', uploadedBy: 'RequiemOfficial' },
  { id: 'Z0gqvpWtczk', title: 'Requiem Video 30', uploadDate: 'Oct 8, 2024', uploadedBy: 'RequiemOfficial' },
  { id: 'qNvuV2la9eg', title: 'Requiem Video 31', uploadDate: 'Oct 5, 2024', uploadedBy: 'RequiemOfficial' },
  { id: 'rdAVUq-yoRw', title: 'Requiem Video 32', uploadDate: 'Oct 3, 2024', uploadedBy: 'RequiemOfficial' },
  { id: 'pstnUINWBH8', title: 'Requiem Video 33', uploadDate: 'Sep 30, 2024', uploadedBy: 'RequiemOfficial' },
  { id: 'KxCzophvJ0s', title: 'Requiem Video 34', uploadDate: 'Sep 28, 2024', uploadedBy: 'RequiemOfficial' },
  { id: 'I8iNJS_C8sk', title: 'Requiem Video 35', uploadDate: 'Sep 25, 2024', uploadedBy: 'RequiemOfficial' },
]

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
        {/* Screenshots Grid */}
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

        {/* Videos Section */}
        <YouTubePlaylist
          playlistId={YOUTUBE_PLAYLIST_ID}
          videos={PLAYLIST_VIDEOS}
          title="Videos"
        />
      </div>
    </div>
  )
}

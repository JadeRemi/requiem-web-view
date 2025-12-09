import { SkinViewer } from '../components/SkinViewer'

export function ProfilePage() {
  return (
    <div className="page profile-page">
      <div className="viewer-card">
        <SkinViewer
          config={{
            animate: true,
            autoRotate: true,
            running: false,
            showCape: true,
            freezeCameraY: true,
          }}
          width={400}
          height={500}
        />
      </div>
    </div>
  )
}


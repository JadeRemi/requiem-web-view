import { EXTERNAL_URLS } from '../config'

export function MapPage() {
  return (
    <div className="page map-page">
      <iframe
        src={EXTERNAL_URLS.BLUEMAP}
        title="World Map"
        className="map-iframe"
        allowFullScreen
      />
    </div>
  )
}


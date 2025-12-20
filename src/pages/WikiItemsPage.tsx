import { Link } from 'react-router-dom'
import { Typography, TypographyVariant } from '../components/Typography'
import { EquipmentViewer } from '../components/EquipmentViewer'
import { EQUIPMENT_MODELS, EquipmentModel } from '../mock/equipment'
import { usePageTitle } from '../hooks/usePageTitle'
import { ROUTES } from '../config'
import { Icon } from '../components/Icon'

interface ItemCardProps {
  item: EquipmentModel
}

function ItemCard({ item }: ItemCardProps) {
  return (
    <div className="wiki-item-card">
      <div className="wiki-item-viewer">
        <EquipmentViewer model={item} autoRotate={false} />
      </div>
      <div className="wiki-item-info">
        <Typography variant={TypographyVariant.H4}>{item.name}</Typography>
      </div>
    </div>
  )
}

export function WikiItemsPage() {
  usePageTitle()

  return (
    <div className="wiki-page">
      <div className="wiki-header">
        <Link to={ROUTES.WIKI} className="wiki-back-link">
          <Icon name="chevron-left" size={20} />
          <Typography variant={TypographyVariant.Body}>Wiki</Typography>
        </Link>
        <Typography variant={TypographyVariant.H1}>Items</Typography>
      </div>

      <div className="wiki-section">
        <div className="wiki-items-grid">
          {EQUIPMENT_MODELS.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  )
}

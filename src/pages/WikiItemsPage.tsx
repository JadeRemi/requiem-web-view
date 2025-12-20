import { Typography, TypographyVariant } from '../components/Typography'
import { EquipmentViewer } from '../components/EquipmentViewer'
import { EQUIPMENT_MODELS, EquipmentModel } from '../mock/equipment'
import { usePageTitle } from '../hooks/usePageTitle'

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
      <div className="wiki-header" />

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

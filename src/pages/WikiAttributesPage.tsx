import { usePageTitle } from '../hooks/usePageTitle'
import { GAME_ATTRIBUTES } from '../mock/attributes'

export function WikiAttributesPage() {
  usePageTitle()

  return (
    <div className="wiki-page wiki-attributes-page">
      <div className="wiki-header" />

      <div className="wiki-section">
        <div className="attributes-table-container">
          <table className="attributes-table">
            <thead>
              <tr>
                <th>Attribute</th>
                <th>Description</th>
                <th>Flat</th>
                <th>Percent</th>
              </tr>
            </thead>
            <tbody>
              {GAME_ATTRIBUTES.map((attr) => (
                <tr key={attr.id}>
                  <td className="attribute-name">{attr.name}</td>
                  <td className="attribute-description">{attr.description}</td>
                  <td className="attribute-modifier">{attr.canBeFlat ? '+1' : '—'}</td>
                  <td className="attribute-modifier">{attr.canBePercent ? '+1%' : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

import { usePageTitle } from '../hooks/usePageTitle'
import { Typography, TypographyVariant } from '../components/Typography'
import { GAME_TERMS } from '../mock/terms'

export function WikiTermsPage() {
  usePageTitle()

  return (
    <div className="wiki-page wiki-terms-page">
      <div className="wiki-header" />

      <div className="wiki-section">
        <div className="terms-table-container">
          <table className="terms-table">
            <thead>
              <tr>
                <th>Term</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {GAME_TERMS.map((term) => (
                <tr key={term.id} id={`term-${term.id}`}>
                  <td className="term-name">
                    <Typography variant={TypographyVariant.Body} style={{ fontWeight: 500 }}>
                      {term.name}
                    </Typography>
                  </td>
                  <td className="term-description">
                    <Typography variant={TypographyVariant.BodySmall} color="var(--grey-400)">
                      {term.description}
                    </Typography>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

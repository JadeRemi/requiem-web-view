import { usePageTitle } from '../hooks/usePageTitle'
import { Typography, TypographyVariant } from '../components/Typography'
import { SERVER_RULES } from '../mock/rules'

export function RulesPage() {
  usePageTitle()

  return (
    <div className="rules-page">
      <div className="rules-caption">
        <Typography variant={TypographyVariant.BodySmall} color="var(--grey-600)">
          Server rules are an addition to EULA and legal laws and do not permit anything prohibited by them.
          <br />
          Otherwise, most activities are allowed.
        </Typography>
      </div>
      <div className="rules-table-container">
          <table className="rules-table">
            <tbody>
              {SERVER_RULES.map((rule) => (
                <tr key={rule.id} id={`rule-${rule.id}`}>
                  <td className="rule-name">
                    <Typography variant={TypographyVariant.Body} style={{ fontWeight: 500 }}>
                      {rule.rule}
                    </Typography>
                  </td>
                  <td className={`rule-status rule-status-${rule.status.toLowerCase()}`}>
                    <Typography
                      variant={TypographyVariant.BodySmall}
                      style={{ fontWeight: 600 }}
                      color="inherit"
                    >
                      {rule.status}
                    </Typography>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
    </div>
  )
}

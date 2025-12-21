import { usePageTitle } from '../hooks/usePageTitle'
import { Typography, TypographyVariant } from '../components/Typography'
import { COMMANDS } from '../mock/commands'

export function WikiCommandsPage() {
  usePageTitle()

  return (
    <div className="wiki-page wiki-commands-page">
      <div className="wiki-header" />

      <div className="wiki-section">
        <div className="commands-table-container">
          <table className="commands-table">
            <tbody>
              {COMMANDS.map((cmd) => (
                <tr key={cmd.id}>
                  <td className="command-name">
                    <Typography variant={TypographyVariant.Body} style={{ fontWeight: 500 }}>
                      {cmd.command}
                    </Typography>
                  </td>
                  <td className="command-description">
                    <Typography variant={TypographyVariant.BodySmall} color="var(--grey-400)">
                      {cmd.description}
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

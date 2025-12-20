import { Link } from 'react-router-dom'
import { Typography, TypographyVariant } from '../components/Typography'
import { FacePreview } from '../components/FacePreview'
import { Blinker } from '../components/Blinker'
import { usePageTitle } from '../hooks/usePageTitle'
import { ROUTES } from '../config'
import {
  GuildRole,
  getGuildMembers,
  getGuildRoleLabel,
  getActiveGuilds,
  getDisbandedGuilds,
  type GuildDTO,
  type GuildMemberDTO,
} from '../mock/guilds'
import { findPlayerByUuid } from '../mock/ladder'
import { isPlayerOnline } from '../mock/online-players'

interface GuildCardProps {
  guild: GuildDTO
  members: GuildMemberDTO[]
}

function GuildCard({ guild, members }: GuildCardProps) {
  // Sort members by role hierarchy
  const roleOrder: Record<GuildRole, number> = {
    [GuildRole.Owner]: 0,
    [GuildRole.Officer]: 1,
    [GuildRole.Member]: 2,
  }
  const sortedMembers = [...members].sort(
    (a, b) => roleOrder[a.role] - roleOrder[b.role]
  )

  return (
    <div className={`guild-card ${!guild.active ? 'guild-card-disbanded' : ''}`}>
      <div className="guild-card-header">
        <div className="guild-card-title">
          <Typography variant={TypographyVariant.H3} className="guild-name">
            {guild.name}
          </Typography>
          <span className="guild-tag">[{guild.tag}]</span>
        </div>
        {!guild.active && (
          <span className="guild-status-badge">Disbanded</span>
        )}
      </div>

      <Typography
        variant={TypographyVariant.BodySmall}
        color="var(--color-text-secondary)"
        className="guild-description"
      >
        {guild.description}
      </Typography>

      <div className="guild-meta">
        <Typography variant={TypographyVariant.Caption} color="var(--color-text-tertiary)">
          Founded: {new Date(guild.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </Typography>
        {guild.disbandedAt && (
          <Typography variant={TypographyVariant.Caption} color="var(--color-text-tertiary)">
            Disbanded: {new Date(guild.disbandedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </Typography>
        )}
      </div>

      <div className="guild-members">
        <Typography variant={TypographyVariant.Label} className="guild-members-title">
          {guild.active ? 'Members' : 'Former Members'} ({members.length})
        </Typography>
        <div className="guild-members-list">
          {sortedMembers.map((member) => {
            const player = findPlayerByUuid(member.playerUuid)
            if (!player) return null

            return (
              <Link
                key={member.id}
                to={`${ROUTES.PROFILE}?uuid=${player.uuid}`}
                className="guild-member"
              >
                <FacePreview skinHash={player.skinHash} size={24} className="guild-member-face" />
                <div className="guild-member-info">
                  <span className="guild-member-name">
                    {player.username}
                    {isPlayerOnline(player.uuid) && <Blinker />}
                  </span>
                  <span className="guild-member-role">{getGuildRoleLabel(member.role)}</span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export function GuildsPage() {
  usePageTitle()
  const activeGuilds = getActiveGuilds()
  const disbandedGuilds = getDisbandedGuilds()

  return (
    <div className="page guilds-page">
      <div className="guilds-content">
        <div className="guilds-section">
          <Typography variant={TypographyVariant.H2} className="guilds-section-title">
            Active Guilds
          </Typography>
          <div className="guilds-grid">
            {activeGuilds.map((guild) => (
              <GuildCard
                key={guild.uuid}
                guild={guild}
                members={getGuildMembers(guild.uuid)}
              />
            ))}
          </div>
        </div>

        <div className="guilds-section">
          <Typography variant={TypographyVariant.H2} className="guilds-section-title">
            Disbanded Guilds
          </Typography>
          <div className="guilds-grid">
            {disbandedGuilds.map((guild) => (
              <GuildCard
                key={guild.uuid}
                guild={guild}
                members={getGuildMembers(guild.uuid)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

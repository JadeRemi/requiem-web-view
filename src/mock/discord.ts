/**
 * Discord Mock Data
 * Roles, avatars, and user data for Discord-style components
 */

import { assetPath } from '../utils/assetPath'
import type { DiscordRole } from '../components/DiscordUserCard'

/**
 * Discord Role Types
 * Standard server roles with associated colors
 */
export enum DiscordRoleType {
  Owner = 'owner',
  Admin = 'admin',
  Moderator = 'moderator',
  Developer = 'developer',
  Creator = 'creator',
  Blogger = 'blogger',
  Partner = 'partner',
  VIP = 'vip',
  Active = 'active',
  Member = 'member',
  Silent = 'silent',
  Newcomer = 'newcomer',
}

/**
 * Role definitions with display names and colors
 * Colors reference CSS tokens from discord-colors.css
 */
export const DISCORD_ROLES: Record<DiscordRoleType, DiscordRole> = {
  [DiscordRoleType.Owner]: { name: 'Owner', color: 'var(--discord-role-owner)' },
  [DiscordRoleType.Admin]: { name: 'Admin', color: 'var(--discord-role-admin)' },
  [DiscordRoleType.Moderator]: { name: 'Moderator', color: 'var(--discord-role-moderator)' },
  [DiscordRoleType.Developer]: { name: 'Developer', color: 'var(--discord-role-developer)' },
  [DiscordRoleType.Creator]: { name: 'Creator', color: 'var(--discord-role-creator)' },
  [DiscordRoleType.Blogger]: { name: 'Blogger', color: 'var(--discord-role-blogger)' },
  [DiscordRoleType.Partner]: { name: 'Partner', color: 'var(--discord-role-partner)' },
  [DiscordRoleType.VIP]: { name: 'VIP', color: 'var(--discord-role-vip)' },
  [DiscordRoleType.Active]: { name: 'Active', color: 'var(--discord-role-active)' },
  [DiscordRoleType.Member]: { name: 'Member', color: 'var(--discord-role-member)' },
  [DiscordRoleType.Silent]: { name: 'Silent', color: 'var(--discord-role-silent)' },
  [DiscordRoleType.Newcomer]: { name: 'Newcomer', color: 'var(--discord-role-newcomer)' },
}

/**
 * Helper to get role objects from role types
 */
export function getRoles(...types: DiscordRoleType[]): DiscordRole[] {
  return types.map((type) => DISCORD_ROLES[type])
}

/**
 * Mock Avatar Paths
 * Placeholder avatars for mock users
 */
export const MOCK_AVATARS = {
  avatar1: assetPath('/images/avatars/avatar-1.jpg'),
  avatar2: assetPath('/images/avatars/avatar-2.jpg'),
  avatar3: assetPath('/images/avatars/avatar-3.jpg'),
} as const

/**
 * Get a random mock avatar
 */
export function getRandomAvatar(): string {
  const avatars = Object.values(MOCK_AVATARS)
  return avatars[Math.floor(Math.random() * avatars.length)] ?? MOCK_AVATARS.avatar1
}

/**
 * Mock Discord Users
 * Example users for testing and demonstration
 */
export const MOCK_DISCORD_USERS = [
  {
    username: 'ShadowKnight',
    avatarUrl: MOCK_AVATARS.avatar1,
    bannerColor: '#9b59b6',
    memberSince: 'Mar 15, 2022',
    roles: getRoles(DiscordRoleType.Admin, DiscordRoleType.Active),
  },
  {
    username: 'PhoenixRider',
    avatarUrl: MOCK_AVATARS.avatar2,
    bannerColor: '#e67e22',
    memberSince: 'Jun 8, 2022',
    roles: getRoles(DiscordRoleType.Moderator, DiscordRoleType.Creator),
  },
  {
    username: 'StormChaser',
    avatarUrl: MOCK_AVATARS.avatar3,
    bannerColor: '#3498db',
    memberSince: 'Sep 22, 2023',
    roles: getRoles(DiscordRoleType.Member, DiscordRoleType.Active),
  },
]

/**
 * Mock Player Reviews
 * Testimonials from players for the About page
 */
export const MOCK_PLAYER_REVIEWS = [
  {
    username: 'xVoidWalker',
    avatarUrl: MOCK_AVATARS.avatar1,
    timestamp: 'Today at 2:34 PM',
    content: `honestly didnt expect much when i first joined but WOW this server is something else 🔥🔥🔥 the custom dungeons are insane, spent like 4 hours in the void temple yesterday and still havent beaten the final boss 💀 love how the combat actually requires skill and not just gear. the animations are smooth af and the hitboxes feel fair. best server ive played in years fr no cap 🙌`,
    userCard: {
      memberSince: 'Aug 12, 2023',
      roles: getRoles(DiscordRoleType.Active, DiscordRoleType.Member),
    },
  },
  {
    username: 'CrimsonBlade_',
    avatarUrl: MOCK_AVATARS.avatar2,
    timestamp: 'Yesterday at 9:17 PM',
    content: `Been playing since early 2023 and the devs actually listen to feedback which is rare these days. They added the guild system after we asked for it and it works perfectly. The permadeath mechanic sounds scary but it makes every fight feel important and you actually think before engaging. Also the community is super helpful, people actually help newbies instead of just killing them lol. Highly recommend joining the discord too, lots of good guides there.`,
    userCard: {
      memberSince: 'Feb 3, 2023',
      roles: getRoles(DiscordRoleType.VIP, DiscordRoleType.Active),
    },
  },
  {
    username: 'AetherNomad',
    avatarUrl: MOCK_AVATARS.avatar3,
    timestamp: 'Dec 24, 2024',
    content: `The class system here is probably the best I've seen in any RPG server. Each class feels unique and the skill trees give you actual choices, not just "pick the meta build". My necromancer plays completely different from my friend's paladin which keeps things fresh even after hundreds of hours. Also shoutout to whoever designed the resource pack, the custom models and textures look amazing. The attention to detail on the armor sets is incredible.`,
    userCard: {
      memberSince: 'Nov 29, 2024',
      roles: getRoles(DiscordRoleType.Newcomer),
    },
  },
]

/**
 * Chat commands available to players
 * Parsed from REQ ABILITIES - Commands.csv
 * Admin commands are excluded
 */

export interface CommandEntry {
  id: string
  command: string
  description: string
}

/**
 * Player commands (excludes Admin-only commands)
 */
export const COMMANDS: CommandEntry[] = [
  { id: 'cmd001', command: '/hand', description: 'Shows item in main hand in chat with hover state.' },
  { id: 'cmd002', command: '/hand [name]', description: 'Shows item in main hand in a private message to another player with hover state.' },
  { id: 'cmd003', command: '/inventory [name]', description: 'Opens inventory of a player. Immutable for non-admins.' },
  { id: 'cmd004', command: '/lobby', description: 'Terminates current class session and sends you to lobby.' },
  { id: 'cmd005', command: '/donate', description: 'Opens a link to donate marketplace.' },
  { id: 'cmd006', command: '/discord', description: 'Links a discord account to in-game one.' },
  { id: 'cmd007', command: '/vote', description: 'Opens voting page.' },
  { id: 'cmd008', command: '/map', description: 'Opens web dynamic map.' },
  { id: 'cmd009', command: '/logout', description: 'Kicks you from server.' },
  { id: 'cmd010', command: '/guild', description: 'Opens guild menu, allows to manage players in a guild.' },
  { id: 'cmd011', command: '/guild create [name]', description: 'Creates a guild.' },
  { id: 'cmd012', command: '/guild delete', description: 'Deletes existing guild.' },
  { id: 'cmd013', command: '/guild invite [name]', description: 'Invites a member to a guild.' },
  { id: 'cmd014', command: '/guild accept', description: 'Accepts latest guild invitation.' },
  { id: 'cmd015', command: '/guild decline', description: 'Declines latest guild invitation.' },
  { id: 'cmd016', command: '/guild role [name] [role]', description: 'Manages assignments of players to preset roles.' },
  { id: 'cmd017', command: '/guild kick [name]', description: 'Excludes a player from a guild.' },
  { id: 'cmd018', command: '/guild leave', description: 'Leaves current guild.' },
  { id: 'cmd019', command: '/quest drop', description: 'Opens quest journal.' },
  { id: 'cmd020', command: '/log', description: 'Opens action log list.' },
  { id: 'cmd021', command: '/party', description: 'Opens party menu, allows to manage players in a party.' },
  { id: 'cmd022', command: '/party invite [name]', description: 'Invites a player to a party. If not in a party, creates one on accept.' },
  { id: 'cmd023', command: '/party kick [name]', description: 'Owner only. Excludes player from a party.' },
  { id: 'cmd024', command: '/party accept', description: 'Accepts latest pending party invitation.' },
  { id: 'cmd025', command: '/party decline', description: 'Declines latest party invitation.' },
  { id: 'cmd026', command: '/party leave', description: 'Opens party menu, allows to manage players in a party.' },
  { id: 'cmd027', command: '/home', description: 'Sends you to rented apartment from a Safe zone.' },
  { id: 'cmd028', command: '/pm [name]', description: 'Sends a private message to a player.' },
  { id: 'cmd029', command: '/chat', description: 'Switches between different groups of players to receive your next messages.' },
  { id: 'cmd030', command: '/chat local', description: 'Toggles receiving messages from local chat.' },
  { id: 'cmd031', command: '/chat global', description: 'Toggles receiving messages from private chat.' },
  { id: 'cmd032', command: '/chat party', description: 'Toggles receiving messages from party chat. Party owner has suffix.' },
  { id: 'cmd033', command: '/chat guild', description: 'Toggles receiving messages from guild chat. Guild members have their rank displayed.' },
  { id: 'cmd034', command: '/chat private', description: 'Toggles receiving private messages.' },
  { id: 'cmd035', command: '/help', description: 'Lists all commands available for your rank.' },
  { id: 'cmd036', command: '/inspect', description: 'Displays item data in chat, same as with /hand but only for you.' },
  { id: 'cmd037', command: '/hud', description: 'Switches between different states of HUD, adding more fields.' },
  { id: 'cmd038', command: '/referred [name]', description: 'Allows to mark an older player as one who referred you. Grants them bonuses.' },
  { id: 'cmd039', command: '/save', description: 'Consumes donate tokens to save an imprint of your current equipment. Can be restored to deprecate your previous equipment.' },
  { id: 'cmd040', command: '/reset confirm', description: 'Removes all of your progress, including quests, classes, inventories, pets. Keeps Privpacks.' },
  { id: 'cmd041', command: '/duel [name]', description: 'Sends an invitation to PvP. Only allowed in Safe zones.' },
  { id: 'cmd042', command: '/duel accept', description: 'Accepts latest pending invitation to PvP. Only allowed in Safe zones. Teleports both to PvP arena.' },
  { id: 'cmd043', command: '/dnd', description: 'Enters "do not disturb" mode. Minimal notifications are received in chat, all chat messages are disabled. Untargetable with private messages.' },
  { id: 'cmd044', command: '/autoreply [text]', description: 'Auto sends a recorded response to all private messages.' },
  { id: 'cmd045', command: '/content [link]', description: 'Allows associating media such as posts and videos with account. Reviewed by admins, rewarded upon approval.' },
  { id: 'cmd046', command: '/list', description: 'Lists all online players from Tab menu in chat. Includes AFK status, level, class, prefix.' },
  { id: 'cmd047', command: '/notifications', description: 'Shows chest menu with items to toggle, representing death messages, join messages, level up messages. Controls personal preferences regarding server messages received in chat.' },
  { id: 'cmd048', command: '/ignore [name]', description: 'Toggles ignoring chat and private messages from certain player.' },
  { id: 'cmd049', command: '/tpcall [name]', description: 'Requests teleportation to a player.' },
  { id: 'cmd050', command: '/tpcall accept', description: 'Accepts latest non-expired request for teleportation to you.' },
  { id: 'cmd051', command: '/tpcall decline', description: 'Declines latest non-expired request for teleportation to you.' },
  { id: 'cmd052', command: '/stats', description: 'Lists your current played character\'s params as a dump in chat.' },
  { id: 'cmd053', command: '/rank sort [type]', description: 'Sets the rank system within the guild. Can be role-based, like Member/Founder. Can be position-based, numbered with Roman numerals. These can be sorted by player ladders, like join date, total playtime, achievements, total exp.' },
  { id: 'cmd054', command: '/rank give [name] [rank]', description: 'Assigns the player with the given rank.' },
  { id: 'cmd055', command: '/settings', description: 'Opens visual configuration as a chest menu. Allows toggling scoreboard items, damage indicators, chat warnings, map beacons, death points and other packet-based visuals.' },
  { id: 'cmd056', command: '/report player [name] [text]', description: 'Reports a player, allows for custom message. Reports are reviewed, approved or dismissed by admins. Collects target\'s stats.' },
  { id: 'cmd057', command: '/report bug', description: 'Reports a bug. Collects sender\'s stats.' },
  { id: 'cmd058', command: '/report list', description: 'Lists previously submitted report tickets with statuses. Resolved reports are deleted within 10 cycles.' },
  { id: 'cmd059', command: '/suggest [text]', description: 'Creates a suggestion ticket, collects sender\'s stats.' },
  { id: 'cmd060', command: '/ladder [type]', description: 'Lists first 20 entries in ladder of selected type. If you are not in the first 20, lists you below with your position.' },
  { id: 'cmd061', command: '/tp [name]', description: 'Teleports you to a player.' },
]

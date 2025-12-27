/**
 * Server Rules
 * Rules and their enforcement status
 */

export interface Rule {
  id: string
  rule: string
  status: 'Controlled' | 'Allowed'
}

export const SERVER_RULES: Rule[] = [
  {
    id: 'spam',
    rule: 'Spam',
    status: 'Controlled',
  },
  {
    id: 'hacks-cheat-client',
    rule: 'Hacks, cheat client',
    status: 'Controlled',
  },
  {
    id: 'staff-impersonation',
    rule: 'Staff impersonation',
    status: 'Controlled',
  },
  {
    id: 'chat-flooding',
    rule: 'Chat flooding',
    status: 'Allowed',
  },
  {
    id: 'multiacc',
    rule: 'Multiacc',
    status: 'Allowed',
  },
  {
    id: 'offence-bigotry',
    rule: 'Offence, bigotry, hatespeech, politics, NSFW',
    status: 'Allowed',
  },
  {
    id: 'griefing',
    rule: 'Griefing',
    status: 'Allowed',
  },
  {
    id: 'pvp-spawnkill',
    rule: 'PvP, spawnkill, spawn camping',
    status: 'Allowed',
  },
  {
    id: 'bug-abuse',
    rule: 'Bug abuse, exploits',
    status: 'Allowed',
  },
  {
    id: 'item-stealing',
    rule: 'Item stealing',
    status: 'Allowed',
  },
  {
    id: 'bot-accounts',
    rule: 'Bot accounts',
    status: 'Allowed',
  },
  {
    id: 'non-english-chat',
    rule: 'Non-English chat',
    status: 'Allowed',
  },
  {
    id: 'lagmachines',
    rule: 'Lagmachines',
    status: 'Allowed',
  },
  {
    id: 'market-manipulation',
    rule: 'Market manipulation',
    status: 'Allowed',
  },
  {
    id: 'fraud-scamming',
    rule: 'Fraud or scamming',
    status: 'Allowed',
  },
  {
    id: 'lengthy-afk',
    rule: 'Lengthy AFK',
    status: 'Allowed',
  },
  {
    id: 'duping',
    rule: 'Duping',
    status: 'Allowed',
  },
  {
    id: 'ddos',
    rule: 'DDOS',
    status: 'Allowed',
  },
  {
    id: 'altering-resourcepacks',
    rule: 'Altering resourcepacks, fullbright, XRay',
    status: 'Allowed',
  },
  {
    id: 'irl-trading',
    rule: 'IRL trading, RMT',
    status: 'Allowed',
  },
]

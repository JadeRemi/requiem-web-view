/**
 * Time Ladder Data
 * Player playtime and AFK statistics
 *
 * Values: playtime in minutes, afkTime in minutes
 * lastActive: ISO date string of last activity
 * firstJoined: ISO date string of first join
 */

export interface TimeLadderEntry {
  uuid: string
  playtime: number
  afkTime: number
  lastActive: string
  firstJoined: string
}

/**
 * Time Ladder - sorted by total playtime (descending)
 */
export const TIME_LADDER: TimeLadderEntry[] = [
  { uuid: 'f6a7b8c9-d0e1-4f2a-3b4c-5d6e7f8a9b0c', playtime: 52420, afkTime: 8430, lastActive: '2024-12-19T14:32:00Z', firstJoined: '2022-03-15T10:20:00Z' },
  { uuid: 'c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f', playtime: 48960, afkTime: 12340, lastActive: '2024-12-18T22:15:00Z', firstJoined: '2022-04-22T16:45:00Z' },
  { uuid: 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', playtime: 45230, afkTime: 5670, lastActive: '2024-12-20T08:45:00Z', firstJoined: '2022-05-10T08:30:00Z' },
  { uuid: 'c9d0e1f2-a3b4-4c5d-6e7f-8a9b0c1d2e3f', playtime: 41890, afkTime: 9870, lastActive: '2024-12-19T19:20:00Z', firstJoined: '2022-06-18T14:15:00Z' },
  { uuid: 'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e', playtime: 38450, afkTime: 4560, lastActive: '2024-12-20T11:30:00Z', firstJoined: '2022-07-05T20:00:00Z' },
  { uuid: 'e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8a9b', playtime: 35670, afkTime: 7890, lastActive: '2024-12-17T16:40:00Z', firstJoined: '2022-08-12T12:30:00Z' },
  { uuid: 'd4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a', playtime: 32140, afkTime: 3450, lastActive: '2024-12-20T09:15:00Z', firstJoined: '2022-09-01T18:45:00Z' },
  { uuid: 'a7b8c9d0-e1f2-4a3b-4c5d-6e7f8a9b0c1d', playtime: 29870, afkTime: 6780, lastActive: '2024-12-18T20:50:00Z', firstJoined: '2022-09-25T09:20:00Z' },
  { uuid: 'b8c9d0e1-f2a3-4b4c-5d6e-7f8a9b0c1d2e', playtime: 27560, afkTime: 2340, lastActive: '2024-12-16T14:25:00Z', firstJoined: '2022-10-14T15:10:00Z' },
  { uuid: 'd0e1f2a3-b4c5-4d6e-7f8a-9b0c1d2e3f4a', playtime: 25230, afkTime: 5670, lastActive: '2024-12-19T10:35:00Z', firstJoined: '2022-11-02T11:40:00Z' },
  { uuid: 'e1f2a3b4-c5d6-4e7f-8a9b-0c1d2e3f4a5b', playtime: 22890, afkTime: 4560, lastActive: '2024-12-20T07:20:00Z', firstJoined: '2022-11-20T17:55:00Z' },
  { uuid: 'f2a3b4c5-d6e7-4f8a-9b0c-1d2e3f4a5b6c', playtime: 20450, afkTime: 3890, lastActive: '2024-12-15T23:10:00Z', firstJoined: '2022-12-08T13:25:00Z' },
  { uuid: 'a3b4c5d6-e7f8-4a9b-0c1d-2e3f4a5b6c7d', playtime: 18670, afkTime: 2670, lastActive: '2024-12-14T18:45:00Z', firstJoined: '2023-01-03T19:30:00Z' },
  { uuid: 'b4c5d6e7-f8a9-4b0c-1d2e-3f4a5b6c7d8e', playtime: 16340, afkTime: 4120, lastActive: '2024-12-13T12:30:00Z', firstJoined: '2023-01-22T10:15:00Z' },
  { uuid: 'c5d6e7f8-a9b0-4c1d-2e3f-4a5b6c7d8e9f', playtime: 14890, afkTime: 1890, lastActive: '2024-12-12T09:55:00Z', firstJoined: '2023-02-10T16:40:00Z' },
  { uuid: 'd6e7f8a9-b0c1-4d2e-3f4a-5b6c7d8e9f0a', playtime: 13450, afkTime: 2340, lastActive: '2024-12-11T21:20:00Z', firstJoined: '2023-02-28T22:05:00Z' },
  { uuid: 'e7f8a9b0-c1d2-4e3f-4a5b-6c7d8e9f0a1b', playtime: 12120, afkTime: 1560, lastActive: '2024-12-10T15:40:00Z', firstJoined: '2023-03-18T08:50:00Z' },
  { uuid: 'f8a9b0c1-d2e3-4f4a-5b6c-7d8e9f0a1b2c', playtime: 10890, afkTime: 2890, lastActive: '2024-12-09T11:15:00Z', firstJoined: '2023-04-05T14:35:00Z' },
  { uuid: 'a9b0c1d2-e3f4-4a5b-6c7d-8e9f0a1b2c3d', playtime: 9670, afkTime: 1230, lastActive: '2024-12-08T07:30:00Z', firstJoined: '2023-04-24T20:20:00Z' },
  { uuid: 'b0c1d2e3-f4a5-4b6c-7d8e-9f0a1b2c3d4e', playtime: 8450, afkTime: 1670, lastActive: '2024-12-07T16:50:00Z', firstJoined: '2023-05-12T12:45:00Z' },
  { uuid: 'c1d2e3f4-a5b6-4c7d-8e9f-0a1b2c3d4e5f', playtime: 7340, afkTime: 890, lastActive: '2024-12-06T22:25:00Z', firstJoined: '2023-05-30T18:10:00Z' },
  { uuid: 'd2e3f4a5-b6c7-4d8e-9f0a-1b2c3d4e5f6a', playtime: 6230, afkTime: 1450, lastActive: '2024-12-05T13:40:00Z', firstJoined: '2023-06-17T09:55:00Z' },
  { uuid: 'e3f4a5b6-c7d8-4e9f-0a1b-2c3d4e5f6a7b', playtime: 5670, afkTime: 780, lastActive: '2024-12-04T19:15:00Z', firstJoined: '2023-07-05T15:30:00Z' },
  { uuid: 'f4a5b6c7-d8e9-4f0a-1b2c-3d4e5f6a7b8c', playtime: 4890, afkTime: 670, lastActive: '2024-12-03T08:50:00Z', firstJoined: '2023-07-23T21:45:00Z' },
  { uuid: 'a5b6c7d8-e9f0-4a1b-2c3d-4e5f6a7b8c9d', playtime: 4230, afkTime: 540, lastActive: '2024-12-02T14:30:00Z', firstJoined: '2023-08-10T17:20:00Z' },
  { uuid: 'b6c7d8e9-f0a1-4b2c-3d4e-5f6a7b8c9d0e', playtime: 3670, afkTime: 890, lastActive: '2024-12-01T10:45:00Z', firstJoined: '2023-08-28T11:35:00Z' },
  { uuid: 'c7d8e9f0-a1b2-4c3d-4e5f-6a7b8c9d0e1f', playtime: 3120, afkTime: 450, lastActive: '2024-11-30T20:20:00Z', firstJoined: '2023-09-15T23:50:00Z' },
  { uuid: 'd8e9f0a1-b2c3-4d4e-5f6a-7b8c9d0e1f2a', playtime: 2780, afkTime: 340, lastActive: '2024-11-29T16:35:00Z', firstJoined: '2023-10-03T07:15:00Z' },
  { uuid: 'e9f0a1b2-c3d4-4e5f-6a7b-8c9d0e1f2a3b', playtime: 2340, afkTime: 560, lastActive: '2024-11-28T12:10:00Z', firstJoined: '2023-10-21T13:40:00Z' },
  { uuid: 'f0a1b2c3-d4e5-4f6a-7b8c-9d0e1f2a3b4c', playtime: 1980, afkTime: 230, lastActive: '2024-11-27T18:55:00Z', firstJoined: '2023-11-08T19:25:00Z' },
  { uuid: 'a1b2c3d4-e5f6-4a7b-8c9d-1e2f3a4b5c6d', playtime: 1670, afkTime: 180, lastActive: '2024-11-26T09:30:00Z', firstJoined: '2023-11-26T10:50:00Z' },
  { uuid: 'b2c3d4e5-f6a7-4b8c-9d0e-2f3a4b5c6d7e', playtime: 1450, afkTime: 340, lastActive: '2024-11-25T15:45:00Z', firstJoined: '2023-12-14T16:15:00Z' },
  { uuid: 'c3d4e5f6-a7b8-4c9d-0e1f-3a4b5c6d7e8f', playtime: 1230, afkTime: 120, lastActive: '2024-11-24T21:20:00Z', firstJoined: '2024-01-01T22:40:00Z' },
  { uuid: 'd4e5f6a7-b8c9-4d0e-1f2a-4b5c6d7e8f9a', playtime: 1080, afkTime: 230, lastActive: '2024-11-23T07:55:00Z', firstJoined: '2024-01-19T08:05:00Z' },
  { uuid: 'e5f6a7b8-c9d0-4e1f-2a3b-5c6d7e8f9a0b', playtime: 890, afkTime: 90, lastActive: '2024-11-22T13:10:00Z', firstJoined: '2024-02-06T14:30:00Z' },
  { uuid: 'f6a7b8c9-d0e1-4f2a-3b4c-6d7e8f9a0b1c', playtime: 720, afkTime: 180, lastActive: '2024-11-21T19:35:00Z', firstJoined: '2024-02-24T20:55:00Z' },
  { uuid: 'a7b8c9d0-e1f2-4a3b-4c5d-7e8f9a0b1c2d', playtime: 560, afkTime: 70, lastActive: '2024-11-20T11:50:00Z', firstJoined: '2024-03-13T12:20:00Z' },
  { uuid: 'b8c9d0e1-f2a3-4b4c-5d6e-8f9a0b1c2d3e', playtime: 430, afkTime: 90, lastActive: '2024-11-19T17:25:00Z', firstJoined: '2024-03-31T18:45:00Z' },
  { uuid: 'c9d0e1f2-a3b4-4c5d-6e7f-9a0b1c2d3e4f', playtime: 320, afkTime: 40, lastActive: '2024-11-18T23:40:00Z', firstJoined: '2024-04-18T10:10:00Z' },
  { uuid: 'd0e1f2a3-b4c5-4d6e-7f8a-0b1c2d3e4f5a', playtime: 180, afkTime: 20, lastActive: '2024-11-17T08:15:00Z', firstJoined: '2024-05-06T16:35:00Z' },
]

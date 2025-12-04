/**
 * Minecraft Skin Hash Utilities
 * 
 * Minecraft skin textures can be referenced via base64-encoded JSON hashes.
 * These utilities decode hashes and extract texture URLs.
 */

/** Decoded Minecraft texture profile */
export interface MinecraftTextureProfile {
  timestamp: number
  profileId: string
  profileName: string
  textures: {
    SKIN?: {
      url: string
      metadata?: {
        model?: 'slim' | 'classic'
      }
    }
    CAPE?: {
      url: string
    }
  }
}

/** Result of decoding a skin hash */
export interface DecodedSkinData {
  profileId: string
  profileName: string
  skinUrl: string | null
  capeUrl: string | null
  isSlim: boolean
  timestamp: Date
}

/**
 * Decode a Minecraft skin hash (base64 encoded JSON)
 * @param hash - The base64 encoded hash string
 * @returns Decoded skin data or null if invalid
 */
export function decodeSkinHash(hash: string): DecodedSkinData | null {
  try {
    const jsonString = atob(hash)
    const profile = JSON.parse(jsonString) as MinecraftTextureProfile

    const skinTexture = profile.textures.SKIN
    const capeTexture = profile.textures.CAPE

    return {
      profileId: profile.profileId,
      profileName: profile.profileName,
      skinUrl: skinTexture?.url ?? null,
      capeUrl: capeTexture?.url ?? null,
      isSlim: skinTexture?.metadata?.model === 'slim',
      timestamp: new Date(profile.timestamp),
    }
  } catch {
    console.error('Failed to decode skin hash')
    return null
  }
}

/**
 * Encode skin data to a Minecraft hash format
 * @param data - The skin data to encode
 * @returns Base64 encoded hash string
 */
export function encodeSkinHash(data: {
  profileId: string
  profileName: string
  skinUrl?: string
  capeUrl?: string
  isSlim?: boolean
}): string {
  const profile: MinecraftTextureProfile = {
    timestamp: Date.now(),
    profileId: data.profileId,
    profileName: data.profileName,
    textures: {},
  }

  if (data.skinUrl) {
    profile.textures.SKIN = {
      url: data.skinUrl,
      ...(data.isSlim && { metadata: { model: 'slim' } }),
    }
  }

  if (data.capeUrl) {
    profile.textures.CAPE = {
      url: data.capeUrl,
    }
  }

  return btoa(JSON.stringify(profile))
}

/**
 * Extract the texture ID from a Minecraft texture URL
 * @param url - The full texture URL
 * @returns The texture ID or null
 */
export function extractTextureId(url: string): string | null {
  const match = url.match(/\/texture\/([a-f0-9]+)$/i)
  return match?.[1] ?? null
}

/**
 * Build a Minecraft texture URL from a texture ID
 * @param textureId - The texture ID hash
 * @returns Full texture URL
 */
export function buildTextureUrl(textureId: string): string {
  return `http://textures.minecraft.net/texture/${textureId}`
}

/**
 * Get a proxied skin URL (for CORS issues with minecraft.net)
 * Uses Crafatar as a proxy service
 * @param uuid - The player UUID
 * @returns Proxied skin URL
 */
export function getCrafatarSkinUrl(uuid: string): string {
  const cleanUuid = uuid.replace(/-/g, '')
  return `https://crafatar.com/skins/${cleanUuid}`
}

/**
 * Get a proxied cape URL
 * @param uuid - The player UUID
 * @returns Proxied cape URL
 */
export function getCrafatarCapeUrl(uuid: string): string {
  const cleanUuid = uuid.replace(/-/g, '')
  return `https://crafatar.com/capes/${cleanUuid}`
}

/**
 * Get a rendered avatar image URL
 * @param uuid - The player UUID
 * @param size - Image size in pixels
 * @returns Avatar URL
 */
export function getCrafatarAvatarUrl(uuid: string, size = 64): string {
  const cleanUuid = uuid.replace(/-/g, '')
  return `https://crafatar.com/avatars/${cleanUuid}?size=${size}&overlay`
}


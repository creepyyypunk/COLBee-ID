/**
 * Layout configuration for COLBee ID cards
 * All positions are in pixels from top-left corner
 */
export const CARD_LAYOUT = {
  /** Display dimensions (browser preview and export) */
  display: {
    width: 1200,
    height: 630,
  },

  /** High-resolution render dimensions (unused, kept for reference) */
  render: {
    width: 2400,
    height: 1260,
  },

  /** Avatar circle configuration */
  avatar: {
    x: 100,
    y: 150,
    radius: 120,
  },

  /** Username text styling and position */
  username: {
    x: 350,
    y: 200,
    fontSize: 48,
    fontWeight: 'bold' as const,
    color: '#1A1A1A',
  },

  /** Role text styling and position */
  role: {
    x: 350,
    y: 260,
    fontSize: 32,
    color: '#666666',
  },

  /** Social media icons and handles */
  social: {
    twitter: { x: 350, y: 318, fontSize: 24 },
    discord: { x: 350, y: 358, fontSize: 24 },
  },

  /** Additional role badges layout */
  achievements: {
    startX: 350,
    startY: 450,
    iconSize: 60,
    spacing: 80,
  },

  /** Glow effect configuration for role-based card styling */
  glow: {
    baseBlur: 20,
    baseSpread: 5,
    maxLayers: 4,
  },
} as const;

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
    x: 600, // centered: (1200 - 240) / 2 = 480, +120 for center of circle = 600
    y: 80,
    radius: 110,
  },

  /** Username text styling and position */
  username: {
    x: 600, // centered
    y: 290,
    fontSize: 60,
    fontWeight: 'bold' as const,
    color: '#1A1A1A',
  },

  /** Social media icons and handles */
  social: {
    twitter: { x: 600, y: 365, fontSize: 40 },
    discord: { x: 600, y: 410, fontSize: 40 },
  },

  /** Additional role badges layout */
  achievements: {
    startX: 600, // centered
    startY: 460,
    iconSize: 80,
    spacing: 95,
  },

  /** Glow effect configuration for role-based card styling */
  glow: {
    baseBlur: 20,
    baseSpread: 5,
    maxLayers: 4,
  },
} as const;

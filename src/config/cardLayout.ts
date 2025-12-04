export const CARD_LAYOUT = {
  display: {
    width: 1200,
    height: 630
  },
  render: {
    width: 2400,
    height: 1260
  },
  avatar: {
    x: 100,
    y: 150,
    radius: 120
  },
  username: {
    x: 350,
    y: 200,
    fontSize: 48,
    fontWeight: 'bold' as const,
    color: '#1A1A1A'
  },
  role: {
    x: 350,
    y: 260,
    fontSize: 32,
    color: '#666666'
  },
  social: {
    twitter: { x: 350, y: 330, fontSize: 24 },
    discord: { x: 350, y: 370, fontSize: 24 }
  },
  achievements: {
    startX: 350,
    startY: 450,
    iconSize: 60,
    spacing: 80
  },
  glow: {
    baseBlur: 20,
    baseSpread: 5,
    maxLayers: 4
  }
};

// This utility generates placeholder card backgrounds as data URLs
// These will be replaced by actual designs later

export function generatePlaceholderCard(roleId: string): string {
  const gradients: Record<string, { start: string; end: string; label: string }> = {
    'newbee': { start: '#FFF9E6', end: '#FFD700', label: 'NEWBEE' },
    'worker-bee': { start: '#FFE5B4', end: '#FF8C00', label: 'WORKER BEE' },
    'honeycomber': { start: '#FFBF00', end: '#8B4513', label: 'HONEYCOMBER' },
    'manuka': { start: '#D2691E', end: '#800000', label: 'MANUKA' },
    'bee-younder': { start: '#E6E6FA', end: '#8A2BE2', label: 'BEE-YOUNDER' }
  };

  const { start, end, label } = gradients[roleId] || gradients['newbee'];

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
      <defs>
        <linearGradient id="grad-${roleId}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${start};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${end};stop-opacity:1" />
        </linearGradient>
        <pattern id="hexagon-${roleId}" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
          <path d="M30 0 L45 13 L45 39 L30 52 L15 39 L15 13 Z" fill="none" stroke="#000000" stroke-width="1" opacity="0.1"/>
        </pattern>
      </defs>
      <rect width="1200" height="630" fill="url(#grad-${roleId})"/>
      <rect width="1200" height="630" fill="url(#hexagon-${roleId})"/>
      <text x="950" y="590" font-family="Arial, sans-serif" font-size="32" fill="#000000" opacity="0.2" font-weight="bold">${label}</text>
    </svg>
  `;

  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

export function generatePlaceholderIcon(achievementId: string): string {
  const colors: Record<string, { bg: string; text: string; initials: string }> = {
    'colmeia-collective': { bg: '#FF6B9D', text: '#FFFFFF', initials: 'CC' },
    'colmeia-guider': { bg: '#4ECDC4', text: '#FFFFFF', initials: 'CG' },
    'colb-1k': { bg: '#FFD700', text: '#000000', initials: '1K' },
    'colomeia-minter': { bg: '#9B59B6', text: '#FFFFFF', initials: 'CM' },
    'core-team': { bg: '#E74C3C', text: '#FFFFFF', initials: 'CT' }
  };

  const { bg, text, initials } = colors[achievementId] || { bg: '#CCCCCC', text: '#000000', initials: '?' };

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="28" fill="${bg}" stroke="#FFFFFF" stroke-width="2"/>
      <text x="30" y="38" font-family="Arial, sans-serif" font-size="18" fill="${text}" text-anchor="middle" font-weight="bold">${initials}</text>
    </svg>
  `;

  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

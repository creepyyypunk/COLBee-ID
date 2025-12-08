import { AdditionalRole } from '../types/role.types';
import { generatePlaceholderIcon } from '../utils/placeholderGenerator';

export const ADDITIONAL_ROLES: AdditionalRole[] = [
  {
    id: 'colmeia-collective',
    name: 'Colmeia Collective',
    icon: '/images/avatar_bee.webp',
    glowColor: '#FF6B9D',
    glowIntensity: 0.5
  },
  {
    id: 'colmeia-guider',
    name: 'Colmeia Guider',
    icon: generatePlaceholderIcon('colmeia-guider'),
    glowColor: '#4ECDC4',
    glowIntensity: 0.5
  },
  {
    id: 'colb-1k',
    name: 'Colb 1k',
    icon: generatePlaceholderIcon('colb-1k'),
    glowColor: '#FFD700',
    glowIntensity: 0.5
  },
  {
    id: 'colomeia-minter',
    name: 'Colomeia Minter',
    icon: generatePlaceholderIcon('colomeia-minter'),
    glowColor: '#9B59B6',
    glowIntensity: 0.5
  },
  {
    id: 'mod',
    name: 'Mod',
    icon: generatePlaceholderIcon('mod'),
    glowColor: '#3498DB',
    glowIntensity: 0.5
  }
];

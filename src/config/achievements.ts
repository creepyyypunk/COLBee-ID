import { Achievement } from '../types/role.types';
import { generatePlaceholderIcon } from '../utils/placeholderGenerator';

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'colmeia-collective',
    name: 'Colmeia Collective',
    icon: generatePlaceholderIcon('colmeia-collective'),
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
  }
];

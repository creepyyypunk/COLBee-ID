import { Role } from '../types/role.types';
import { generatePlaceholderCard } from '../utils/placeholderGenerator';

export const ROLES: Role[] = [
  {
    id: 'newbee',
    name: 'newbee',
    displayName: 'Newbee',
    background: '/card-designs/test2.png',
    glowColor: '#FFF4CC',
    glowIntensity: 0.8,
    usernameColor: '#331e1a',
    socialColor: '#664c0f'
  },
  {
    id: 'worker-bee',
    name: 'worker-bee',
    displayName: 'Worker Bee',
    background: generatePlaceholderCard('worker-bee'),
    glowColor: '#FFB800',
    glowIntensity: 0.8,
    usernameColor: '#1A1A1A',
    socialColor: '#666666'
  },
  {
    id: 'honeycomber',
    name: 'honeycomber',
    displayName: 'Honeycomber',
    background: generatePlaceholderCard('honeycomber'),
    glowColor: '#FF8C00',
    glowIntensity: 0.8,
    usernameColor: '#1A1A1A',
    socialColor: '#666666'
  },
  {
    id: 'manuka',
    name: 'manuka',
    displayName: 'Manuka',
    background: generatePlaceholderCard('manuka'),
    glowColor: '#8B4513',
    glowIntensity: 0.8,
    usernameColor: '#1A1A1A',
    socialColor: '#666666'
  },
  {
    id: 'bee-younder',
    name: 'bee-younder',
    displayName: 'Bee-younder',
    background: generatePlaceholderCard('bee-younder'),
    glowColor: '#9370DB',
    glowIntensity: 0.8,
    usernameColor: '#1A1A1A',
    socialColor: '#666666'
  },
  {
    id: 'core-team',
    name: 'core-team',
    displayName: 'Core Team',
    background: generatePlaceholderCard('core-team'),
    glowColor: '#E74C3C',
    glowIntensity: 0.9,
    usernameColor: '#1A1A1A',
    socialColor: '#666666'
  }
];

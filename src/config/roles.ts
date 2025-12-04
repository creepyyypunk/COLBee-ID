import { Role } from '../types/role.types';
import { generatePlaceholderCard } from '../utils/placeholderGenerator';

export const ROLES: Role[] = [
  {
    id: 'newbee',
    name: 'newbee',
    displayName: 'Newbee',
    background: generatePlaceholderCard('newbee'),
    glowColor: '#FFF4CC',
    glowIntensity: 0.8
  },
  {
    id: 'worker-bee',
    name: 'worker-bee',
    displayName: 'Worker Bee',
    background: generatePlaceholderCard('worker-bee'),
    glowColor: '#FFB800',
    glowIntensity: 0.8
  },
  {
    id: 'honeycomber',
    name: 'honeycomber',
    displayName: 'Honeycomber',
    background: generatePlaceholderCard('honeycomber'),
    glowColor: '#FF8C00',
    glowIntensity: 0.8
  },
  {
    id: 'manuka',
    name: 'manuka',
    displayName: 'Manuka',
    background: generatePlaceholderCard('manuka'),
    glowColor: '#8B4513',
    glowIntensity: 0.8
  },
  {
    id: 'bee-younder',
    name: 'bee-younder',
    displayName: 'Bee-younder',
    background: generatePlaceholderCard('bee-younder'),
    glowColor: '#9370DB',
    glowIntensity: 0.8
  }
];

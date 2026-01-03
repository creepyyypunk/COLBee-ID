import { Role } from '../types/role.types';

export const ROLES: Role[] = [
  {
    id: 'newbee',
    name: 'newbee',
    displayName: 'Newbee',
    background: '/card-designs/newbee.png',
    glowColor: '#FFF4CC',
    glowIntensity: 0.8,
    usernameColor: '#331e1a',
    socialColor: '#664c0f'
  },
  {
    id: 'worker-bee',
    name: 'worker-bee',
    displayName: 'Worker Bee',
    background: '/card-designs/workerbee.png',
    glowColor: '#FFB800',
    glowIntensity: 0.8,
    usernameColor: '#341e19',
    socialColor: '#47381c'
  },
  {
    id: 'honeycomber',
    name: 'honeycomber',
    displayName: 'Honeycomber',
    background: '/card-designs/honeycomber.png',
    glowColor: '#fbf9ca',
    glowIntensity: 0.8,
    usernameColor: '#271410',
    socialColor: '#8f2808',
    textGlow: {
      color: '#fbf9aa',
      intensity: 1.5
    }
  },
  {
    id: 'manuka',
    name: 'manuka',
    displayName: 'Manuka',
    background: '/card-designs/manuka.png',
    glowColor: '#8B4513',
    glowIntensity: 0.8,
    usernameColor: '#341e19',
    socialColor: '#be2706'
  },
  {
    id: 'bee-younder',
    name: 'bee-younder',
    displayName: 'Bee-younder',
    background: '/card-designs/bee-younder.png',
    glowColor: '#9370DB',
    glowIntensity: 0.8,
    usernameColor: '#341e19',
    socialColor: '#ba540a'
  },
  {
    id: 'core-team',
    name: 'core-team',
    displayName: 'Core Team',
    background: '/card-designs/core team.png',
    glowColor: '#fffd22',
    glowIntensity: 0.9,
    usernameColor: '#000000',
    socialColor: '#fffd22',
    textGlow: {
      color: '#fffd22',
      intensity: 1.5
    },
    socialTextGlow: {
      color: '#000000',
      intensity: 1.2
    }
  }
];

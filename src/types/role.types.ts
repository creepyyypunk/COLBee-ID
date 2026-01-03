export type RoleId = 'core-team' | 'newbee' | 'worker-bee' | 'honeycomber' | 'manuka' | 'bee-younder';
export type AdditionalRoleId = string;

export interface Role {
  id: RoleId;
  name: string;
  displayName: string;
  background: string;
  glowColor: string;
  glowIntensity: number;
  usernameColor: string;
  socialColor: string;
  textGlow?: {
    color: string;
    intensity: number;
  };
  socialTextGlow?: {
    color: string;
    intensity: number;
  };
}

export interface AdditionalRole {
  id: string;
  name: string;
  icon: string;
  glowColor: string;
  glowIntensity: number;
}

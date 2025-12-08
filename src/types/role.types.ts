export type RoleId = 'newbee' | 'worker-bee' | 'honeycomber' | 'manuka' | 'bee-younder';
export type AdditionalRoleId = string;

export interface Role {
  id: RoleId;
  name: string;
  displayName: string;
  background: string;
  glowColor: string;
  glowIntensity: number;
}

export interface AdditionalRole {
  id: string;
  name: string;
  icon: string;
  glowColor: string;
  glowIntensity: number;
}

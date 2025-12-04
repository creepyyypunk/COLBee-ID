export type RoleId = 'newbee' | 'worker-bee' | 'honeycomber' | 'manuka' | 'bee-younder';
export type AchievementId = string;

export interface Role {
  id: RoleId;
  name: string;
  displayName: string;
  background: string;
  glowColor: string;
  glowIntensity: number;
}

export interface Achievement {
  id: string;
  name: string;
  icon: string;
  glowColor: string;
  glowIntensity: number;
}

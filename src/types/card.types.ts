export interface CardData {
  username: string;
  avatar: string | null;
  twitter: string;
  discord: string;
  role: string;
  achievements: string[];
}

export interface GlowLayer {
  color: string;
  intensity: number;
  blur: number;
  spread: number;
}

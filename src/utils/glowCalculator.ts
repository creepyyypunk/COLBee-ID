import { Role, Achievement } from '../types/role.types';
import { CARD_LAYOUT } from '../config/cardLayout';

export function calculateGlowLayers(
  role: Role,
  achievements: Achievement[]
): string {
  const layers: string[] = [];
  const { baseBlur, baseSpread } = CARD_LAYOUT.glow;

  // Primary role glow (innermost, strongest)
  const roleAlpha = Math.round(role.glowIntensity * 255).toString(16).padStart(2, '0');
  layers.push(
    `0 0 ${baseBlur * role.glowIntensity}px ${baseSpread * role.glowIntensity}px ${role.glowColor}${roleAlpha}`
  );

  // Achievement glows (progressively outward)
  achievements.forEach((achievement, index) => {
    const offset = (index + 1) * 5;
    const blur = baseBlur * achievement.glowIntensity + offset;
    const spread = baseSpread * achievement.glowIntensity + offset;
    const alpha = Math.round(achievement.glowIntensity * 180).toString(16).padStart(2, '0');

    layers.push(
      `0 0 ${blur}px ${spread}px ${achievement.glowColor}${alpha}`
    );
  });

  return layers.join(', ');
}

import { Role, AdditionalRole } from '../types/role.types';
import { CARD_LAYOUT } from '../config/cardLayout';

export function calculateGlowLayers(
  role: Role,
  additionalRoles: AdditionalRole[]
): string {
  const layers: string[] = [];
  const { baseBlur, baseSpread } = CARD_LAYOUT.glow;

  // Primary role glow (innermost, strongest)
  const roleAlpha = Math.round(role.glowIntensity * 255).toString(16).padStart(2, '0');
  layers.push(
    `0 0 ${baseBlur * role.glowIntensity}px ${baseSpread * role.glowIntensity}px ${role.glowColor}${roleAlpha}`
  );

  // Additional role glows (progressively outward)
  additionalRoles.forEach((additionalRole, index) => {
    const offset = (index + 1) * 5;
    const blur = baseBlur * additionalRole.glowIntensity + offset;
    const spread = baseSpread * additionalRole.glowIntensity + offset;
    const alpha = Math.round(additionalRole.glowIntensity * 180).toString(16).padStart(2, '0');

    layers.push(
      `0 0 ${blur}px ${spread}px ${additionalRole.glowColor}${alpha}`
    );
  });

  return layers.join(', ');
}

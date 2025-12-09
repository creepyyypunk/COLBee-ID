import { CardData } from '../../types/card.types';
import { ROLES } from '../../config/roles';
import { ADDITIONAL_ROLES } from '../../config/additionalRoles';
import { CARD_LAYOUT } from '../../config/cardLayout';
import { calculateGlowLayers } from '../../utils/glowCalculator';

interface CardPreviewProps {
  cardData: CardData;
  id?: string;
  scale?: number;
}

interface SocialIconProps {
  platform: 'twitter' | 'discord';
  handle: string;
}

const SOCIAL_TEXT_MAX_WIDTH = '770px';
const PRIMARY_TEXT_MAX_WIDTH = '800px';
const ICON_TEXT_SPACING = 8;

function SocialIcon({ platform, handle }: SocialIconProps) {
  const config = CARD_LAYOUT.social[platform];
  const displayHandle = platform === 'twitter' && !handle.startsWith('@') ? `@${handle}` : handle;

  return (
    <>
      <img
        src={`/images/icons/${platform}.png`}
        alt={platform === 'twitter' ? 'Twitter' : 'Discord'}
        className="absolute"
        style={{
          left: `${config.x}px`,
          top: `${config.y}px`,
          width: `${config.fontSize}px`,
          height: `${config.fontSize}px`,
          objectFit: 'contain'
        }}
        crossOrigin="anonymous"
      />
      <span
        className="absolute text-gray-700 overflow-hidden whitespace-nowrap"
        style={{
          left: `${config.x + config.fontSize + ICON_TEXT_SPACING}px`,
          top: `${config.y}px`,
          fontSize: `${config.fontSize}px`,
          lineHeight: `${config.fontSize}px`,
          maxWidth: SOCIAL_TEXT_MAX_WIDTH,
          textOverflow: 'ellipsis'
        }}
      >
        {displayHandle}
      </span>
    </>
  );
}

export default function CardPreview({ cardData, id = 'card-preview', scale = 1 }: CardPreviewProps) {
  const role = ROLES.find(r => r.id === cardData.role) || ROLES[0];
  const additionalRoles = ADDITIONAL_ROLES.filter(a => cardData.achievements.includes(a.id));
  const glowCSS = calculateGlowLayers(role, additionalRoles);

  const isExport = scale === 1;
  const containerStyles = isExport
    ? {
        width: `${CARD_LAYOUT.display.width}px`,
        height: `${CARD_LAYOUT.display.height}px`,
      }
    : {
        maxWidth: `${CARD_LAYOUT.display.width * scale}px`,
        aspectRatio: '1200/630',
        overflow: 'hidden',
      };

  return (
    <div
      className="relative w-full"
      style={{
        ...containerStyles,
        borderRadius: '12px'
      }}
    >
      <div
        id={id}
        className="relative w-full h-full"
        style={{
          boxShadow: glowCSS,
          borderRadius: '12px'
        }}
      >
        <img
          src={role.background}
          alt={role.displayName}
          className="absolute inset-0 w-full h-full object-cover"
          crossOrigin="anonymous"
        />

        <div
          className="relative z-10"
          style={!isExport ? { transform: `scale(${scale})`, transformOrigin: 'top left' } : undefined}
        >
          <div
            className="absolute rounded-full overflow-hidden bg-white border-4 border-white shadow-lg"
            style={{
              width: `${CARD_LAYOUT.avatar.radius * 2}px`,
              height: `${CARD_LAYOUT.avatar.radius * 2}px`,
              left: `${CARD_LAYOUT.avatar.x}px`,
              top: `${CARD_LAYOUT.avatar.y}px`
            }}
          >
            {cardData.avatar ? (
              <img src={cardData.avatar} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <img src="/images/avatar_bee.webp" alt="Default Avatar" className="w-full h-full object-cover" />
            )}
          </div>

          <h1
            className="absolute font-bold overflow-hidden whitespace-nowrap"
            style={{
              left: `${CARD_LAYOUT.username.x}px`,
              top: `${CARD_LAYOUT.username.y}px`,
              fontSize: `${CARD_LAYOUT.username.fontSize}px`,
              fontWeight: CARD_LAYOUT.username.fontWeight,
              color: CARD_LAYOUT.username.color,
              maxWidth: PRIMARY_TEXT_MAX_WIDTH,
              textOverflow: 'ellipsis'
            }}
          >
            {cardData.username || 'Your Name'}
          </h1>

          {cardData.twitter && <SocialIcon platform="twitter" handle={cardData.twitter} />}

          {cardData.discord && <SocialIcon platform="discord" handle={cardData.discord} />}

          <div
            className="absolute flex"
            style={{
              left: `${CARD_LAYOUT.achievements.startX}px`,
              top: `${CARD_LAYOUT.achievements.startY}px`,
              gap: `${CARD_LAYOUT.achievements.spacing - CARD_LAYOUT.achievements.iconSize}px`
            }}
          >
            {additionalRoles.map((role) => (
              <img
                key={role.id}
                src={role.icon}
                alt={role.name}
                style={{
                  width: `${CARD_LAYOUT.achievements.iconSize}px`,
                  height: `${CARD_LAYOUT.achievements.iconSize}px`
                }}
                crossOrigin="anonymous"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

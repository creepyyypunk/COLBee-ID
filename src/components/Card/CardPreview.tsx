import { CardData } from '../../types/card.types';
import { ROLES } from '../../config/roles';
import { ACHIEVEMENTS } from '../../config/achievements';
import { CARD_LAYOUT } from '../../config/cardLayout';
import { calculateGlowLayers } from '../../utils/glowCalculator';

interface CardPreviewProps {
  cardData: CardData;
  id?: string;
  scale?: number;
}

export default function CardPreview({ cardData, id = 'card-preview', scale = 1 }: CardPreviewProps) {
  const role = ROLES.find(r => r.id === cardData.role) || ROLES[0];
  const achievements = ACHIEVEMENTS.filter(a => cardData.achievements.includes(a.id));
  const glowCSS = calculateGlowLayers(role, achievements);

  const width = CARD_LAYOUT.display.width * scale;

  return (
    <div
      id={id}
      className="relative rounded-xl overflow-hidden w-full"
      style={{
        maxWidth: `${width}px`,
        aspectRatio: '1200/630',
        boxShadow: glowCSS
      }}
    >
      <img
        src={role.background}
        alt={role.displayName}
        className="absolute inset-0 w-full h-full object-cover"
        crossOrigin="anonymous"
      />

      <div className="relative z-10" style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
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
            <div className="w-full h-full bg-honey-200 flex items-center justify-center text-6xl">
              🐝
            </div>
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
            maxWidth: '800px',
            textOverflow: 'ellipsis'
          }}
        >
          {cardData.username || 'Your Name'}
        </h1>

        <p
          className="absolute overflow-hidden whitespace-nowrap"
          style={{
            left: `${CARD_LAYOUT.role.x}px`,
            top: `${CARD_LAYOUT.role.y}px`,
            fontSize: `${CARD_LAYOUT.role.fontSize}px`,
            color: CARD_LAYOUT.role.color,
            maxWidth: '800px',
            textOverflow: 'ellipsis'
          }}
        >
          {role.displayName}
        </p>

        {cardData.twitter && (
          <p
            className="absolute text-gray-700 overflow-hidden whitespace-nowrap"
            style={{
              left: `${CARD_LAYOUT.social.twitter.x}px`,
              top: `${CARD_LAYOUT.social.twitter.y}px`,
              fontSize: `${CARD_LAYOUT.social.twitter.fontSize}px`,
              maxWidth: '800px',
              textOverflow: 'ellipsis'
            }}
          >
            🐦 {cardData.twitter.startsWith('@') ? cardData.twitter : `@${cardData.twitter}`}
          </p>
        )}

        {cardData.discord && (
          <p
            className="absolute text-gray-700 overflow-hidden whitespace-nowrap"
            style={{
              left: `${CARD_LAYOUT.social.discord.x}px`,
              top: `${CARD_LAYOUT.social.discord.y}px`,
              fontSize: `${CARD_LAYOUT.social.discord.fontSize}px`,
              maxWidth: '800px',
              textOverflow: 'ellipsis'
            }}
          >
            💬 {cardData.discord}
          </p>
        )}

        <div
          className="absolute flex"
          style={{
            left: `${CARD_LAYOUT.achievements.startX}px`,
            top: `${CARD_LAYOUT.achievements.startY}px`,
            gap: `${CARD_LAYOUT.achievements.spacing - CARD_LAYOUT.achievements.iconSize}px`
          }}
        >
          {achievements.map((achievement) => (
            <img
              key={achievement.id}
              src={achievement.icon}
              alt={achievement.name}
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
  );
}

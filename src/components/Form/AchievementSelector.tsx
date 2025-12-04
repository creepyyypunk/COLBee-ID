import Checkbox from '../UI/Checkbox';
import { ACHIEVEMENTS } from '../../config/achievements';

interface AchievementSelectorProps {
  selected: string[];
  onChange: (achievements: string[]) => void;
}

export default function AchievementSelector({ selected, onChange }: AchievementSelectorProps) {
  const handleToggle = (achievementId: string) => {
    if (selected.includes(achievementId)) {
      onChange(selected.filter(id => id !== achievementId));
    } else {
      onChange([...selected, achievementId]);
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Achievements (Optional)
      </label>
      <div className="space-y-2">
        {ACHIEVEMENTS.map((achievement) => (
          <Checkbox
            key={achievement.id}
            label={achievement.name}
            checked={selected.includes(achievement.id)}
            onChange={() => handleToggle(achievement.id)}
          />
        ))}
      </div>
    </div>
  );
}

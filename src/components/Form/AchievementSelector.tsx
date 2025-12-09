import Checkbox from '../UI/Checkbox';
import { ADDITIONAL_ROLES } from '../../config/additionalRoles';

interface AchievementSelectorProps {
  selected: string[];
  onChange: (achievements: string[]) => void;
}

export default function AchievementSelector({ selected, onChange }: AchievementSelectorProps) {
  const handleToggle = (roleId: string) => {
    if (selected.includes(roleId)) {
      onChange(selected.filter(id => id !== roleId));
    } else {
      onChange([...selected, roleId]);
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-bee-black tracking-tight">
        Additional roles (Optional)
      </label>
      <div className="space-y-3">
        {ADDITIONAL_ROLES.map((role) => (
          <Checkbox
            key={role.id}
            label={role.name}
            checked={selected.includes(role.id)}
            onChange={() => handleToggle(role.id)}
          />
        ))}
      </div>
    </div>
  );
}

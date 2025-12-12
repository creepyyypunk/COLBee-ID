import { Selection } from 'react-aria-components';
import { GridList, GridListItem } from '../UI/grid-list';
import { ADDITIONAL_ROLES } from '../../config/additionalRoles';

interface AchievementSelectorProps {
  selected: string[];
  onChange: (achievements: string[]) => void;
}

export default function AchievementSelector({ selected, onChange }: AchievementSelectorProps) {
  const handleSelectionChange = (keys: Selection) => {
    if (keys === 'all') {
      onChange(ADDITIONAL_ROLES.map(role => role.id));
    } else {
      onChange(Array.from(keys) as string[]);
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-bee-black tracking-tight">
  
      </label>
      <GridList
        aria-label="Additional roles"
        selectionMode="multiple"
        selectedKeys={selected}
        onSelectionChange={handleSelectionChange}
        className="border-0 bg-transparent shadow-none"
      >
        {ADDITIONAL_ROLES.map((role) => (
          <GridListItem
            key={role.id}
            id={role.id}
            textValue={role.name}
            className="text-base hover:text-honey-600 data-[selected]:text-bee-orange data-[selected]:bg-bee-orange/10 data-[selected]:font-medium"
          >
            {role.name}
          </GridListItem>
        ))}
      </GridList>
    </div>
  );
}

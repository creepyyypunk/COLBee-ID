import Dropdown from '../UI/Dropdown';
import { ROLES } from '../../config/roles';

interface RoleSelectorProps {
  selectedRole: string;
  onChange: (roleId: string) => void;
}

export default function RoleSelector({ selectedRole, onChange }: RoleSelectorProps) {
  const options = ROLES.map(role => ({
    value: role.id,
    label: role.displayName
  }));

  return (
    <Dropdown
      label="Select Your Role *"
      options={options}
      value={selectedRole}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

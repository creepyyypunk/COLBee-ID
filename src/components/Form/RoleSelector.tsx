import AnimatedRadio from '../UI/AnimatedRadio';
import { ROLES } from '../../config/roles';

interface RoleSelectorProps {
  selectedRole: string;
  onChange: (roleId: string) => void;
}

export default function RoleSelector({ selectedRole, onChange }: RoleSelectorProps) {
  const options = ROLES.map(role => ({
    id: `role-${role.id}`,
    value: role.id,
    label: role.displayName
  }));

  return (
    <AnimatedRadio
      options={options}
      value={selectedRole}
      onChange={onChange}
    />
  );
}

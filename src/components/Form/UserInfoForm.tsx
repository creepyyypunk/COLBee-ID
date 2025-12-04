import Input from '../UI/Input';

interface UserInfoFormProps {
  username: string;
  twitter: string;
  discord: string;
  onChange: (data: { username?: string; twitter?: string; discord?: string }) => void;
}

export default function UserInfoForm({ username, twitter, discord, onChange }: UserInfoFormProps) {
  return (
    <div className="space-y-4">
      <Input
        label="Username *"
        type="text"
        placeholder="Your name"
        value={username}
        onChange={(e) => onChange({ username: e.target.value })}
        required
      />
      <Input
        label="Twitter"
        type="text"
        placeholder="@yourhandle"
        value={twitter}
        onChange={(e) => onChange({ twitter: e.target.value })}
      />
      <Input
        label="Discord"
        type="text"
        placeholder="username#1234 or @username"
        value={discord}
        onChange={(e) => onChange({ discord: e.target.value })}
      />
    </div>
  );
}

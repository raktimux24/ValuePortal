import { FC } from 'react';
import { Logo } from './Logo';
import { UserMenu } from './UserMenu';
import { NotificationButton } from './NotificationButton';

interface HeaderProps {
  username: string;
  email?: string;
  onLogout: () => void;
}

export const Header: FC<HeaderProps> = ({
  username,
  email,
  onLogout,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
    }}>
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />

          <div className="flex items-center gap-6">
            <NotificationButton />
            <UserMenu
              username={username}
              email={email}
              onLogout={onLogout}
            />
          </div>
        </div>
      </div>
    </header>
  );
};
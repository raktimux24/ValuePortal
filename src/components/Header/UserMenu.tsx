import { FC, useRef, useState } from 'react';
import { LogOut, User } from 'lucide-react';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { ThemeToggle } from './ThemeToggle';

interface UserMenuProps {
  username: string;
  email?: string;
  onLogout: () => void;
}

export const UserMenu: FC<UserMenuProps> = ({ username, email = 'john@xebia.com', onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(menuRef, () => setIsOpen(false));

  const initials = username
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 font-semibold hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors"
        aria-label="User menu"
      >
        {initials}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50">
          <div className="px-4 py-2 border-b dark:border-gray-700">
            <div className="font-medium text-gray-900 dark:text-white">{username}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{email}</div>
          </div>
          
          <ThemeToggle />
          
          <button
            onClick={onLogout}
            className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};
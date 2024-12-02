import { Bell } from 'lucide-react';
import { FC } from 'react';

interface HeaderProps {
  username: string;
  notificationCount: number;
  onNewIdea: () => void;
}

export const Header: FC<HeaderProps> = ({ username, notificationCount, onNewIdea }) => {
  return (
    <div className="flex items-center justify-between py-6">
      <h1 className="text-2xl font-bold">
        Welcome to the Value Portal, {username}! 
      </h1>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Bell className="h-6 w-6 text-gray-600" />
          {notificationCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {notificationCount}
            </span>
          )}
        </div>
        <button 
          onClick={onNewIdea}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Submit New Idea
        </button>
      </div>
    </div>
  );
};
import { FC } from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export const ThemeToggle: FC = () => {
  const { theme, setTheme } = useTheme();

  const options = [
    { value: 'light', icon: <Sun className="h-4 w-4" />, label: 'Light' },
    { value: 'dark', icon: <Moon className="h-4 w-4" />, label: 'Dark' },
    { value: 'system', icon: <Monitor className="h-4 w-4" />, label: 'System' },
  ] as const;

  return (
    <div className="px-2 py-1.5 border-t">
      {options.map(({ value, icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className={`w-full px-4 py-2 text-left flex items-center gap-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
            theme === value ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-700 dark:text-gray-300'
          }`}
        >
          {icon}
          {label}
        </button>
      ))}
    </div>
  );
};
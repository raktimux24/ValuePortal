import { useEffect, useState } from 'react';
import { useThemeStore } from '../store/useThemeStore';

export function useTheme() {
  const { theme, setTheme } = useThemeStore();
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const updateTheme = () => {
      const resolvedTheme = theme === 'system' 
        ? (mediaQuery.matches ? 'dark' : 'light')
        : theme;

      setCurrentTheme(resolvedTheme);
      document.documentElement.classList.toggle('dark', resolvedTheme === 'dark');
    };

    updateTheme();
    mediaQuery.addEventListener('change', updateTheme);
    
    return () => mediaQuery.removeEventListener('change', updateTheme);
  }, [theme]);

  return { theme, currentTheme, setTheme };
}
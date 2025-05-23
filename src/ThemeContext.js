import { createContext, useMemo, useState, useCallback } from 'react';

export const ColorModeContext = createContext({
  mode: 'light',
  toggleColorMode: () => {}
});

export function useThemeMode() {
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [mode, setMode] = useState(() => localStorage.getItem('themeMode') || (systemPrefersDark ? 'dark' : 'light'));

  const toggleColorMode = useCallback(() => {
    const next = mode === 'light' ? 'dark' : 'light';
    setMode(next);
    localStorage.setItem('themeMode', next);
  }, [mode]);

  const value = useMemo(() => ({ mode, toggleColorMode }), [mode, toggleColorMode]);

  return { mode, toggleColorMode, value };
}

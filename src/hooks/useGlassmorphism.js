import { useTheme } from '@mui/material/styles';

export const useGlassmorphism = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  
  return {
    // Base glassmorphism styles
    base: theme.glassmorphism?.base || {
      background: isDark ? 'rgba(0,0,0,0.18)' : 'rgba(255,255,255,0.18)',
      border: isDark ? '1.5px solid rgba(255,255,255,0.15)' : '1.5px solid rgba(255,255,255,0.35)',
      boxShadow: isDark ? '0 8px 32px 0 rgba(0, 0, 0, 0.3)' : '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
      backdropFilter: 'blur(24px) saturate(180%)',
      WebkitBackdropFilter: 'blur(24px) saturate(180%)',
      borderRadius: 2,
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    },
    
    // Glassmorphism with highlights
    withHighlights: theme.glassmorphism?.withHighlights || {
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '10px',
        background: isDark
          ? 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 100%)'
          : 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 100%)',
        borderRadius: 'inherit',
        pointerEvents: 'none',
        zIndex: 1,
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        inset: 0,
        borderRadius: 'inherit',
        boxShadow: isDark
          ? 'inset 0 1.5px 12px 0 rgba(255,255,255,0.08)'
          : 'inset 0 1.5px 12px 0 rgba(255,255,255,0.18)',
        pointerEvents: 'none',
        zIndex: 1,
      },
    },
    
    // Hover effects
    hover: theme.glassmorphism?.hover || {
      '&:hover': {
        boxShadow: isDark
          ? '0 12px 40px 0 rgba(0, 0, 0, 0.4)'
          : '0 12px 40px 0 rgba(31, 38, 135, 0.25)',
        transform: 'translateY(-2px)',
        border: isDark
          ? '1.5px solid rgba(255,255,255,0.25)'
          : '1.5px solid rgba(255,255,255,0.5)',
      },
    },
    
    // Colored glass
    colored: (color) => ({
      background: isDark ? `${color}15` : `${color}25`,
      border: isDark ? `1px solid ${color}30` : `1px solid ${color}40`,
      boxShadow: isDark
        ? `0 4px 16px 0 ${color}20, inset 0 1px 4px 0 rgba(255,255,255,0.1)`
        : `0 4px 16px 0 ${color}40, inset 0 1px 4px 0 rgba(255,255,255,0.2)`,
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
    }),
    
    // Z-index system
    zIndex: theme.glassmorphism?.zIndex || {
      base: 1,
      highlights: 1,
      content: 3,
      overlay: 10,
    },
    
    // Complete glassmorphism styles (base + highlights + hover)
    complete: {
      ...theme.glassmorphism?.base,
      ...theme.glassmorphism?.withHighlights,
      ...theme.glassmorphism?.hover,
    },
  };
}; 
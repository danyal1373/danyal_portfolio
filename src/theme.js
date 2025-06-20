import { createTheme } from '@mui/material/styles';

const createAppTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: mode === 'light' ? '#fafafa' : '#121212',
      paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
    },
    text: {
      primary: mode === 'light' ? '#000000' : '#ffffff',
      secondary: mode === 'light' ? '#666666' : '#b0b0b0',
    },
    divider: mode === 'light' ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.12)',
  },
  typography: {
    fontFamily: '"Libre Franklin", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 2,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          // Default card styles
        },
      },
    },
  },
  // Global glassmorphism design system
  glassmorphism: {
    // Base glassmorphism styles
    base: {
      background: mode === 'light' 
        ? 'rgba(255,255,255,0.18)' 
        : 'rgba(0,0,0,0.18)',
      border: mode === 'light' 
        ? '1.5px solid rgba(255,255,255,0.35)' 
        : '1.5px solid rgba(255,255,255,0.15)',
      boxShadow: mode === 'light' 
        ? '0 8px 32px 0 rgba(31, 38, 135, 0.18)' 
        : '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
      backdropFilter: 'blur(24px) saturate(180%)',
      WebkitBackdropFilter: 'blur(24px) saturate(180%)',
      borderRadius: 2,
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    },
    // Glassmorphism with highlights
    withHighlights: {
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '60px',
        background: mode === 'light'
          ? 'linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.08) 100%)'
          : 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.03) 100%)',
        borderRadius: 'inherit',
        pointerEvents: 'none',
        zIndex: 1,
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        inset: 0,
        borderRadius: 'inherit',
        boxShadow: mode === 'light'
          ? 'inset 0 1.5px 12px 0 rgba(255,255,255,0.18)'
          : 'inset 0 1.5px 12px 0 rgba(255,255,255,0.08)',
        pointerEvents: 'none',
        zIndex: 1,
      },
    },
    // Hover effects
    hover: {
      '&:hover': {
        boxShadow: mode === 'light'
          ? '0 12px 40px 0 rgba(31, 38, 135, 0.25)'
          : '0 12px 40px 0 rgba(0, 0, 0, 0.4)',
        transform: 'translateY(-2px)',
        border: mode === 'light'
          ? '1.5px solid rgba(255,255,255,0.5)'
          : '1.5px solid rgba(255,255,255,0.25)',
      },
    },
    // Colored glass for sliders/active elements
    colored: (color) => ({
      background: mode === 'light' ? `${color}25` : `${color}15`,
      border: mode === 'light' ? `1px solid ${color}40` : `1px solid ${color}30`,
      boxShadow: mode === 'light'
        ? `0 4px 16px 0 ${color}40, inset 0 1px 4px 0 rgba(255,255,255,0.2)`
        : `0 4px 16px 0 ${color}20, inset 0 1px 4px 0 rgba(255,255,255,0.1)`,
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
    }),
    // Z-index system for proper layering
    zIndex: {
      base: 1,
      highlights: 1,
      content: 3,
      overlay: 10,
    },
  },
});

export default createAppTheme;

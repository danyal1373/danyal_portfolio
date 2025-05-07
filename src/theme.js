import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#34618E', contrastText: '#FFFFFF' },
    secondary: { main: '#535F70', contrastText: '#FFFFFF' },
    background: { default: '#F8F9FF', paper: '#FFFFFF' },
    text: { primary: '#191C20', secondary: '#42474E' },
    error: { main: '#BA1A1A', contrastText: '#FFFFFF' }
  },
  shape: { borderRadius: 12 },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#9FCAFC', contrastText: '#003257' },
    secondary: { main: '#BAC8DB', contrastText: '#253140' },
    background: { default: '#101418', paper: '#1D2024' },
    text: { primary: '#E1E2E8', secondary: '#C3C7CF' },
    error: { main: '#FFB4AB', contrastText: '#690005' }
  },
  shape: { borderRadius: 12 },
});

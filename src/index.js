import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './theme';
import { ColorModeContext, useThemeMode } from './ThemeContext';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter } from 'react-router-dom';

function Main() {
  const { mode, value } = useThemeMode();
  const theme = mode === 'light' ? lightTheme : darkTheme;

  return (
    <ColorModeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Main />);
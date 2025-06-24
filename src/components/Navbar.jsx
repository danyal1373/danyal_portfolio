import { AppBar, Toolbar, IconButton, Tabs, Tab, useScrollTrigger, Slide, ButtonBase, useTheme, useMediaQuery, Box, Collapse, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useContext, useState, useEffect } from 'react';
import { ColorModeContext } from '../ThemeContext';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import SampleIcon from './SampleIcon';
import { useLocation, useNavigate } from 'react-router-dom';

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const tabRoutes = [
  { label: 'Projects', path: '/projects' },
  { label: 'About', path: '/about' },
  { label: 'Photos', path: '/photos' },
  { label: 'Research', path: '/research' },
  { label: 'Swarm Map', path: '/swarm' },
  { label: 'Resume', path: '/resume' },
];

export default function Navbar() {
  const { mode, toggleColorMode } = useContext(ColorModeContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [tab, setTab] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isDark = theme.palette.mode === 'dark';

  useEffect(() => {
    // Set tab index based on current path
    const idx = tabRoutes.findIndex(tab => location.pathname.startsWith(tab.path));
    setTab(idx === -1 ? false : idx);
  }, [location.pathname]);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
    navigate(tabRoutes[newValue].path);
  };

  const handleMobileMenuToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMobileMenuItemClick = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  return (
    <>
      <HideOnScroll>
        <AppBar
          position="sticky"
          color="transparent"
          elevation={0}
          sx={{
            background: isDark 
              ? 'rgba(18, 18, 18, 0.8)' 
              : 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(12px)',
            boxShadow: isDark 
              ? '0 4px 30px rgba(0,0,0,0.3)' 
              : '0 4px 30px rgba(0,0,0,0.1)',
            borderBottom: isDark 
              ? '1px solid rgba(255,255,255,0.1)' 
              : '1px solid rgba(0,0,0,0.1)',
          }}
        >
          <Box sx={{ maxWidth: 1100, mx: 'auto', width: '100%' }}>
            <Toolbar sx={{ px: { xs: 2, md: 0 } }}>
              <ButtonBase 
                onClick={() => navigate('/')} 
                sx={{ 
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 40,
                  height: 40,
                  '&:hover': {
                    backgroundColor: isDark 
                      ? 'rgba(255, 255, 255, 0.1)' 
                      : 'rgba(0, 0, 0, 0.1)',
                  }
                }}
              >
                <SampleIcon />
              </ButtonBase>
              
              {isMobile ? (
                <>
                  <Box sx={{ flexGrow: 1 }} />
                  <IconButton
                    edge="end"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleMobileMenuToggle}
                  >
                    <MenuIcon />
                  </IconButton>
                </>
              ) : (
                <Tabs
                  value={tab}
                  onChange={handleTabChange}
                  textColor="inherit"
                  indicatorColor="secondary"
                  sx={{ flexGrow: 1, ml: 4 }}
                >
                  {tabRoutes.map((tab, idx) => (
                    <Tab key={tab.path} label={tab.label} />
                  ))}
                </Tabs>
              )}

              <IconButton 
                onClick={toggleColorMode} 
                color="inherit"
                sx={{ 
                  ml: 2,
                  '&:hover': {
                    backgroundColor: isDark 
                      ? 'rgba(255, 255, 255, 0.1)' 
                      : 'rgba(0, 0, 0, 0.1)',
                  }
                }}
              >
                {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
              </IconButton>
            </Toolbar>
          </Box>
        </AppBar>
      </HideOnScroll>

      {isMobile && (
        <Collapse in={mobileOpen}>
          <Box
            sx={{
              width: '100%',
              background: isDark 
                ? 'rgba(18, 18, 18, 0.8)' 
                : 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(12px)',
              borderBottom: isDark 
                ? '1px solid rgba(255,255,255,0.1)' 
                : '1px solid rgba(0,0,0,0.1)',
            }}
          >
            <List>
              {tabRoutes.map((route) => (
                <ListItem key={route.path} disablePadding>
                  <ListItemButton
                    selected={location.pathname.startsWith(route.path)}
                    onClick={() => handleMobileMenuItemClick(route.path)}
                    sx={{
                      py: 2,
                      '&.Mui-selected': {
                        backgroundColor: isDark 
                          ? 'rgba(255, 255, 255, 0.1)' 
                          : 'rgba(0, 0, 0, 0.1)',
                      },
                    }}
                  >
                    <ListItemText
                      primary={route.label}
                      sx={{
                        textAlign: 'center',
                        color: 'text.primary',
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Collapse>
      )}
    </>
  );
}

import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import SwarmMap from './components/SwarmMap';
import AnimatedCircle from './components/AnimatedCircle';

function SwarmPage() {
  const theme = useTheme();

  return (
    <Box sx={{ background: theme.palette.background.default, minHeight: '100vh', py: 4 }}>
      {/* --- FIXED BACKGROUND --- */}
      <Box sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        zIndex: 0,
      }}>
        <AnimatedCircle color="#D11B28" size={800} frequency={0.22} phase={0} style={{ top: '50%', left: '55%' }} />
        <AnimatedCircle color="#ECB145" size={800} frequency={0.25} phase={1.2} style={{ top: '50%', left: '60%' }} />
        <AnimatedCircle color="#21A6C0" size={800} frequency={0.21} phase={2.1} style={{ top: '50%', left: '50%' }} />
      </Box>
      <Box sx={{ maxWidth: 1100, mx: 'auto', mb: 4 }}>
        <Typography variant="h4" sx={{ color: theme.palette.text.primary, mb: 2, fontWeight: 500 }}>
          My Travel Map
        </Typography>
        <Typography variant="body1" sx={{ color: theme.palette.text.secondary, mb: 4 }}>
          A visualization of all the places I've checked in using Swarm (Foursquare). Each circle represents a location I've visited, with the size indicating how many times I've been there.
        </Typography>
        
        <SwarmMap />
      </Box>
    </Box>
  );
}

export default SwarmPage; 
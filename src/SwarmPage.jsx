import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import SwarmMap from './components/SwarmMap';

function SwarmPage() {
  const theme = useTheme();

  return (
    <Box sx={{ background: theme.palette.background.default, minHeight: '100vh', py: 4 }}>
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
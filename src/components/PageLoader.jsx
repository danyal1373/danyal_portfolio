import React from 'react';
import { Box, CircularProgress, Fade } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function PageLoader() {
  const theme = useTheme();
  
  return (
    <Fade in={true} timeout={800}>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: theme.palette.background.default,
          zIndex: 9999,
        }}
      >
        <CircularProgress 
          size={40}
          thickness={4}
          sx={{
            color: theme.palette.primary.main,
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'round',
            },
          }}
        />
      </Box>
    </Fade>
  );
} 
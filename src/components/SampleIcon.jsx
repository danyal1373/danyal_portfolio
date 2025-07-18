import React from 'react';
import { useTheme } from '@mui/material';

export default function SampleIcon(props) {
  const theme = useTheme();
  
  // Create a filter to change white stroke to theme text color
  const getFilter = () => {
    if (theme.palette.mode === 'dark') {
      // In dark mode, keep white (no filter needed)
      return 'none';
    } else {
      // In light mode, convert white to black (theme text color is usually dark)
      return 'brightness(0)';
    }
  };

  return (
    <img 
      src="/DGB_Logo.svg" 
      alt="DGB Logo" 
      width={32} 
      height={32} 
      style={{ 
        objectFit: 'contain',
        filter: getFilter(),
        transition: 'filter 0.3s ease-in-out'
      }}
      {...props}
    />
  );
} 
import React from 'react';
import { Box, Typography } from '@mui/material';
import GlassSection from './GlassSection';
import LockIcon from '@mui/icons-material/Lock';

export default function NdaNotice({ children }) {
  return (
    <GlassSection sx={{ p: { xs: 2, md: 3 } }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
        <LockIcon color="warning" sx={{ mt: 0.5 }} />
        <Box>
          <Typography variant="h6" sx={{ mb: 1 }}>
            NDA Notice
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            {children}
          </Typography>
        </Box>
      </Box>
    </GlassSection>
  );
}


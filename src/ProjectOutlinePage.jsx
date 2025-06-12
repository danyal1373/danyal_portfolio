import React from 'react';
import { Box, Typography, Card, Chip } from '@mui/material';
import PasswordProtectedContent from './components/PasswordProtectedContent';
import { checkProjectPassword } from './auth/projectPassword';

export default function ProjectOutlinePage() {
  return (
    <Box sx={{ background: theme => theme.palette.background.default, minHeight: '100vh', py: 4 }}>
      <Box sx={{ maxWidth: 1100, mx: 'auto', mb: 2 }}>
        <Typography variant="h4" sx={{ color: 'text.primary', textAlign: 'center', mb: 2 }}>
          Ignik Outdoors
        </Typography>
        <Box
          component="img"
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
          alt="Ignik Outdoors Team"
          sx={{ width: '100%', borderRadius: (theme) => theme.shape.borderRadius, mb: 2, objectFit: 'cover', maxHeight: 260 }}
        />
        <PasswordProtectedContent checkPassword={checkProjectPassword}>
          <Card sx={{ p: 4, borderRadius: (theme) => theme.shape.borderRadius, boxShadow: 1, bgcolor: 'background.paper', textAlign: 'center', position: 'relative', minHeight: 220 }}>
            <Typography variant="h6" sx={{ color: 'text.primary', mb: 2 }}>
              Welcome to the protected project content!
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
              Here you can add your project details, files, and more. This section is only visible after entering the correct password.
            </Typography>
            <Chip label="Astrophotography" sx={{ mr: 1, mb: 1 }} />
            <Chip label="Landscape" sx={{ mr: 1, mb: 1 }} />
            <Chip label="Industrial Photography" sx={{ mb: 1 }} />
          </Card>
        </PasswordProtectedContent>
      </Box>
    </Box>
  );
} 
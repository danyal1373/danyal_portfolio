import React, { useState } from 'react';
import { Card, Box, Typography, TextField, Button } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export default function PasswordProtectedContent({ children, checkPassword }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkPassword(input)) {
      setAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (authenticated) return children;

  return (
    <Card sx={{ p: 4, mt: 2, mb: 2, borderRadius: 2, boxShadow: 1, bgcolor: 'background.paper', maxWidth: 480, mx: 'auto', textAlign: 'center', position: 'relative' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
        <LockOutlinedIcon sx={{ fontSize: 64, color: 'divider', mb: 1 }} />
        <Typography variant="h6" sx={{ color: 'text.secondary', mb: 1 }}>
          Project is Password Protected
        </Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Enter Password to continue"
          type="password"
          value={input}
          onChange={e => setInput(e.target.value)}
          error={error}
          helperText={error ? 'Incorrect password' : ''}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Unlock
        </Button>
      </form>
    </Card>
  );
} 

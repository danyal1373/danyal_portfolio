import React, { useState } from 'react';
import {
  Box,
  Dialog,
  DialogContent,
  TextField,
  Button,
  Typography,
  IconButton,
  Alert,
  InputAdornment
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CloseIcon from '@mui/icons-material/Close';
import { usePassword } from '../contexts/PasswordContext';
import { useGlassmorphism } from '../hooks/useGlassmorphism';

const PasswordPrompt = ({ 
  open, 
  onClose, 
  onSuccess 
}) => {
  const theme = useTheme();
  const glassmorphism = useGlassmorphism();
  const { unlockPortfolio } = usePassword();
  
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));

    const success = unlockPortfolio(password);
    if (success) {
      onSuccess();
      handleClose();
    } else {
      setError('Incorrect password. Please try again.');
    }
    
    setIsLoading(false);
  };

  const handleClose = () => {
    setPassword('');
    setError('');
    setShowPassword(false);
    onClose();
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (error) setError('');
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          ...glassmorphism.base,
          ...glassmorphism.withHighlights,
          borderRadius: theme.shape.borderRadius * 2,
          overflow: 'hidden',
        }
      }}
    >
      <DialogContent sx={{ p: 4, position: 'relative' }}>
        {/* Close button */}
        <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 16,
            top: 16,
            color: theme.palette.text.secondary,
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            }
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 80,
              height: 80,
              borderRadius: '50%',
              backgroundColor: theme.palette.primary.main,
              color: 'white',
              mb: 2,
              boxShadow: '0 8px 32px rgba(25, 118, 210, 0.3)',
            }}
          >
            <LockIcon sx={{ fontSize: 40 }} />
          </Box>
          <Typography variant="h5" sx={{ 
            color: theme.palette.text.primary, 
            fontWeight: theme.typography.h2.fontWeight,
            mb: 1
          }}>
            Protected Content
          </Typography>
          <Typography variant="body1" sx={{ 
            color: theme.palette.text.secondary,
            mb: 2
          }}>
            Enter the password to access all protected projects
          </Typography>
        </Box>

        {/* Password Form */}
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            type={showPassword ? 'text' : 'password'}
            label="Enter Password"
            value={password}
            onChange={handlePasswordChange}
            variant="outlined"
            error={!!error}
            disabled={isLoading}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ color: theme.palette.text.secondary }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    sx={{ color: theme.palette.text.secondary }}
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                backgroundColor: theme.palette.mode === 'dark' 
                  ? 'rgba(255,255,255,0.05)' 
                  : 'rgba(0,0,0,0.02)',
                '&:hover': {
                  backgroundColor: theme.palette.mode === 'dark' 
                    ? 'rgba(255,255,255,0.08)' 
                    : 'rgba(0,0,0,0.04)',
                },
                '&.Mui-focused': {
                  backgroundColor: theme.palette.mode === 'dark' 
                    ? 'rgba(255,255,255,0.1)' 
                    : 'rgba(0,0,0,0.06)',
                }
              }
            }}
          />

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={!password.trim() || isLoading}
            sx={{
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: theme.typography.h2.fontWeight,
              background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.dark} 90%)`,
              boxShadow: '0 4px 20px rgba(25, 118, 210, 0.3)',
              '&:hover': {
                background: `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.primary.main} 90%)`,
                boxShadow: '0 6px 25px rgba(25, 118, 210, 0.4)',
              },
              '&:disabled': {
                background: theme.palette.action.disabledBackground,
                boxShadow: 'none',
              }
            }}
          >
            {isLoading ? 'Verifying...' : 'Unlock Portfolio'}
          </Button>
        </Box>

        {/* Footer */}
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Typography variant="caption" sx={{ 
            color: theme.palette.text.secondary,
            fontStyle: 'italic'
          }}>
            Contact the portfolio owner for access credentials
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PasswordPrompt; 

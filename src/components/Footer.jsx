import { Box, Typography, Link, useTheme } from '@mui/material';

export default function Footer() {
  const theme = useTheme();
  return (
    <Box sx={{ 
      mt: 8, 
      py: 4, 
      textAlign: 'center', 
      borderTop: `1px solid ${theme.palette.divider}` 
    }}>
      <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
        © Danyal Ghanbari
      </Typography>
      <Box sx={{ mt: 1 }}>
        <Link href="#" sx={{ color: theme.palette.text.secondary, '&:hover': { color: theme.palette.primary.main } }}>projects</Link>{' '}
        <Link href="#" sx={{ color: theme.palette.text.secondary, '&:hover': { color: theme.palette.primary.main } }}>about</Link>{' '}
        <Link href="#" sx={{ color: theme.palette.text.secondary, '&:hover': { color: theme.palette.primary.main } }}>picture</Link>{' '}
        <Link href="#" sx={{ color: theme.palette.text.secondary, '&:hover': { color: theme.palette.primary.main } }}>initiatives</Link>{' '}
        <Link href="#" sx={{ color: theme.palette.text.secondary, '&:hover': { color: theme.palette.primary.main } }}>research</Link>
      </Box>
    </Box>
  );
}

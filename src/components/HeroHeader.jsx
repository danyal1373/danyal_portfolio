import { Box, Typography, useTheme } from '@mui/material';

export default function HeroHeader() {
  const theme = useTheme();
  return (
    <Box sx={{ py: 4, textAlign: 'center' }}>
      <Typography variant="h3" sx={{ color: theme.palette.text.primary, fontWeight: theme.typography.h6.fontWeight }}>
        Projects
      </Typography>
    </Box>
  );
}

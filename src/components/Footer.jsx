import { Box, Typography, Link } from '@mui/material';

export default function Footer() {
  return (
    <Box sx={{ mt: 8, py: 4, textAlign: 'center', borderTop: '1px solid #ccc' }}>
      <Typography variant="caption">© Danyal Ghanbari</Typography>
      <Box sx={{ mt: 1 }}>
        <Link href="#">projects</Link>{' '}
        <Link href="#">about</Link>{' '}
        <Link href="#">picture</Link>{' '}
        <Link href="#">initiatives</Link>{' '}
        <Link href="#">research</Link>
      </Box>
    </Box>
  );
}
import { Box, Button } from '@mui/material';


export default function SectionLinks() {
  return (
    <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
      {['Below Belt Projects', 'Future Marketing Projects', 'All ML Projects'].map((label, i) => (
        <Button
          key={i}
          variant="outlined"
          fullWidth
          sx={{ justifyContent: 'space-between' }}
        >
          {label}
        </Button>
      ))}
    </Box>
  );
}
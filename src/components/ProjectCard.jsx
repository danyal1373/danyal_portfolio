import { Card, CardContent, Typography, useTheme } from '@mui/material';

export default function ProjectCard({ title, tags, subtitle }) {
  const theme = useTheme();
  return (
    <Card variant="outlined" sx={{ 
      minWidth: 180, 
      height: 220,
      borderColor: theme.palette.divider,
      bgcolor: theme.palette.background.paper
    }}>
      <CardContent>
        <Typography variant="subtitle2" sx={{ color: theme.palette.text.secondary, mb: 1 }}>
          {subtitle}
        </Typography>
        <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontWeight: theme.typography.h6.fontWeight, mb: 1 }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
          {tags.join(' • ')}
        </Typography>
      </CardContent>
    </Card>
  );
}

import { Card, CardContent, Typography } from '@mui/material';

export default function ProjectCard({ title, tags, subtitle }) {
  return (
    <Card variant="outlined" sx={{ minWidth: 180, height: 220 }}>
      <CardContent>
        <Typography variant="subtitle2" gutterBottom>{subtitle}</Typography>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {tags.join(' • ')}
        </Typography>
      </CardContent>
    </Card>
  );
}
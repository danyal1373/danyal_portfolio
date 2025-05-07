import { Card, CardMedia, CardContent, Typography, Box, Button } from '@mui/material';

export default function FeaturedProjectCard({ title, subtitle, image, tags }) {
  return (
    <Card sx={{ mb: 4 }}>
      <CardMedia component="img" height="240" image={image} alt={title} />
      <CardContent>
        <Typography variant="subtitle2" color="text.secondary">
          {subtitle}
        </Typography>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
        <Box sx={{ mt: 1 }}>
          {tags.map((tag, i) => (
            <Button key={i} size="small" variant="outlined" sx={{ mr: 1 }}>
              {tag}
            </Button>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
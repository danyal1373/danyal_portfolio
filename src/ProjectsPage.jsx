import React from 'react';
import { Box, Typography, Card, CardContent, Divider, Grid, Button } from '@mui/material';
import AnimatedCircle from './components/AnimatedCircle';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useTheme } from '@mui/material/styles';

const featured = [
  {
    title: "Ignik Outdoors",
    subtitle: "Featured 1",
    image: "https://via.placeholder.com/800x240",
    tags: ["Sustainability", "Heat", "Outdoors"]
  },
  {
    title: "Ignik Outdoors",
    subtitle: "Featured 2",
    image: "https://via.placeholder.com/800x240",
    tags: ["Eco-friendly", "Startup"]
  }
];

const projects = Array.from({ length: 12 }).map((_, idx) => ({
  title: `Project ${idx + 1}`,
  subtitle: "Ignik Outdoors",
  tags: ["UX", "Hardware"]
}));

export default function ProjectsPage() {
  const theme = useTheme();
  return (
    <Box sx={{ background: theme.palette.background.default, minHeight: '100vh', py: 4, position: 'relative', overflow: 'hidden' }}>
      {/* Background circles */}
      <AnimatedCircle color="primary" size={420} frequency={0.22} phase={0} style={{ top: '8%', left: '60%' }} />
      <AnimatedCircle color="error" size={420} frequency={0.25} phase={1.2} style={{ top: '18%', left: '75%' }} />
      <AnimatedCircle color="warning" size={420} frequency={0.21} phase={2.1} style={{ top: '28%', left: '50%' }} />
      <Box sx={{ maxWidth: 1100, mx: 'auto', position: 'relative', zIndex: 1 }}>
        <Typography variant="h5" sx={{ color: theme.palette.text.secondary, mb: 3, mt: 2, fontWeight: 400 }}>
          Projects
        </Typography>
        {/* Featured Projects */}
        <Grid container spacing={4} sx={{ mb: 4 }}>
          {featured.map((item, idx) => (
            <Grid item xs={12} md={6} key={idx}>
              <Card
                sx={{
                  background: theme.palette.background.paper + 'cc',
                  border: `1.5px solid ${theme.palette.divider}`,
                  boxShadow: '0 4px 30px rgba(0,0,0,0.08)',
                  backdropFilter: 'blur(12px)',
                  borderRadius: 2,
                  overflow: 'hidden',
                  minHeight: 260,
                  position: 'relative',
                  mb: 2,
                }}
              >
                <Box sx={{ position: 'absolute', top: 0, right: 0, width: '60%', height: '100%', zIndex: 0 }}>
                  <AnimatedCircle color="primary" size={320} frequency={0.18} phase={idx} style={{ top: '50%', left: '80%' }} />
                  <AnimatedCircle color="error" size={320} frequency={0.19} phase={idx + 1} style={{ top: '60%', left: '60%' }} />
                </Box>
                <CardContent sx={{ position: 'relative', zIndex: 1 }}>
                  <Typography variant="subtitle2" sx={{ color: theme.palette.error.main, fontWeight: 500 }}>
                    {item.subtitle}
                  </Typography>
                  <Typography variant="h6" sx={{ color: theme.palette.primary.main, fontWeight: 700, mb: 1 }}>
                    {item.title}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                    {item.tags.map((tag, i) => (
                      <Typography key={i} variant="caption" sx={{ color: theme.palette.text.secondary, background: theme.palette.background.paper, borderRadius: 1, px: 1, py: 0.2, opacity: 0.7 }}>
                        {tag}
                      </Typography>
                    ))}
                  </Box>
                  <Box component="img" src={item.image} alt={item.title} sx={{ width: '100%', borderRadius: 1, mt: 1, boxShadow: 1 }} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Divider sx={{ my: 4 }} />
        {/* Project Grid */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {projects.map((item, idx) => (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <Card
                sx={{
                  background: theme.palette.background.paper + 'cc',
                  border: `1.5px solid ${theme.palette.divider}`,
                  boxShadow: '0 4px 30px rgba(0,0,0,0.08)',
                  backdropFilter: 'blur(12px)',
                  borderRadius: 2,
                  overflow: 'hidden',
                  minHeight: 160,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  position: 'relative',
                  p: 2,
                }}
              >
                <Typography variant="subtitle2" sx={{ color: theme.palette.error.main, fontWeight: 500 }}>
                  {item.subtitle}
                </Typography>
                <Typography variant="body1" sx={{ color: theme.palette.primary.main, fontWeight: 700, mb: 1 }}>
                  {item.title}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                  {item.tags.map((tag, i) => (
                    <Typography key={i} variant="caption" sx={{ color: theme.palette.text.secondary, background: theme.palette.background.paper, borderRadius: 1, px: 1, py: 0.2, opacity: 0.7 }}>
                      {tag}
                    </Typography>
                  ))}
                </Box>
                <Box sx={{ position: 'absolute', bottom: 8, right: 8, opacity: 0.5 }}>
                  <OpenInNewIcon fontSize="small" />
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Divider sx={{ my: 4 }} />
        {/* Section Links (placeholder) */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
          <Button variant="outlined" endIcon={<OpenInNewIcon />} sx={{ justifyContent: 'space-between', color: theme.palette.error.main, borderColor: theme.palette.error.main, fontWeight: 500 }}>
            More Projects
          </Button>
          <Button variant="outlined" endIcon={<OpenInNewIcon />} sx={{ justifyContent: 'space-between', color: theme.palette.primary.main, borderColor: theme.palette.primary.main, fontWeight: 500 }}>
            Research
          </Button>
          <Button variant="outlined" endIcon={<OpenInNewIcon />} sx={{ justifyContent: 'space-between', color: theme.palette.warning.main, borderColor: theme.palette.warning.main, fontWeight: 500 }}>
            Resume
          </Button>
        </Box>
        {/* Footer nav icons (placeholder) */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Box key={i} sx={{ width: 32, height: 32, background: theme.palette.background.paper, borderRadius: '50%' }} />
          ))}
        </Box>
      </Box>
    </Box>
  );
} 
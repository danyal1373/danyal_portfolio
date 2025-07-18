import React, { useState } from 'react';
import { Box, Typography, Grid, Dialog, IconButton, useTheme } from '@mui/material';
import PhotoCard from './components/PhotoCard';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const photos = [
  {
    image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=600&q=80',
    title: 'Milky Way Over Mountains',
    date: '2023-07-12',
    location: 'Yosemite, CA',
    camera: 'Canon EOS R5',
    description: 'A clear night sky with the Milky Way visible above the mountain range.'
  },
  {
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    title: 'Star Trails',
    date: '2022-09-03',
    location: 'Joshua Tree, CA',
    camera: 'Nikon D850',
    description: 'Long exposure capturing the movement of stars across the night sky.'
  },
  {
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3fd9?auto=format&fit=crop&w=600&q=80',
    title: 'Orion Nebula',
    date: '2021-12-18',
    location: 'Big Bend, TX',
    camera: 'Sony A7 III',
    description: 'A close-up of the Orion Nebula taken with a telescope.'
  },
];

export default function AstrophotographyPage() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  const handleOpen = idx => {
    setCurrent(idx);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const handlePrev = () => setCurrent((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  const handleNext = () => setCurrent((prev) => (prev === photos.length - 1 ? 0 : prev + 1));

  return (
    <Box sx={{ background: theme.palette.background.default, minHeight: '100vh', py: 4 }}>
      <Box sx={{ maxWidth: 1100, mx: 'auto', mb: 4 }}>
        <Typography variant="h4" sx={{ color: 'text.primary', mb: 3, fontWeight: theme.typography.h6.fontWeight }}>
          Astrophotography
        </Typography>
        <Grid container spacing={2}>
          {photos.map((photo, idx) => (
            <Grid item xs={12} key={idx}>
              <PhotoCard {...photo} onImageClick={() => handleOpen(idx)} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <Box sx={{ position: 'relative', bgcolor: 'background.default', p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 8, right: 8, zIndex: 2 }}>
            <CloseIcon />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'center', minHeight: 400 }}>
            <IconButton onClick={handlePrev} sx={{ mr: 2 }}>
              <ArrowBackIosNewIcon />
            </IconButton>
            <Box sx={{ maxWidth: 600, width: '100%', aspectRatio: '4/3', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.paper', borderRadius: 2, overflow: 'hidden' }}>
              <img
                src={photos[current].image}
                alt={photos[current].title}
                style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 8 }}
              />
            </Box>
            <IconButton onClick={handleNext} sx={{ ml: 2 }}>
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
          <Box sx={{ mt: 2, width: '100%', maxWidth: 600 }}>
            <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: theme.typography.h2.fontWeight }}>
              {photos[current].title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
              {photos[current].date} {photos[current].location ? `| ${photos[current].location}` : ''}
            </Typography>
            {photos[current].camera && (
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
                {photos[current].camera}
              </Typography>
            )}
            {photos[current].description && (
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {photos[current].description}
              </Typography>
            )}
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
} 

import React, { useEffect, useMemo, useState } from 'react';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import GlassSection from './GlassSection';

export default function ImageGalleryCarousel({
  items = [],
  seconds = 6,
  aspectRatio = '16 / 9',
}) {
  const theme = useTheme();
  const normalizedItems = useMemo(
    () =>
      (Array.isArray(items) ? items : [])
        .map((item) => ({
          src: String(item?.src || '').trim(),
          name: String(item?.name || '').trim(),
        }))
        .filter((item) => item.src),
    [items]
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const duration = Number.isFinite(Number(seconds)) ? Math.max(2, Number(seconds)) : 6;
  const count = normalizedItems.length;

  useEffect(() => {
    if (count === 0) return;
    if (activeIndex > count - 1) setActiveIndex(0);
  }, [count, activeIndex]);

  useEffect(() => {
    if (count <= 1 || isPaused) return undefined;
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % count);
    }, duration * 1000);
    return () => clearInterval(id);
  }, [count, duration, isPaused]);

  if (!count) return null;

  const goPrev = () => setActiveIndex((prev) => (prev - 1 + count) % count);
  const goNext = () => setActiveIndex((prev) => (prev + 1) % count);
  const active = normalizedItems[activeIndex];

  return (
    <GlassSection sx={{ p: 2 }}>
      <Box
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        sx={{ position: 'relative' }}
      >
        <Box
          sx={{
            width: '100%',
            aspectRatio,
            borderRadius: theme.shape.borderRadius,
            overflow: 'hidden',
            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 0.5,
          }}
        >
          <Box
            component="img"
            src={active.src}
            alt={active.name || `Slide ${activeIndex + 1}`}
            sx={{
              maxWidth: '100%',
              maxHeight: '100%',
              width: 'auto',
              height: 'auto',
              objectFit: 'contain !important',
              display: 'block',
              m: '0 auto',
              mb: '0 !important',
            }}
          />
        </Box>

        {count > 1 ? (
          <>
            <IconButton
              onClick={goPrev}
              aria-label="Previous image"
              sx={{
                position: 'absolute',
                left: 6,
                top: '50%',
                transform: 'translateY(-50%)',
                color: theme.palette.text.secondary,
                opacity: 0.45,
                p: 0.25,
                backgroundColor: 'transparent',
                '&:hover': { opacity: 0.85, backgroundColor: 'transparent' },
              }}
            >
              <ChevronLeftIcon fontSize="small" />
            </IconButton>
            <IconButton
              onClick={goNext}
              aria-label="Next image"
              sx={{
                position: 'absolute',
                right: 6,
                top: '50%',
                transform: 'translateY(-50%)',
                color: theme.palette.text.secondary,
                opacity: 0.45,
                p: 0.25,
                backgroundColor: 'transparent',
                '&:hover': { opacity: 0.85, backgroundColor: 'transparent' },
              }}
            >
              <ChevronRightIcon fontSize="small" />
            </IconButton>
          </>
        ) : null}
      </Box>

      <Typography variant="caption" sx={{ display: 'block', mt: 1, color: theme.palette.text.secondary }}>
        {active.name || `Image ${activeIndex + 1}`}
      </Typography>

      {count > 1 ? (
        <Box sx={{ mt: 1.25, display: 'flex', gap: 1, overflowX: 'auto', pb: 0.5 }}>
          {normalizedItems.map((item, idx) => (
            <Box
              key={`${item.src}-${idx}`}
              onClick={() => setActiveIndex(idx)}
              sx={{
                width: 84,
                height: 56,
                borderRadius: 1,
                overflow: 'hidden',
                cursor: 'pointer',
                flexShrink: 0,
                border: idx === activeIndex ? `1px solid ${theme.palette.error.main}` : `1px solid ${theme.palette.divider}`,
                opacity: idx === activeIndex ? 1 : 0.65,
                transition: 'opacity 0.2s ease, border-color 0.2s ease',
                '&:hover': { opacity: 1 },
              }}
            >
              <Box
                component="img"
                src={item.src}
                alt={item.name || `Thumbnail ${idx + 1}`}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain !important',
                  display: 'block',
                  mb: '0 !important',
                  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                }}
              />
            </Box>
          ))}
        </Box>
      ) : null}
    </GlassSection>
  );
}


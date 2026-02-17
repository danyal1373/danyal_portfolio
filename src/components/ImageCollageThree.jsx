import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import GlassSection from './GlassSection';

export default function ImageCollageThree({
  image1,
  image2,
  image3,
  alt1 = '',
  alt2 = '',
  alt3 = '',
  caption = '',
  gap = 1.5,
  leftRatio = 2,
  rightRatio = 1,
  topAspect = '16 / 9',
  bottomAspect = '16 / 9',
  fit = 'cover',
  rightFit,
  rightImageWidth = '100%',
  rightImageHeight = '100%',
  mobileTopHeight = 220,
  mobileBottomHeight = 220,
  mobilePortraitHeight = 320,
  noGlass = false,
}) {
  const theme = useTheme();
  const hasSecondImage = Boolean(image2);

  if (!image1 || !image3) {
    return null;
  }

  const content = (
    <Box sx={{ p: 2 }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: `${leftRatio}fr ${rightRatio}fr` },
          gap,
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateRows: { xs: hasSecondImage ? 'auto auto' : 'auto', md: hasSecondImage ? '1fr 1fr' : '1fr' },
            gap,
            gridColumn: { xs: '1 / -1', md: '1 / 2' },
          }}
        >
          <Box
            component="img"
            src={image1}
            alt={alt1}
            sx={{
              width: '100%',
              height: { xs: mobileTopHeight, md: '100%' },
              aspectRatio: { xs: 'auto', md: topAspect },
              objectFit: fit,
              borderRadius: theme.shape.borderRadius,
            }}
          />
          {hasSecondImage ? (
            <Box
              component="img"
              src={image2}
              alt={alt2}
              sx={{
                width: '100%',
                height: { xs: mobileBottomHeight, md: '100%' },
                aspectRatio: { xs: 'auto', md: bottomAspect },
                objectFit: fit,
                borderRadius: theme.shape.borderRadius,
              }}
            />
          ) : null}
        </Box>
        <Box
          sx={{
            gridColumn: { xs: '1 / -1', md: '2 / 3' },
            display: 'flex',
            minHeight: 0,
            alignItems: { xs: 'stretch', md: 'flex-start' },
            justifyContent: { xs: 'center', md: 'flex-start' },
          }}
        >
          <Box
            component="img"
            src={image3}
            alt={alt3}
            sx={{
              width: { xs: '100%', md: rightImageWidth },
              height: { xs: mobilePortraitHeight, md: rightImageHeight },
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: rightFit || fit,
              borderRadius: theme.shape.borderRadius,
              mx: { xs: 0, md: 0 },
              my: { xs: 0, md: 0 },
            }}
          />
        </Box>
      </Box>
      {caption ? (
        <Typography variant="caption" sx={{ display: 'block', mt: 1.5, color: theme.palette.text.secondary }}>
          {caption}
        </Typography>
      ) : null}
    </Box>
  );

  if (noGlass) {
    return content;
  }

  return <GlassSection sx={{ p: 0 }}>{content}</GlassSection>;
}


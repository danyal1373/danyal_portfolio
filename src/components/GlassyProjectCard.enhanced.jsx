import React, { useState, useRef } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useTheme } from '@mui/material/styles';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function GlassyProjectCard({ title, color = 'primary', icon }) {
  const [hover, setHover] = useState(false);
  const Icon = icon || OpenInNewIcon;
  const theme = useTheme();
  const cardRef = useRef(null);

  // Motion values for fluid interactions
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  // Spring animations for smooth transitions
  const springConfig = { damping: 25, stiffness: 300 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  // Transform values for 3D effect
  const transformX = useTransform(springRotateX, [-10, 10], [-5, 5]);
  const transformY = useTransform(springRotateY, [-10, 10], [5, -5]);

  // Resolve color from theme palette if possible
  let resolvedColor = color;
  if (theme.palette[color] && theme.palette[color].main) {
    resolvedColor = theme.palette[color].main;
  }

  const handleMouseMove = (event) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseXFromCenter = event.clientX - centerX;
    const mouseYFromCenter = event.clientY - centerY;

    mouseX.set(mouseXFromCenter);
    mouseY.set(mouseYFromCenter);

    // Calculate rotation based on mouse position
    const rotateXValue = (mouseYFromCenter / (rect.height / 2)) * -10;
    const rotateYValue = (mouseXFromCenter / (rect.width / 2)) * 10;

    rotateX.set(rotateXValue);
    rotateY.set(rotateYValue);
  };

  const handleMouseLeave = () => {
    setHover(false);
    // Reset all motion values
    mouseX.set(0);
    mouseY.set(0);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <motion.div
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        <Card
          sx={{
            minWidth: 200,
            minHeight: 340,
            height: 340,
            flex: 1,
            m: 1,
            px: 2,
            py: 2,
            display: 'flex',
            alignItems: 'flex-end',
            background: `linear-gradient(135deg, 
              ${theme.palette.background.paper}cc 0%, 
              ${theme.palette.background.paper}99 50%, 
              ${theme.palette.background.paper}cc 100%)`,
            border: `1.5px solid ${theme.palette.divider}`,
            boxShadow: hover 
              ? `0 20px 60px ${resolvedColor}33, 0 8px 32px rgba(0,0,0,0.12)`
              : '0 4px 30px rgba(0,0,0,0.08)',
            backdropFilter: 'blur(20px)',
            borderRadius: (theme) => theme.shape.borderRadius,
            position: 'relative',
            overflow: 'hidden',
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `linear-gradient(135deg, 
                rgba(255,255,255,0.1) 0%, 
                rgba(255,255,255,0.05) 50%, 
                rgba(255,255,255,0.02) 100%)`,
              borderRadius: 'inherit',
              pointerEvents: 'none',
              zIndex: 1,
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
                ${resolvedColor}15 0%, 
                transparent 50%)`,
              borderRadius: 'inherit',
              pointerEvents: 'none',
              zIndex: 2,
              opacity: hover ? 1 : 0,
              transition: 'opacity 0.3s ease',
            },
          }}
        >
          {/* Animated background gradient */}
          <motion.div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `linear-gradient(45deg, 
                ${resolvedColor}08 0%, 
                transparent 30%, 
                transparent 70%, 
                ${resolvedColor}08 100%)`,
              borderRadius: 'inherit',
              zIndex: 0,
            }}
            animate={{
              background: hover 
                ? `linear-gradient(45deg, 
                    ${resolvedColor}15 0%, 
                    transparent 30%, 
                    transparent 70%, 
                    ${resolvedColor}15 100%)`
                : `linear-gradient(45deg, 
                    ${resolvedColor}08 0%, 
                    transparent 30%, 
                    transparent 70%, 
                    ${resolvedColor}08 100%)`,
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Floating particles effect */}
          {hover && (
            <motion.div
              style={{
                position: 'absolute',
                top: '20%',
                left: '20%',
                width: 4,
                height: 4,
                borderRadius: '50%',
                background: resolvedColor,
                zIndex: 3,
              }}
              animate={{
                y: [-10, 10, -10],
                x: [-5, 5, -5],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}

          {/* Centered icon with enhanced animation */}
          <motion.div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 4,
            }}
            animate={{
              opacity: hover ? 1 : 0,
              scale: hover ? 1.1 : 0.8,
              rotate: hover ? [0, 5, -5, 0] : 0,
            }}
            transition={{
              opacity: { duration: 0.3 },
              scale: { duration: 0.3, type: "spring", stiffness: 300 },
              rotate: { duration: 0.6, ease: "easeInOut" },
            }}
          >
            <Icon 
              sx={{ 
                fontSize: 56, 
                color: resolvedColor, 
                opacity: 0.8,
                filter: hover ? 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' : 'none',
              }} 
            />
          </motion.div>

          {/* Content with enhanced typography */}
          <CardContent sx={{ position: 'relative', zIndex: 5 }}>
            <motion.div
              animate={{
                y: hover ? -5 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  color: theme.palette.text.secondary, 
                  fontWeight: theme.typography.h6.fontWeight,
                  textShadow: hover ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
                  transition: 'all 0.3s ease',
                }}
              >
                {title}
              </Typography>
            </motion.div>
          </CardContent>

          {/* Glossy overlay */}
          <motion.div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `linear-gradient(135deg, 
                rgba(255,255,255,0.2) 0%, 
                transparent 50%, 
                rgba(255,255,255,0.1) 100%)`,
              borderRadius: 'inherit',
              pointerEvents: 'none',
              zIndex: 6,
            }}
            animate={{
              opacity: hover ? 0.3 : 0.1,
            }}
            transition={{ duration: 0.3 }}
          />
        </Card>
      </motion.div>
    </motion.div>
  );
} 

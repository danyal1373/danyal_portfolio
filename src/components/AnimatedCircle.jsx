import React, { useRef, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';

export default function AnimatedCircle({ color = 'primary', size = 400, frequency = 0.5, phase = 0, style = {} }) {
  const ref = useRef();
  const theme = useTheme();

  // Resolve color from theme palette if possible
  let resolvedColor = color;
  if (theme.palette[color] && theme.palette[color].main) {
    resolvedColor = theme.palette[color].main;
  }

  useEffect(() => {
    let frame;
    const start = Date.now();
    const animate = () => {
      const t = (Date.now() - start) / 1000;
      // Move back and forth horizontally, amplitude 80px
      const x = Math.sin(frequency * t + phase) * 80;
      if (ref.current) {
        ref.current.style.transform = `translateX(${x}px)`;
      }
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, [frequency, phase]);

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        top: '30%',
        left: '50%',
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
        borderRadius: '50%',
        background: `radial-gradient(circle at 50% 50%,
          ${resolvedColor}90 0%,
          ${resolvedColor}90 20%,
          ${resolvedColor}90 30%,
          ${resolvedColor}80 40%,
          ${resolvedColor}50 55%, 
          ${resolvedColor}45 60%,
          ${resolvedColor}05 75%,
          ${resolvedColor}00 80%,
          ${resolvedColor}00 90%,
          ${resolvedColor}00 100%)`,
        opacity: 1,
        zIndex: -1,
        filter: 'blur(0.5px)',
        ...style,
      }}
    />
  );
} 
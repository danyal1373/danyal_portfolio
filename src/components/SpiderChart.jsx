import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import * as d3 from 'd3';
import { useGlassmorphism } from '../hooks/useGlassmorphism';

const factionData = {
  business: {
    labels: ['Strategy', 'Leadership', 'Innovation', 'Communication', 'Problem Solving', 'Adaptability', 'Decision Making', 'Team Building'],
    data: [85, 90, 75, 88, 82, 87, 80, 85],
    color: '#D11B28',
    gradient: 'rgba(209,27,40,0.25), rgba(209,27,40,0.05)'
  },
  design: {
    labels: ['Creativity', 'User Research', 'Visual Design', 'Prototyping', 'Typography', 'Color Theory', 'UX Design', 'Design Systems'],
    data: [90, 85, 95, 88, 92, 87, 90, 85],
    color: '#ECB145',
    gradient: 'rgba(236,177,69,0.25), rgba(236,177,69,0.05)'
  },
  engineering: {
    labels: ['Frontend', 'Backend', 'Database', 'DevOps', 'Testing', 'Architecture', 'Security', 'Performance'],
    data: [88, 85, 82, 80, 85, 87, 83, 86],
    color: '#21A6C0',
    gradient: 'rgba(33,166,192,0.25), rgba(33,166,192,0.05)'
  }
};

const factions = [
  { key: 'business', label: 'Business' },
  { key: 'design', label: 'Design' },
  { key: 'engineering', label: 'Engineering' }
];

function TrioSwitch({ active, onHover, onClick }) {
  const glassmorphism = useGlassmorphism();
  
  // Calculate left position for slider
  const idx = factions.findIndex(f => f.key === active);
  
  const noisyBackgroundStyle = {
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      backgroundImage: `url('data:image/svg+xml,%3Csvg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%" height="100%" filter="url(%23noiseFilter)"/%3E%3C/svg%3E')`,
      opacity: 0.05,
      pointerEvents: 'none',
    },
  };

  return (
    <Box
      sx={{
        ...glassmorphism.base,
        ...glassmorphism.withHighlights,
        ...glassmorphism.hover,
        ...noisyBackgroundStyle,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        width: 420,
        height: 36,
        px: 0.5,
        py: 0.5,
        overflow: 'hidden',
        mb: 0,
        mt: 2,
      }}
    >
      {/* Sliding colored rectangle */}
      <Box
        sx={{
          ...glassmorphism.colored(factionData[active].color),
          position: 'absolute',
          top: 2,
          left: 8 + idx * 138,
          width: 130,
          height: 28,
          borderRadius: (theme) => theme.shape.borderRadius,
          zIndex: 2,
          transition: 'all 0.5s ease-in-out',
        }}
      />
      {factions.map((f, i) => (
        <Box
          key={f.key}
          onMouseEnter={() => onHover(f.key)}
          onClick={() => onClick(f.key)}
          sx={{
            flex: 1,
            zIndex: 3,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 600,
            fontSize: 14,
            fontFamily: '"Libre Franklin", Arial, sans-serif',
            color: active === f.key ? factionData[f.key].color : '#222',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            borderRadius: (theme) => theme.shape.borderRadius,
            userSelect: 'none',
            position: 'relative',
            letterSpacing: 0.2,
            textShadow: active === f.key ? '0 1px 2px rgba(0,0,0,0.1)' : 'none',
            '&:hover': {
              color: factionData[f.key].color,
              textShadow: '0 1px 2px rgba(0,0,0,0.1)',
            },
          }}
        >
          {f.label}
        </Box>
      ))}
    </Box>
  );
}

function D3RadarChart({ labels, data, color, width = 340, height = 340 }) {
  const ref = useRef();
  useEffect(() => {
    // Clear previous SVG
    d3.select(ref.current).selectAll('*').remove();
    const radius = Math.min(width, height) / 2 - 40;
    const levels = 5;
    const angleSlice = (2 * Math.PI) / labels.length;
    const maxValue = 100;
    const svg = d3.select(ref.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);
    // Draw grid
    for (let level = 1; level <= levels; level++) {
      const r = (radius / levels) * level;
      svg.append('polygon')
        .attr('points', labels.map((_, i) => {
          const angle = i * angleSlice - Math.PI / 2;
          return [r * Math.cos(angle), r * Math.sin(angle)].join(',');
        }).join(' '))
        .attr('stroke', '#8884')
        .attr('stroke-width', 1)
        .attr('fill', 'none');
    }
    // Draw axes
    labels.forEach((label, i) => {
      const angle = i * angleSlice - Math.PI / 2;
      svg.append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', radius * Math.cos(angle))
        .attr('y2', radius * Math.sin(angle))
        .attr('stroke', '#8886')
        .attr('stroke-width', 1);
      // Label
      svg.append('text')
        .attr('x', (radius + 16) * Math.cos(angle))
        .attr('y', (radius + 16) * Math.sin(angle))
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .attr('font-size', 13)
        .attr('fill', '#bbb')
        .text(label);
    });
    // Draw data area
    const points = data.map((d, i) => {
      const angle = i * angleSlice - Math.PI / 2;
      const r = (d / maxValue) * radius;
      return [r * Math.cos(angle), r * Math.sin(angle)];
    });
    svg.append('polygon')
      .attr('points', points.map(p => p.join(',')).join(' '))
      .attr('fill', color + '33')
      .attr('stroke', color)
      .attr('stroke-width', 2);
    // Draw data points
    points.forEach(([x, y], i) => {
      svg.append('circle')
        .attr('cx', x)
        .attr('cy', y)
        .attr('r', 4)
        .attr('fill', color)
        .attr('stroke', '#fff')
        .attr('stroke-width', 2);
    });
  }, [labels, data, color, width, height]);
  return <svg ref={ref} style={{ width, height }} />;
}

export default function SpiderChart({ textColor = '#222', faction, setFaction, setHoveredFaction, showOnlyChart }) {
  // If controlled, use props; else fallback to local state
  const [localFaction, localSetFaction] = useState('business');
  const [localHoveredFaction, localSetHoveredFaction] = useState(null);
  const activeFaction = faction || localFaction;
  const hoveredFaction = setHoveredFaction ? null : localHoveredFaction;
  const displayFaction = hoveredFaction || activeFaction;
  const chartRef = useRef(null);

  const handleSetFaction = setFaction || localSetFaction;
  const handleSetHoveredFaction = setHoveredFaction || localSetHoveredFaction;

  const { labels, data, color } = factionData[displayFaction];

  return (
    <Box sx={{ width: '100%', height: 380, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <D3RadarChart labels={labels} data={data} color={color} width={340} height={340} />
      <TrioSwitch
        active={displayFaction}
        onHover={key => handleSetHoveredFaction(key)}
        onClick={key => handleSetFaction(key)}
      />
    </Box>
  );
} 
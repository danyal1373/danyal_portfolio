import React, { useRef, useEffect, useState } from 'react';
import { Box, Card, Typography, useTheme } from '@mui/material';
import { useGlassmorphism } from '../hooks/useGlassmorphism';
import * as d3 from 'd3';

const periods = [
  { label: 'High School', start: 2008, end: 2011, color: '#21A6C0' },
  { label: 'Mechanical Engineering', start: 2012, end: 2022, color: '#ECB145' },
  { label: 'MBA Marketing', start: 2023, end: 2024, color: '#D11B28' },
  { label: 'MIIPS Program', start: 2023, end: 2024, color: '#fff' },
  { label: 'Professional Experience', start: 2023, end: 2024, color: '#4CAF50' },
];

function lightenColor(hex, amount = 0.25) {
  // Always convert to HSL using d3.hsl for all color types
  let hsl;
  try {
    hsl = d3.hsl(hex);
  } catch {
    return hex;
  }
  hsl.s = hsl.s * 0.7;
  hsl.l = Math.min(1, hsl.l + amount);
  return hsl.formatHex();
}

export default function LifetimeRoadmap() {
  const theme = useTheme();
  const glassmorphism = useGlassmorphism();
  const noisyBackgroundStyle = {
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      backgroundImage: `url('data:image/svg+xml,%3Csvg viewBox=\\"0 0 512 512\\" xmlns=\\"http://www.w3.org/2000/svg\\"%3E%3Cfilter id=\\"noiseFilter\\"%3E%3CfeTurbulence type=\\"fractalNoise\\" baseFrequency=\\"0.8\\" numOctaves=\\"3\\" stitchTiles=\\"stitch\\"/%3E%3C/filter%3E%3Crect width=\\"100%\\" height=\\"100%\\" filter=\\"url(%23noiseFilter)\\"/%3E%3C/svg%3E')`,
      opacity: theme.palette.mode === 'dark' ? 0.05 : 0.1,
      pointerEvents: 'none',
      zIndex: 0,
    },
  };
  const chartRef = useRef();
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, label: '', years: '' });

  useEffect(() => {
    const margin = { top: 30, right: 40, bottom: 40, left: 0 };
    const width = 900;
    const barHeight = 24;
    const height = (barHeight + 18) * periods.length;
    const minYear = 2008;
    const maxYear = 2024;
    d3.select(chartRef.current).selectAll('*').remove();
    const svg = d3.select(chartRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    // Gradients
    const defs = svg.append('defs');
    periods.forEach((d, i) => {
      const gradId = `bar-gradient-${i}`;
      const grad = defs.append('linearGradient')
        .attr('id', gradId)
        .attr('x1', '0%').attr('x2', '100%').attr('y1', '0%').attr('y2', '0%');
      grad.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', d.color)
        .attr('stop-opacity', 0.95);
      grad.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', lightenColor(d.color, 0.22))
        .attr('stop-opacity', 0.95);
    });
    // X scale
    const x = d3.scaleLinear()
      .domain([minYear, maxYear])
      .range([0, width]);
    // Y scale
    const y = d3.scaleBand()
      .domain(periods.map((_, i) => i))
      .range([0, height])
      .padding(0.45);
    // X axis
    g.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).tickFormat(d3.format('d')).ticks(maxYear - minYear))
      .selectAll('text')
      .attr('font-size', 13)
      .attr('fill', theme.palette.text.secondary);
    // Bars
    g.selectAll('rect')
      .data(periods)
      .enter()
      .append('rect')
      .attr('x', d => x(d.start))
      .attr('y', (_, i) => y(i) + (y.bandwidth() - barHeight) / 2)
      .attr('width', d => x(d.end) - x(d.start))
      .attr('height', barHeight)
      .attr('rx', barHeight / 2)
      .attr('fill', (d, i) => `url(#bar-gradient-${i})`)
      .attr('opacity', 0.95)
      .attr('stroke', theme.palette.mode === 'dark' ? '#222' : '#fff')
      .attr('stroke-width', 2)
      .on('mousemove', function (event, d) {
        const [mx, my] = d3.pointer(event, svg.node());
        setTooltip({
          visible: true,
          x: mx + 10,
          y: my - 10,
          label: d.label,
          years: `${d.start} - ${d.end}`,
        });
      })
      .on('mouseleave', function () {
        setTooltip(t => ({ ...t, visible: false }));
      });
    // Bar labels (centered)
    g.selectAll('bar-label')
      .data(periods)
      .enter()
      .append('text')
      .attr('x', d => x(d.start) + (x(d.end) - x(d.start)) / 2)
      .attr('y', (_, i) => y(i) + y.bandwidth() / 2 + 5)
      .attr('text-anchor', 'middle')
      .attr('font-size', 15)
      .attr('font-weight', 600)
      .attr('fill', theme.palette.mode === 'dark' ? '#222' : '#333')
      .text(d => d.label);
  }, [theme]);

  return (
    <Box sx={{ maxWidth: 1100, mx: 'auto', width: '100%', mt: 6 }}>
      <Card
        sx={{
          ...glassmorphism.base,
          ...glassmorphism.withHighlights,
          ...glassmorphism.hover,
          ...noisyBackgroundStyle,
          p: { xs: 2, md: 4 },
          borderRadius: theme.shape.borderRadius * 2,
          boxShadow: 'none',
          minHeight: 400,
          height: 480,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
        }}
      >
        <Typography variant="h5" sx={{ mb: 3, color: theme.palette.text.primary }}>
          Lifetime Roadmap
        </Typography>
        <Box sx={{ flex: 1, minHeight: 320, position: 'relative', overflow: 'auto' }}>
          <svg ref={chartRef} style={{ width: '100%', height: (24 + 18) * periods.length + 80 }} />
          {tooltip.visible && (
            <Box
              sx={{
                position: 'absolute',
                left: tooltip.x,
                top: tooltip.y,
                bgcolor: 'background.paper',
                color: 'text.primary',
                borderRadius: 2,
                boxShadow: 3,
                px: 2,
                py: 1,
                fontSize: 15,
                pointerEvents: 'none',
                zIndex: 10,
                border: `1px solid ${theme.palette.divider}`,
                minWidth: 120,
              }}
            >
              <strong>{tooltip.label}</strong>
              <br />
              <span style={{ fontSize: 13, color: theme.palette.text.secondary }}>{tooltip.years}</span>
            </Box>
          )}
        </Box>
      </Card>
    </Box>
  );
} 
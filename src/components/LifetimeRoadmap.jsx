import React, { useRef, useEffect, useState } from 'react';
import { Box, Card, Typography, useTheme } from '@mui/material';
import { useGlassmorphism } from '../hooks/useGlassmorphism';
import * as d3 from 'd3';

const periods = [
  { label: 'High School', start: { year: 2008, quarter: 1 }, end: { year: 2012, quarter: 2 }, color: '#CDE4E9' },
  { label: 'Astrophotography', start: { year: 2009, quarter: 1 }, end: { year: 2025, quarter: 2 }, color: '#CDE4E9' },
  { label: 'Astronomy Olympiad Study', start: { year: 2009, quarter: 1 }, end: { year: 2011, quarter: 3 }, color: '#CDE4E9' },
  { label: 'Astronomy Olympiad Summer Program', start: { year: 2011, quarter: 2 }, end: { year: 2011, quarter: 3 }, color: '#CDE4E9' },
  { label: 'Mechanical Engineering', start: { year: 2012, quarter: 2 }, end: { year: 2016, quarter: 2 }, color: '#ECCBCD' },
  { label: 'Startup Work', start: { year: 2015, quarter: 3 }, end: { year: 2018, quarter: 1 }, color: '#ECCBCD' },
  { label: 'MBA Marketing', start: { year: 2018, quarter: 1 }, end: { year: 2020, quarter: 2 }, color: '#ECCBCD' },
  { label: 'MTN Irancell Internship', start: { year: 2018, quarter: 4 }, end: { year: 2019, quarter: 2 }, color: '#ECCBCD' },
  { label: 'YAStudio', start: { year: 2020, quarter: 3 }, end: { year: 2021, quarter: 4 }, color: '#F0E6D4' },
  { label: 'Dream Farm Studios', start: { year: 2021, quarter: 4 }, end: { year: 2022, quarter: 3 }, color: '#F0E6D4' },
  { label: 'MIIPS Program', start: { year: 2022, quarter: 3 }, end: { year: 2023, quarter: 4 }, color: '#F0E6D4' },
  { label: 'CCC Intelligent Solutions', start: { year: 2023, quarter: 2 }, end: { year: 2025, quarter: 3 }, color: '#F0E6D4' },
];

// Helper function to convert year and quarter to decimal time
function toDecimalTime(year, quarter) {
  return year + (quarter - 1) / 4;
}

// Helper function to format time for display
function formatTime(year, quarter) {
  return `${year} Q${quarter}`;
}

// Helper function to get quarter label
function getQuarterLabel(quarter) {
  const labels = ['', 'Q1', 'Q2', 'Q3', 'Q4'];
  return labels[quarter] || '';
}

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
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, label: '', timeRange: '' });

  useEffect(() => {
    const margin = { top: 20, right: 40, bottom: 30, left: 200 }; // Reduced margins
    const width = 900;
    const barHeight = 16; // Slightly larger bar height
    const height = (barHeight + 6) * periods.length; // More spacing between bars
    
    // Calculate min and max time in decimal format
    const allTimes = periods.flatMap(p => [
      toDecimalTime(p.start.year, p.start.quarter),
      toDecimalTime(p.end.year, p.end.quarter)
    ]);
    const minTime = Math.floor(Math.min(...allTimes));
    const maxTime = Math.ceil(Math.max(...allTimes));
    
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
      .domain([minTime, maxTime])
      .range([0, width]);
    
    // Y scale
    const y = d3.scaleBand()
      .domain(periods.map((_, i) => i))
      .range([0, height])
      .padding(0.6); // More padding for better spacing
    
    // X axis with year ticks only
    const xAxis = d3.axisBottom(x)
      .tickFormat(d => Math.floor(d).toString())
      .ticks(maxTime - minTime); // One tick per year
    
    g.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis)
      .selectAll('text')
      .attr('font-size', theme.typography.caption.fontSize)
      .attr('font-weight', 300)
      .attr('fill', theme.palette.text.secondary);
    
    // Bars
    g.selectAll('rect')
      .data(periods)
      .enter()
      .append('rect')
      .attr('x', d => x(toDecimalTime(d.start.year, d.start.quarter)))
      .attr('y', (_, i) => y(i) + (y.bandwidth() - barHeight) / 2)
      .attr('width', d => x(toDecimalTime(d.end.year, d.end.quarter)) - x(toDecimalTime(d.start.year, d.start.quarter)))
      .attr('height', barHeight)
      .attr('rx', 4) // Using theme.shape.borderRadius * 2 (which is 4) to match the card
      .attr('fill', (d, i) => `url(#bar-gradient-${i})`)
      .attr('opacity', 0.95)
      .attr('stroke', theme.palette.mode === 'dark' ? '#222' : '#fff')
      .attr('stroke-width', 2)
      .style('transition', 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)')
      .on('mouseenter', function (event, d, index) {
        // Highlight hovered bar
        d3.select(this)
          .attr('opacity', 1)
          .attr('stroke-width', 3)
          .attr('stroke', theme.palette.primary.main);
        
        // Dim other bars
        g.selectAll('rect').filter(function() { return this !== event.currentTarget; })
          .attr('opacity', 0.3);
        
        // Highlight corresponding label
        g.selectAll('text').filter(function() { 
          return d3.select(this).datum() === d; 
        })
          .attr('font-weight', 600)
          .attr('fill', theme.palette.primary.main);
        
        // Dim other labels
        g.selectAll('text').filter(function() { 
          return d3.select(this).datum() !== d; 
        })
          .attr('font-weight', 300)
          .attr('fill', theme.palette.text.secondary);
        
        // Show tooltip
        const [mx, my] = d3.pointer(event, svg.node());
        setTooltip({
          visible: true,
          x: mx + 15,
          y: my - 15,
          label: d.label,
          timeRange: `${formatTime(d.start.year, d.start.quarter)} - ${formatTime(d.end.year, d.end.quarter)}`,
        });
      })
      .on('mouseleave', function () {
        // Reset all bars to normal state
        g.selectAll('rect')
          .attr('opacity', 0.95)
          .attr('stroke-width', 2)
          .attr('stroke', theme.palette.mode === 'dark' ? '#222' : '#fff');
        
        // Reset all labels to normal state
        g.selectAll('text')
          .attr('font-weight', 300)
          .attr('fill', theme.palette.text.primary);
        
        // Hide tooltip
        setTooltip(t => ({ ...t, visible: false }));
      });
    
    // Bar labels (left column) - using smaller and thinner typography
    g.selectAll('bar-label')
      .data(periods)
      .enter()
      .append('text')
      .attr('x', -200) // Position labels to the left of the chart area
      .attr('y', (_, i) => y(i) + y.bandwidth() / 2 + 5)
      .attr('text-anchor', 'start')
      .attr('font-family', theme.typography.fontFamily)
      .attr('font-size', theme.typography.body2.fontSize)
      .attr('font-weight', 300)
      .attr('fill', theme.palette.text.primary)
      .style('transition', 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)')
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
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
        }}
      >
        <Typography variant="h5" sx={{ mb: 3, color: theme.palette.text.primary }}>
          Lifetime Roadmap
        </Typography>
        <Box sx={{ flex: 1, position: 'relative', overflow: 'visible' }}>
          <svg ref={chartRef} style={{ width: '100%', height: (16 + 6) * periods.length + 50, overflow: 'visible' }} />
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
              <span style={{ fontSize: theme.typography.body2.fontSize, color: theme.palette.text.secondary }}>{tooltip.timeRange}</span>
            </Box>
          )}
        </Box>
      </Card>
    </Box>
  );
} 

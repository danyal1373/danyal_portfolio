import React, { useState, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

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
  // Calculate left position for slider
  const idx = factions.findIndex(f => f.key === active);
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        width: 420,
        height: 36,
        bgcolor: 'rgba(255,255,255,0.12)',
        borderRadius: (theme) => theme.shape.borderRadius,
        px: 0.5,
        py: 0.5,
        boxShadow: '0 2px 12px 0 rgba(0,0,0,0.10)',
        border: '2px solid rgba(255,255,255,0.10)',
        overflow: 'hidden',
        mb: 0,
        mt: 2
      }}
    >
      {/* Sliding colored rectangle */}
      <Box
        sx={{
          position: 'absolute',
          top: 2,
          left: 8 + idx * 138,
          width: 130,
          height: 28,
          borderRadius: (theme) => theme.shape.borderRadius,
          zIndex: 1,
          transition: 'left 0.35s cubic-bezier(.7,.2,.2,1)',
          background: `radial-gradient(circle at 60% 40%, ${factionData[active].color}33 60%, ${factionData[active].color}09 100%)`,
          boxShadow: `0 0 24px 0 ${factionData[active].color}33`,
        }}
      />
      {factions.map((f, i) => (
        <Box
          key={f.key}
          onMouseEnter={() => onHover(f.key)}
          onClick={() => onClick(f.key)}
          sx={{
            flex: 1,
            zIndex: 2,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 600,
            fontSize: 14,
            fontFamily: '"Libre Franklin", Arial, sans-serif',
            color: active === f.key ? factionData[f.key].color : '#222',
            cursor: 'pointer',
            transition: 'color 0.3s',
            borderRadius: (theme) => theme.shape.borderRadius,
            userSelect: 'none',
            position: 'relative',
            letterSpacing: 0.2,
          }}
        >
          {f.label}
        </Box>
      ))}
    </Box>
  );
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

  const createDataset = (factionKey, isActive) => {
    const data = factionData[factionKey];
    const color = data.color;
    const opacity = isActive ? 1 : 0.2;
    return {
      label: factionKey.charAt(0).toUpperCase() + factionKey.slice(1),
      data: data.data,
      backgroundColor: (ctx) => {
        const chart = ctx.chart;
        const {ctx: c, chartArea} = chart;
        if (!chartArea) return `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, ${isActive ? 0.2 : 0.05})`;
        const grad = c.createRadialGradient(
          (chartArea.left + chartArea.right) / 2,
          (chartArea.top + chartArea.bottom) / 2,
          0,
          (chartArea.left + chartArea.right) / 2,
          (chartArea.top + chartArea.bottom) / 2,
          chartArea.width / 2
        );
        grad.addColorStop(0, `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, 0.05)`);
        grad.addColorStop(1, `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, ${isActive ? 0.2 : 0.05})`);
        return grad;
      },
      borderColor: `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, ${opacity})`,
      borderWidth: isActive ? 2 : 1,
      pointBackgroundColor: `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, ${opacity})`,
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: color,
      pointRadius: isActive ? 4 : 2,
      pointHoverRadius: isActive ? 6 : 4,
      fill: true
    };
  };

  const chartData = {
    labels: factionData.business.labels,
    datasets: [
      createDataset('business', displayFaction === 'business'),
      createDataset('design', displayFaction === 'design'),
      createDataset('engineering', displayFaction === 'engineering')
    ]
  };

  const options = {
    scales: {
      r: {
        angleLines: {
          display: true,
          color: 'rgba(0,0,0,0.08)'
        },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          backdropColor: 'transparent',
          color: textColor,
          stepSize: 20
        },
        grid: {
          color: 'rgba(0,0,0,0.08)'
        },
        pointLabels: {
          color: textColor,
          font: {
            size: 12
          }
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false
      }
    },
    animation: {
      duration: 500,
      easing: 'easeInOutQuart'
    },
    elements: {
      line: {
        tension: 0.4
      }
    },
    onHover: (event, elements) => {
      // No chart hover highlight, handled by switch
    }
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      gap: 2,
      mt: 4,
      mb: 4,
      width: '100%',
    }}>
      <Box sx={{ 
        width: '100%', 
        maxWidth: 500, 
        height: 400,
        position: 'relative',
        transition: 'all 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
        onMouseLeave={() => handleSetHoveredFaction(null)}
      >
        <Radar 
          ref={chartRef}
          data={chartData} 
          options={options}
        />
        <Box sx={{ mt: 2 }}>
          <TrioSwitch
            active={displayFaction}
            onHover={key => handleSetHoveredFaction(key)}
            onMouseLeave={() => handleSetHoveredFaction(null)}
            onClick={key => handleSetFaction(key)}
          />
        </Box>
      </Box>
    </Box>
  );
} 
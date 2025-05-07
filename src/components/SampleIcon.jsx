import React from 'react';

export default function SampleIcon(props) {
  return (
    <svg width={32} height={32} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="16" cy="16" r="14" stroke="#fff" strokeWidth="2" fill="#222" />
      <text x="16" y="21" textAnchor="middle" fontSize="14" fill="#fff" fontFamily="Arial">IQ</text>
    </svg>
  );
} 
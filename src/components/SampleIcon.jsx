import React from 'react';

export default function SampleIcon(props) {
  return (
    <img 
      src="/DGB_Logo.svg" 
      alt="DGB Logo" 
      width={32} 
      height={32} 
      style={{ objectFit: 'contain' }}
      {...props}
    />
  );
} 
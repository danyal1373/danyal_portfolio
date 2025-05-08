import React, { useState, useEffect } from 'react';
import { Fade, Grow } from '@mui/material';
import PageLoader from './PageLoader';

export default function withPageTransition(WrappedComponent) {
  return function WithPageTransition(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      // Simulate loading time (you can remove this in production)
      const timer = setTimeout(() => {
        setIsLoading(false);
        // Small delay before showing content
        setTimeout(() => setIsVisible(true), 100);
      }, 800);

      return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
      return <PageLoader />;
    }

    return (
      <Fade in={isVisible} timeout={800}>
        <div>
          <Grow in={isVisible} timeout={1000}>
            <div>
              <WrappedComponent {...props} />
            </div>
          </Grow>
        </div>
      </Fade>
    );
  };
} 
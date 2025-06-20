import React, { createContext, useContext, useState, useEffect } from 'react';

const PasswordContext = createContext();

// Global password for all protected projects
const GLOBAL_PASSWORD = 'portfolio2024';

export const usePassword = () => {
  const context = useContext(PasswordContext);
  if (!context) {
    throw new Error('usePassword must be used within a PasswordProvider');
  }
  return context;
};

export const PasswordProvider = ({ children }) => {
  const [isUnlocked, setIsUnlocked] = useState(() => {
    // Load from localStorage on initialization
    const saved = localStorage.getItem('portfolioUnlocked');
    return saved ? JSON.parse(saved) : false;
  });

  // Save to localStorage whenever unlock status changes
  useEffect(() => {
    localStorage.setItem('portfolioUnlocked', JSON.stringify(isUnlocked));
  }, [isUnlocked]);

  const unlockPortfolio = (password) => {
    if (password === GLOBAL_PASSWORD) {
      setIsUnlocked(true);
      return true;
    }
    return false;
  };

  const lockPortfolio = () => {
    setIsUnlocked(false);
  };

  const isProjectUnlocked = (projectId) => {
    return isUnlocked;
  };

  const verifyPassword = (password) => {
    return password === GLOBAL_PASSWORD;
  };

  const clearUnlock = () => {
    setIsUnlocked(false);
  };

  const value = {
    isUnlocked,
    unlockPortfolio,
    lockPortfolio,
    isProjectUnlocked,
    verifyPassword,
    clearUnlock
  };

  return (
    <PasswordContext.Provider value={value}>
      {children}
    </PasswordContext.Provider>
  );
}; 
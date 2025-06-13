const STORAGE_KEY = 'swarm_checkins_data';
const LAST_UPDATE_KEY = 'swarm_last_update';

export const getStoredData = () => {
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);
    const lastUpdate = localStorage.getItem(LAST_UPDATE_KEY);
    return {
      data: storedData ? JSON.parse(storedData) : null,
      lastUpdate: lastUpdate ? new Date(lastUpdate) : null
    };
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return { data: null, lastUpdate: null };
  }
};

export const storeData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    localStorage.setItem(LAST_UPDATE_KEY, new Date().toISOString());
  } catch (error) {
    console.error('Error writing to localStorage:', error);
  }
};

export const mergeCheckins = (existingCheckins, newCheckins) => {
  // Create a map of existing check-ins by their ID
  const checkinsMap = new Map();
  
  // Add existing check-ins to the map
  existingCheckins.forEach(checkin => {
    const key = `${checkin.venue.id}-${checkin.createdAt}`;
    checkinsMap.set(key, checkin);
  });
  
  // Add or update with new check-ins
  newCheckins.forEach(checkin => {
    const key = `${checkin.venue.id}-${checkin.createdAt}`;
    checkinsMap.set(key, checkin);
  });
  
  // Convert map back to array and sort by date
  return Array.from(checkinsMap.values())
    .sort((a, b) => b.createdAt - a.createdAt);
};

export const shouldUpdateData = (lastUpdate) => {
  if (!lastUpdate) return true;
  
  // Update if last update was more than 1 hour ago
  const oneHourAgo = new Date();
  oneHourAgo.setHours(oneHourAgo.getHours() - 1);
  
  return lastUpdate < oneHourAgo;
}; 
import axios from 'axios';
import { getStoredData, storeData, mergeCheckins, shouldUpdateData } from '../utils/swarmStorage';

const FOURSQUARE_API_URL = 'https://api.foursquare.com/v2';

export const calculateSwarmStats = (checkins) => {
  // Aggregate check-ins at the same location
  const aggregatedCheckins = checkins.reduce((acc, curr) => {
    const key = `${curr.venue.location.lat}-${curr.venue.location.lng}`;
    if (acc[key]) {
      acc[key].count++;
      acc[key].dates.push(new Date(curr.createdAt * 1000).toLocaleDateString());
    } else {
      acc[key] = {
        lat: curr.venue.location.lat,
        lng: curr.venue.location.lng,
        name: curr.venue.name,
        dates: [new Date(curr.createdAt * 1000).toLocaleDateString()],
        country: curr.venue.location.country || null,
        count: 1
      };
    }
    return acc;
  }, {});

  // Calculate distances and other stats
  const checkinsData = checkins.map(checkin => ({
    lat: checkin.venue.location.lat,
    lng: checkin.venue.location.lng,
    date: new Date(checkin.createdAt * 1000)
  }));

  // Haversine formula for distance calculation
  const haversine = (lat1, lon1, lat2, lon2) => {
    const toRad = x => x * Math.PI / 180;
    const R = 6371; // km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  let cumulativeDistance = 0;
  for (let i = 1; i < checkinsData.length; i++) {
    const prev = checkinsData[i-1];
    const curr = checkinsData[i];
    if (prev && curr) {
      cumulativeDistance += haversine(prev.lat, prev.lng, curr.lat, curr.lng);
    }
  }

  // Calculate time period
  const sorted = [...checkinsData].sort((a, b) => a.date - b.date);
  const firstYear = sorted[0].date.getFullYear();
  const lastYear = sorted[sorted.length - 1].date.getFullYear();
  const periodYears = firstYear === lastYear ? `${firstYear}` : `${firstYear}–${lastYear}`;
  const numYears = Math.max(1, lastYear - firstYear + 1);
  const meanDistancePerYear = cumulativeDistance / numYears;

  return {
    checkins: Object.values(aggregatedCheckins),
    stats: {
      totalCheckins: checkins.length,
      uniquePlaces: Object.keys(aggregatedCheckins).length,
      uniqueCountries: new Set(checkins.map(c => c.venue.location.country).filter(Boolean)).size,
      cumulativeDistance,
      periodYears,
      meanDistancePerYear
    }
  };
};

export const fetchSwarmData = async (accessToken, onProgress, onBatchProcessed) => {
  try {
    // Check for stored data
    const { data: storedData, lastUpdate } = getStoredData();
    let allCheckins = storedData?.checkins || [];
    let totalFetched = 0;
    let estimatedTotal = 0;

    // Only fetch new data if needed
    if (shouldUpdateData(lastUpdate)) {
      // First request to get total count
      const initialResponse = await axios.get(`${FOURSQUARE_API_URL}/users/self/checkins`, {
        params: {
          oauth_token: accessToken,
          v: '20240101',
          limit: 1
        }
      });
      
      estimatedTotal = initialResponse.data.response.checkins.count;
      onProgress?.(0, estimatedTotal);

      // Fetch new check-ins
      let offset = 0;
      const limit = 250;
      let hasMore = true;
      let newCheckins = [];

      while (hasMore) {
        const response = await axios.get(`${FOURSQUARE_API_URL}/users/self/checkins`, {
          params: {
            oauth_token: accessToken,
            v: '20240101',
            limit,
            offset
          }
        });

        const items = response.data.response.checkins.items;
        newCheckins = newCheckins.concat(items);
        totalFetched += items.length;
        
        // Report progress
        onProgress?.(totalFetched, estimatedTotal);

        if (items.length < limit) {
          hasMore = false;
        } else {
          offset += limit;
        }
      }

      // Merge new check-ins with existing ones
      allCheckins = mergeCheckins(allCheckins, newCheckins);
      
      // Store updated data
      storeData({ checkins: allCheckins });
    } else {
      // Use stored data
      totalFetched = allCheckins.length;
      estimatedTotal = allCheckins.length;
      onProgress?.(totalFetched, estimatedTotal);
    }

    // Process and report stats
    const stats = calculateSwarmStats(allCheckins);
    onBatchProcessed?.(stats);

    return stats;
  } catch (error) {
    console.error('Error fetching Swarm data:', error);
    throw error;
  }
}; 
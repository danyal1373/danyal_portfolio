import React, { useState, useEffect } from 'react';
import { Box, Typography, useTheme, Card, CardContent, Grid } from '@mui/material';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Leaflet with React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const SwarmMap = () => {
  const [checkins, setCheckins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchCheckins = async () => {
      try {
        const accessToken = process.env.REACT_APP_FOURSQUARE_ACCESS_TOKEN;
        // Debug: Log all REACT_APP_ environment variables
        console.log('REACT_APP_FOURSQUARE_ACCESS_TOKEN:', process.env.REACT_APP_FOURSQUARE_ACCESS_TOKEN);
        console.log('REACT_APP_FOURSQUARE_CLIENT_ID:', process.env.REACT_APP_FOURSQUARE_CLIENT_ID);
        console.log('REACT_APP_FOURSQUARE_CLIENT_SECRET:', process.env.REACT_APP_FOURSQUARE_CLIENT_SECRET);
        console.log('REACT_APP_TEST:', process.env.REACT_APP_TEST);
        if (!accessToken) {
          throw new Error('Foursquare access token is not configured. Please check your .env file.');
        }
        let allCheckins = [];
        let offset = 0;
        const limit = 250;
        let hasMore = true;
        while (hasMore) {
          const response = await fetch(
            `https://api.foursquare.com/v2/users/self/checkins?oauth_token=${accessToken}&v=20240101&limit=${limit}&offset=${offset}`
          );
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`API Error: ${response.status} - ${errorData.meta?.errorDetail || response.statusText}`);
          }
          const data = await response.json();
          if (!data.response?.checkins?.items) {
            throw new Error('Invalid API response format');
          }
          const items = data.response.checkins.items;
          allCheckins = allCheckins.concat(items);
          if (items.length < limit) {
            hasMore = false;
          } else {
            offset += limit;
          }
        }
        const checkinsData = allCheckins.map(checkin => ({
          lat: checkin.venue.location.lat,
          lng: checkin.venue.location.lng,
          name: checkin.venue.name,
          date: new Date(checkin.createdAt * 1000).toLocaleDateString(),
          country: checkin.venue.location.country || null,
          count: 1
        }));
        // Aggregate check-ins at the same location
        const aggregatedCheckins = checkinsData.reduce((acc, curr) => {
          const key = `${curr.lat}-${curr.lng}`;
          if (acc[key]) {
            acc[key].count++;
            acc[key].dates.push(curr.date);
          } else {
            acc[key] = {
              ...curr,
              dates: [curr.date]
            };
          }
          return acc;
        }, {});
        setCheckins(Object.values(aggregatedCheckins));
        // Save all checkins for dashboard stats
        setRawCheckins(checkinsData);
      } catch (err) {
        console.error('Error fetching check-ins:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCheckins();
  }, []);

  // Dashboard stats calculation
  const [rawCheckins, setRawCheckins] = useState([]);
  const totalCheckins = rawCheckins.length;
  const uniquePlaces = new Set(rawCheckins.map(c => `${c.lat},${c.lng}`)).size;
  const uniqueCountries = new Set(rawCheckins.map(c => c.country).filter(Boolean)).size;
  // Haversine formula for distance between two lat/lng points
  function haversine(lat1, lon1, lat2, lon2) {
    function toRad(x) { return x * Math.PI / 180; }
    const R = 6371; // km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }
  let cumulativeDistance = 0;
  for (let i = 1; i < rawCheckins.length; i++) {
    const prev = rawCheckins[i-1];
    const curr = rawCheckins[i];
    if (prev && curr) {
      cumulativeDistance += haversine(prev.lat, prev.lng, curr.lat, curr.lng);
    }
  }
  // Time period (years)
  let periodYears = '';
  let meanDistancePerYear = 0;
  if (rawCheckins.length > 0) {
    const sorted = [...rawCheckins].sort((a, b) => new Date(a.date) - new Date(b.date));
    const firstYear = new Date(sorted[0].date).getFullYear();
    const lastYear = new Date(sorted[sorted.length - 1].date).getFullYear();
    periodYears = firstYear === lastYear ? `${firstYear}` : `${firstYear}–${lastYear}`;
    const numYears = Math.max(1, lastYear - firstYear + 1);
    meanDistancePerYear = cumulativeDistance / numYears;
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
          Loading check-in map...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4, gap: 2 }}>
        <Typography variant="body2" sx={{ color: theme.palette.error.main }}>
          Error loading check-in map: {error}
        </Typography>
        <Box component="div" sx={{ color: theme.palette.text.secondary }}>
          <Typography variant="body2" component="div">
            Please make sure you have:
          </Typography>
          <ul style={{ margin: '8px 0', paddingLeft: '24px' }}>
            <li>Added your Foursquare access token to the .env file</li>
            <li>Enabled the "Check-ins" permission in your app settings</li>
            <li>Created a Foursquare app at https://developer.foursquare.com/</li>
          </ul>
        </Box>
      </Box>
    );
  }

  if (checkins.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
          No check-ins found. Make sure you have checked in to some places on Swarm.
        </Typography>
      </Box>
    );
  }

  // Dashboard UI
  return (
    <Box>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={2}>
          <Card sx={{ textAlign: 'center', bgcolor: theme.palette.background.paper }}>
            <CardContent>
              <Typography variant="h6">Total Check-ins</Typography>
              <Typography variant="h4">{totalCheckins}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card sx={{ textAlign: 'center', bgcolor: theme.palette.background.paper }}>
            <CardContent>
              <Typography variant="h6">Unique Places</Typography>
              <Typography variant="h4">{uniquePlaces}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card sx={{ textAlign: 'center', bgcolor: theme.palette.background.paper }}>
            <CardContent>
              <Typography variant="h6">Countries Visited</Typography>
              <Typography variant="h4">{uniqueCountries}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card sx={{ textAlign: 'center', bgcolor: theme.palette.background.paper }}>
            <CardContent>
              <Typography variant="h6">Distance Traveled</Typography>
              <Typography variant="h4">{cumulativeDistance.toLocaleString(undefined, { maximumFractionDigits: 0 })} km</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card sx={{ textAlign: 'center', bgcolor: theme.palette.background.paper }}>
            <CardContent>
              <Typography variant="h6">Time Period</Typography>
              <Typography variant="h4">{periodYears}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card sx={{ textAlign: 'center', bgcolor: theme.palette.background.paper }}>
            <CardContent>
              <Typography variant="h6">Mean Distance/Year</Typography>
              <Typography variant="h4">{meanDistancePerYear.toLocaleString(undefined, { maximumFractionDigits: 0 })} km</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box sx={{ height: '500px', width: '100%', borderRadius: theme.shape.borderRadius, overflow: 'hidden' }}>
        <MapContainer
          center={[0, 0]}
          zoom={2}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {checkins.map((checkin, index) => (
            <CircleMarker
              key={index}
              center={[checkin.lat, checkin.lng]}
              radius={Math.min(10 + checkin.count * 2, 30)}
              pathOptions={{
                color: theme.palette.primary.main,
                fillColor: theme.palette.primary.main,
                fillOpacity: 0.6
              }}
            >
              <Popup>
                <Box sx={{ p: 1 }}>
                  <Typography variant="subtitle2">{checkin.name}</Typography>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                    Visited {checkin.count} times
                  </Typography>
                  <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                    Last visit: {checkin.dates[checkin.dates.length - 1]}
                  </Typography>
                </Box>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </Box>
    </Box>
  );
};

export default SwarmMap; 
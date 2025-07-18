import React, { useState, useEffect } from 'react';
import { Box, Typography, useTheme, Card, CardContent, Grid, CircularProgress, LinearProgress } from '@mui/material';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { fetchSwarmData } from '../api/swarm';
import { useGlassmorphism } from '../hooks/useGlassmorphism';

// Fix for default marker icons in Leaflet with React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const SwarmMap = () => {
  const [checkins, setCheckins] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [totalCheckins, setTotalCheckins] = useState(0);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setProgress(0);

        const accessToken = process.env.REACT_APP_FOURSQUARE_ACCESS_TOKEN;
        
        // Debug: Log environment variables (only in development)
        if (process.env.NODE_ENV === 'development') {
          console.log('Environment variables:', {
            hasToken: !!accessToken,
            tokenLength: accessToken?.length,
            nodeEnv: process.env.NODE_ENV
          });
        }

        if (!accessToken) {
          throw new Error('Foursquare access token not found in environment variables. Please check your .env file.');
        }

        const { checkins: checkinsData, stats: statsData } = await fetchSwarmData(
          accessToken,
          (fetched, total) => {
            setProgress(Math.round((fetched / total) * 100));
            setTotalCheckins(total);
          },
          (batchStats) => {
            setCheckins(batchStats.checkins);
            setStats(batchStats.stats);
          }
        );
        
        setCheckins(checkinsData);
        setStats(statsData);
      } catch (err) {
        console.error('Error fetching check-ins:', err);
        let errorMessage = err.message;
        
        // Handle specific error cases
        if (err.response) {
          switch (err.response.status) {
            case 403:
              errorMessage = 'Authentication failed. Your Foursquare access token may be invalid or expired.';
              break;
            case 401:
              errorMessage = 'Unauthorized. Please check your Foursquare access token.';
              break;
            case 429:
              errorMessage = 'Rate limit exceeded. Please try again later.';
              break;
            default:
              errorMessage = `API Error (${err.response.status}): ${err.response.data?.meta?.errorDetail || err.message}`;
          }
        }
        
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const renderStats = () => {
    if (!stats) return null;
    return (
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[{
          label: 'Total Check-ins', value: stats.totalCheckins
        }, {
          label: 'Unique Places', value: stats.uniquePlaces
        }, {
          label: 'Countries Visited', value: stats.uniqueCountries
        }, {
          label: 'Distance Traveled', value: stats.cumulativeDistance.toLocaleString(undefined, { maximumFractionDigits: 0 }) + ' km'
        }, {
          label: 'Time Period', value: stats.periodYears
        }, {
          label: 'Mean Distance/Year', value: stats.meanDistancePerYear.toLocaleString(undefined, { maximumFractionDigits: 0 }) + ' km'
        }].map((item, i) => (
          <Grid item xs={12} sm={6} md={2} key={item.label}>
            <Card sx={{
              ...glassmorphism.base,
              ...glassmorphism.withHighlights,
              ...glassmorphism.hover,
              ...noisyBackgroundStyle,
              borderRadius: theme.shape.borderRadius,
              boxShadow: 0,
              width: '100%',
              height: 140,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              p: 2,
            }}>
              <CardContent sx={{ p: 0, width: '100%' }}>
                <Typography variant="h5" sx={{ color: theme.palette.text.secondary, fontWeight: theme.typography.body1.fontWeight, mb: 1.5, textAlign: 'center' }}>
                  {item.label}
                </Typography>
                <Typography variant="h4" sx={{ color: theme.palette.text.primary, textAlign: 'center' }}>
                  {item.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  };

  const renderMap = () => {
    if (checkins.length === 0) return null;

    return (
      <Box sx={{ height: '500px', width: '100%', borderRadius: theme.shape.borderRadius, overflow: 'hidden' }}>
        <MapContainer
          center={[0, 0]}
          zoom={2}
          style={{ height: '100%', width: '100%' }}
        >
          {theme.palette.mode === 'dark' ? (
            <TileLayer
              url="https://tiles.stadiamaps.com/tiles/alidade_dark/{z}/{x}/{y}{r}.png"
              attribution="&copy; <a href='https://stadiamaps.com/'>Stadia Maps</a>, &copy; <a href='https://openmaptiles.org/'>OpenMapTiles</a> &copy; <a href='http://openstreetmap.org'>OpenStreetMap</a> contributors"
            />
          ) : (
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
          )}
          {checkins.map((checkin, index) => (
            <CircleMarker
              key={index}
              center={[checkin.lat, checkin.lng]}
              radius={1}
              pathOptions={{
                color: theme.palette.primary.main,
                fillColor: theme.palette.primary.main,
                fillOpacity: 1
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
    );
  };

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
            <li>Created a Foursquare app at https://developer.foursquare.com/</li>
            <li>Added your Foursquare access token to the .env file as REACT_APP_FOURSQUARE_ACCESS_TOKEN</li>
            <li>Enabled the "Check-ins" permission in your app settings</li>
            <li>Generated a new access token if your current one is expired</li>
          </ul>
          <Typography variant="body2" sx={{ mt: 2 }}>
            To get a new access token:
          </Typography>
          <ol style={{ margin: '8px 0', paddingLeft: '24px' }}>
            <li>Go to https://developer.foursquare.com/</li>
            <li>Sign in and go to your app settings</li>
            <li>Under "OAuth 2.0", generate a new access token</li>
            <li>Copy the token and add it to your .env file</li>
          </ol>
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      {loading && (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4, gap: 2, position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1000, bgcolor: 'rgba(0,0,0,0.7)' }}>
          <CircularProgress size={40} />
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
            Loading check-in data... {progress}%
          </Typography>
          <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
            Fetched {Math.round((progress / 100) * totalCheckins)} of {totalCheckins} check-ins
          </Typography>
          <Box sx={{ width: '100%', maxWidth: 400 }}>
            <LinearProgress variant="determinate" value={progress} />
          </Box>
        </Box>
      )}
      
      {renderStats()}
      {renderMap()}
    </Box>
  );
};

export default SwarmMap; 

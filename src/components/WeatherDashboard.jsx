import React, { useState, useEffect } from 'react';
import {
  TextField,
  Typography,
  Autocomplete,
  CircularProgress,
  Card,
  CardContent,
  Grid,
  Box,
  Paper,
} from '@mui/material';
import { LocationOn, WbSunny, Opacity, Air } from '@mui/icons-material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const WeatherDashboard = () => {
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = 'f5f9b9076f07418ad3b292a87a1e27cc'; // Replace with your OpenWeather API key

  useEffect(() => {
    // Apply global background image styling
    document.body.style.backgroundImage = "url('../assets/THM-7CEBLL4VVV_page-0001.jpg')";
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.margin = '0';
    document.body.style.padding = '0';

    return () => {
      // Clean up styles when the component unmounts
      document.body.style.backgroundImage = '';
      document.body.style.backgroundSize = '';
      document.body.style.backgroundPosition = '';
      document.body.style.backgroundRepeat = '';
    };
  }, []);

  const fetchCitySuggestions = async (input) => {
    if (input.length < 3) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=${API_KEY}`
      );
      const data = await response.json();
      setSuggestions(
        data.map((city) => ({
          label: `${city.name}, ${city.country}`,
          lat: city.lat,
          lon: city.lon,
        }))
      );
    } catch (err) {
      console.error('Error fetching suggestions:', err);
    }
  };

  const fetchWeather = async (lat, lon) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) throw new Error('City not found');

      const data = await response.json();
      const processedData = data.list.map((item) => ({
        time: new Date(item.dt * 1000).toLocaleTimeString('en-US', {
          weekday: 'short',
          hour: 'numeric',
        }),
        temp: Math.round(item.main.temp),
        humidity: item.main.humidity,
        windSpeed: Math.round(item.wind.speed),
      }));

      setWeatherData({
        current: data.list[0],
        forecast: processedData,
      });
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 3,
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Overlay for better readability
        backdropFilter: 'blur(5px)', // Optional blur effect
      }}
    >
      <Card elevation={3} sx={{ width: '100%', maxWidth: 800 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom sx={{ color: '#1976d2', mb: 3 }}>
            Weather Dashboard
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Autocomplete
              freeSolo
              options={suggestions}
              getOptionLabel={(option) =>
                typeof option === 'string' ? option : option.label
              }
              onInputChange={(_, value) => fetchCitySuggestions(value)}
              onChange={(_, value) => {
                if (value && value.lat) fetchWeather(value.lat, value.lon);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search for a city"
                  variant="outlined"
                  fullWidth
                  error={!!error}
                  helperText={error}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: <LocationOn color="action" sx={{ mr: 1 }} />,
                    endAdornment: (
                      <>
                        {loading ? <CircularProgress size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />
          </Box>

          {weatherData && (
            <>
              <Grid container spacing={2} sx={{ mb: 4 }}>
                <Grid item xs={12} md={4}>
                  <Paper elevation={2} sx={{ p: 2 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <WbSunny sx={{ fontSize: 40, color: '#ff9800' }} />
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="h4">
                          {Math.round(weatherData.current.main.temp)}°C
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Temperature
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Paper elevation={2} sx={{ p: 2 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Opacity sx={{ fontSize: 40, color: '#2196f3' }} />
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="h4">
                          {weatherData.current.main.humidity}%
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Humidity
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Paper elevation={2} sx={{ p: 2 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Air sx={{ fontSize: 40, color: '#757575' }} />
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="h4">
                          {Math.round(weatherData.current.wind.speed)} m/s
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Wind Speed
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>

              <Paper elevation={2} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Temperature Trend
                </Typography>
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weatherData.forecast}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                      <XAxis
                        dataKey="time"
                        tick={{ fontSize: 12 }}
                        interval={4}
                      />
                      <YAxis
                        tick={{ fontSize: 12 }}
                        label={{
                          value: 'Temperature (°C)',
                          angle: -90,
                          position: 'insideLeft',
                        }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          border: 'none',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="temp"
                        stroke="#1976d2"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </Paper>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default WeatherDashboard;

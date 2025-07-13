import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import axios from 'axios';
import Redis from 'ioredis';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Redis client
const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

app.use(morgan('dev'));
app.use(express.json());

const AMADEUS_AUTH_URL = 'https://test.api.amadeus.com/v1/security/oauth2/token';
const AMADEUS_BASE = 'https://test.api.amadeus.com/v2';

let amadeusToken = null;
let tokenExpires = 0;

async function getAmadeusToken() {
  if (amadeusToken && Date.now() < tokenExpires) return amadeusToken;
  const { data } = await axios.post(AMADEUS_AUTH_URL, new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: process.env.AMADEUS_CLIENT_ID,
    client_secret: process.env.AMADEUS_CLIENT_SECRET
  }));
  amadeusToken = data.access_token;
  tokenExpires = Date.now() + data.expires_in * 1000;
  return amadeusToken;
}

// Hotels endpoint with caching
app.get('/api/amadeus/hotels', async (req, res, next) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) return res.status(400).json({ error: 'lat and lon required' });
  const cacheKey = `hotels:${lat}:${lon}`;

  try {
    const cached = await redis.get(cacheKey);
    if (cached) return res.json(JSON.parse(cached));

    const token = await getAmadeusToken();
    const hotelResp = await axios.get(`${AMADEUS_BASE}/shopping/hotel-offers`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { latitude: lat, longitude: lon, radius: 20 }
    });

    await redis.set(cacheKey, JSON.stringify(hotelResp.data), 'EX', 600);
    res.json(hotelResp.data);
  } catch (err) {
    next(err);
  }
});

// Booking endpoint
app.post('/api/amadeus/book', async (req, res, next) => {
  const token = await getAmadeusToken();
  try {
    const { offerId, guests, payments } = req.body;
    const { data } = await axios.post(`${AMADEUS_BASE}/booking/hotel-bookings`,
      { data: { offerId, guests, payments } },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    res.json(data);
  } catch (err) {
    next(err);
  }
});

// Weather endpoint
app.get('/api/weather', async (req, res, next) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) return res.status(400).json({ error: 'lat and lon required' });
  try {
    const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        lat,
        lon,
        units: 'metric',
        appid: process.env.OPENWEATHER_KEY
      }
    });
    res.json(data);
  } catch (err) {
    next(err);
  }
});

// Aurora endpoint (placeholder API)
app.get('/api/aurora', async (req, res, next) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) return res.status(400).json({ error: 'lat and lon required' });
  try {
    const { data } = await axios.get('https://api.aurora.com/forecast', {
      params: { lat, lon, apiKey: process.env.AURORA_KEY }
    });
    res.json(data);
  } catch (err) {
    next(err);
  }
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));

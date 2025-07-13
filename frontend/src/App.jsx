import React, { useState } from 'react';
import Map from './Map';
import HotelList from './HotelList';
import BookingForm from './BookingForm';
import axios from 'axios';

export default function App() {
  const [hotels, setHotels] = useState([]);
  const [selected, setSelected] = useState(null);
  const [coords, setCoords] = useState({ lat: 0, lon: 0 });

  async function searchHotels() {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/amadeus/hotels`, { params: coords });
    setHotels(data.data || []);
  }

  return (
    <div>
      <h1>Hotel Search</h1>
      <input placeholder="lat" value={coords.lat} onChange={e => setCoords({ ...coords, lat: e.target.value })} />
      <input placeholder="lon" value={coords.lon} onChange={e => setCoords({ ...coords, lon: e.target.value })} />
      <button onClick={searchHotels}>Search</button>
      <Map hotels={hotels} selected={selected} onSelect={setSelected} />
      <HotelList hotels={hotels} onSelect={setSelected} />
      {selected && <BookingForm offer={selected} />}
    </div>
  );
}

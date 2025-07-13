import React, { useState } from 'react';
import axios from 'axios';

export default function BookingForm({ offer }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);

  async function submit() {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/amadeus/book`, {
        offerId: offer.offers[0].id,
        guests: [{ name, email }],
        payments: []
      });
      setStatus('Success: ' + data.id);
    } catch (err) {
      setStatus('Error booking');
    }
  }

  return (
    <div>
      <h3>Book {offer.hotel.name}</h3>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <button onClick={submit}>Book</button>
      {status && <p>{status}</p>}
    </div>
  );
}

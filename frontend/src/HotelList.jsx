import React from 'react';

export default function HotelList({ hotels, onSelect }) {
  return (
    <ul>
      {hotels.map(h => (
        <li key={h.hotel.hotelId} onClick={() => onSelect(h)}>
          {h.hotel.name} - {h.offers[0].price.total} {h.offers[0].price.currency}
        </li>
      ))}
    </ul>
  );
}

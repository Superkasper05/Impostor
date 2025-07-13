import React from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';

export default function Map({ hotels, selected, onSelect }) {
  const [viewState, setViewState] = React.useState({ latitude: 0, longitude: 0, zoom: 4 });

  // TODO: color markers based on weather and aurora activity
  return (
    <ReactMapGL
      {...viewState}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onMove={evt => setViewState(evt.viewState)}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      style={{ width: '100%', height: '400px' }}
    >
      {hotels.map(hotel => (
        <Marker key={hotel.hotel.hotelId} latitude={hotel.hotel.latitude} longitude={hotel.hotel.longitude} onClick={() => onSelect(hotel)} />
      ))}
      {selected && (
        <Popup latitude={selected.hotel.latitude} longitude={selected.hotel.longitude} onClose={() => onSelect(null)}>
          <strong>{selected.hotel.name}</strong>
          <p>{selected.offers[0].price.total} {selected.offers[0].price.currency}</p>
        </Popup>
      )}
    </ReactMapGL>
  );
}

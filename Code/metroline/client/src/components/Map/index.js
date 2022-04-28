import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import center from '../../constants';
import './index.css';

const Map = () => {
  var location = center;
  var options = {
    center: location,
    zoom: 13,
  };
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((loc) => {
      location.lat = loc.coords.latitude;
      location.lng = loc.coords.longitude;
    });
  }
  return (
    <MapContainer
      className='metroline-map'
      center={options.center}
      zoom={13}
      scrollWheelZoom={true}>
      <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
    </MapContainer>
  );
};

export default Map;

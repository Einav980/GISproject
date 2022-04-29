import L from 'leaflet';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from 'react-leaflet';
import center from '../../constants';
import lines from '../../leafletData/MetroLines/linesData.json';
import features from '../../leafletData/MetroStations/data.json';
import { useState } from 'react';
import './index.css';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

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
      scrollWheelZoom={true}
      style={{ width: '100vw', height: '100vh' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />

      {features.features.map((station) => (
        <Marker
          position={[
            station.geometry.coordinates[1],
            station.geometry.coordinates[0],
          ]}></Marker>
      ))}

      {/* {lines.features.map(line => (
        <Polyline>
          key = {line.properties.DESCRPTION}
          position = {line.geometry.coordinates}
        </Polyline>
      ))} */}
    </MapContainer>
  );
};

export default Map;

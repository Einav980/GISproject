import L, { latLng } from 'leaflet';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  Circle,
} from 'react-leaflet';
import center from '../../constants';
import { useEffect, useState } from 'react';
import './index.css';
import axios from 'axios';
import { getLineIcon } from '../Icons';
import { colors } from '../../constants';

const Map = () => {
  const [stations, setStations] = useState([]);
  const [lines, setLines] = useState([]);

  useEffect(() => {
    if (!stations.length) {
      axios.get(`http://localhost:5000/api/stations`).then((res) => {
        setStations(res.data);
      });
    }
    if (!lines.length) {
      axios.get(`http://localhost:5000/api/lines`).then((res) => {
        setLines(res.data);
      });
    }
  });

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

      {stations.map((station) => {
        const line = station.properties.LINE.toLowerCase();
        return (
          <Marker
            position={[
              station.geometry.coordinates[1],
              station.geometry.coordinates[0],
            ]}
            eventHandlers={{
              click: (e) => {
                console.log(e.target);
              },
            }}
            icon={getLineIcon(line)}>
            <Popup>
              <p id='popup-style'>
                Line: {station.properties.LINE}
                <br />
                {station.properties.NAME}
                <br />
                {station.properties.NAMEENG}
              </p>
            </Popup>
          </Marker>
        );
      })}

      {lines.map((line) => (
        <Polyline
          key={line.properties.DESCRPTION}
          color={colors[line.properties.NAME]}
          weight={8}
          positions={[line.geometry.coordinates]}></Polyline>
      ))}
      {lines.map((line) => {
        <Circle
          center={latLng(0, 0)}
          radius={300}
          fillColor={'#000000'}></Circle>;
      })}
    </MapContainer>
  );
};

export default Map;

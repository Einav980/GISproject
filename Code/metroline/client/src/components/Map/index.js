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
import { useEffect, useState } from 'react';
import './index.css';
import axios from 'axios';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const Map = () => {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    if (!stations.length) {
      axios.get(`http://localhost:5000/api/stations`).then((res) => {
        setStations(res.data);
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

      {stations.map((station) => (
        <Marker
          position={[
            station.geometry.coordinates[1],
            station.geometry.coordinates[0],
          ]}>
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
      ))}

      {lines.features.map((line) => (
        <Polyline
          key={line.properties.DESCRPTION}
          positions={[line.geometry.coordinates]}></Polyline>
      ))}
    </MapContainer>
  );
};

export default Map;

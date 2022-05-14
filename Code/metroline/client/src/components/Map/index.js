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
import { getLineIcon, getStationIcon } from '../Icons';
import { colors } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { setStations } from '../../redux/reducers/mapReducer';

const Map = () => {
  const [lines, setLines] = useState([]);
  const { stations } = useSelector((state) => state.map);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!stations.length) {
      axios.get(`http://localhost:5000/api/stations`).then((res) => {
        dispatch(setStations(res.data));
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
            key={station.properties.MASAD}
            position={[
              station.geometry.coordinates[1],
              station.geometry.coordinates[0],
            ]}
            eventHandlers={{
              click: (e) => {
                console.log(e.target);
              },
            }}
            icon={getStationIcon(station)}>
            <Popup>
              <p id='popup-style'>
                Line: {station.properties.LINE}
                <br />
                {station.properties.NAME}
                <br />
                {station.properties.NAMEENG}
                <br />
                {station.properties.MASAD}
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
      {/* <RoutingMachine /> */}
    </MapContainer>
  );
};

export default Map;

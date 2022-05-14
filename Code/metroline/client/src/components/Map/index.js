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

import { popupContent, popupHead, popupText, lineText, lineColor, getLineColor } from "./popupStyles";


const Map = () => {
  const [lines, setLines] = useState([]);
  const { stations } = useSelector((state) => state.map);
  const { selectedStations } = useSelector((state) => state.map);
  var mapStations = stations;
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
  if (selectedStations.length) {
    mapStations = selectedStations;
  } else {
    mapStations = stations;
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

      {mapStations.map((station) => {
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
              },
            }}
            icon={getStationIcon(station)}>
            <Popup>
              <div style={popupContent}>
                <img
                  src=""
                  width="150"
                  height="150"
                />
                <div className="m-2" style={popupHead}></div>
                <div style={{ backgroundColor: colors[station.properties.LINE] }}>
                  <span style={popupText} >
                    {station.properties.NAME}
                  </span>
                  <div className="m-2" style={lineText}>
                    {station.properties.LINE} :קו
                  </div>
                </div>
              </div>
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
    </MapContainer>
  );
};

export default Map;

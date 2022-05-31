import L, { latLng, map } from 'leaflet';
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
import {
  getStationImage,
  getStationIcon,
  getUserIcon,
  getImgLogo,
} from '../Icons';
import { colors } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { setStations } from '../../redux/reducers/mapReducer';
import ImageLogo from '../ImageLogo';

import { popupContent, popupText, popupImg } from './popupStyles';
import { render } from 'react-dom';

const Map = () => {
  const [lines, setLines] = useState([]);
  const { stations } = useSelector((state) => state.map);
  const { selectedStations, routeStartStation, routeEndStation } = useSelector(
    (state) => state.map
  );
  var mapStations = stations;
  var isSearch = false;
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
    isSearch = true;
  } else {
    mapStations = stations;
    isSearch = false;
  }

  return (
    <MapContainer
      className='metroline-map'
      center={options.center}
      zoom={13}
      scrollWheel={true}
      style={{ width: '100vw', height: '100vh' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        img={ImageLogo}
      />

      <Marker
        position={[options.center.lat, options.center.lng]}
        icon={getUserIcon()}>
        <Popup>
          <p id='popup-style'>
            המיקום שלי
            <br />
          </p>
        </Popup>
      </Marker>

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
              click: (e) => {},
            }}
            icon={getStationIcon(
              station,
              isSearch,
              routeStartStation,
              routeEndStation
            )}>
            <Popup>
              <div style={popupContent}>
                <div style={popupImg}>
                  <img
                    src={getStationImage(line)}
                    width='120'
                    height='120'
                    alt='station'
                  />
                </div>
                <div
                  style={{
                    backgroundColor: colors[station.properties.LINE],
                    position: 'fixed',
                    left: '0',
                    right: '0',
                    bottom: '0px',
                    top: '107px',
                    padding: '5px',
                    borderRadius: '10%',
                  }}>
                  <div style={popupText}>
                    {station.properties.NAME} <br></br>
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
          weight={5}
          positions={[line.geometry.coordinates]}></Polyline>
      ))}
    </MapContainer>
  );
};

export default Map;

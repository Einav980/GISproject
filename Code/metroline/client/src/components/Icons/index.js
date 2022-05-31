import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

const m1Icon = new L.Icon({
  iconRetinaUrl: require('../../assets/marker/metroline-icon-x2-m1.png'),
  iconUrl: require('../../assets/marker/metroline-icon-m1.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const m2Icon = new L.Icon({
  iconRetinaUrl: require('../../assets/marker/metroline-icon-x2-m2.png'),
  iconUrl: require('../../assets/marker/metroline-icon-m2.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const m3Icon = new L.Icon({
  iconRetinaUrl: require('../../assets/marker/metroline-icon-x2-m3.png'),
  iconUrl: require('../../assets/marker/metroline-icon-m3.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const defaultIcon = new L.Icon({
  iconRetinaUrl: require('../../assets/marker/matroline-icon-station-x2-selected.png'),
  iconUrl: require('../../assets/marker/matroline-icon-station-selected.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const startIcon = new L.Icon({
  iconRetinaUrl: require('../../assets/marker/pin.png'),
  iconUrl: require('../../assets/marker/pin.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const destinationIcon = new L.Icon({
  iconRetinaUrl: require('../../assets/marker/destination.png'),
  iconUrl: require('../../assets/marker/destination.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const m1StationLogo = require('../../assets/marker/Metroline-Logo-m1.png');
const m2StationLogo = require('../../assets/marker/Metroline-Logo-m2.png');
const m3StationLogo = require('../../assets/marker/Metroline-Logo-m3.png');

const stationImages = {
  m1: m1StationLogo,
  m2: m2StationLogo,
  m3: m3StationLogo,
};

const icons = {
  m1: m1Icon,
  m2: m2Icon,
  m3: m3Icon,
  start: startIcon,
  end: destinationIcon,
  default: defaultIcon
};

export const getLineIcon = (line) => {
  return icons[line];
};

export const getUserIcon = () => {
  return icons['default'];
};

export const getStationImage = (line) => {
  return stationImages[line];
};

export const getStationIcon = (station, isSearch, routeStartStation, routeEndStation) => {
  if (isSearch) {
    if (station.properties.MASAD == routeStartStation.properties.MASAD) {
      return icons["start"];
    }
    else if (station.properties.MASAD == routeEndStation.properties.MASAD) {
      return icons["end"];
    }
  }
  const line = station.properties.LINE.toLowerCase();
  return icons[line];
};




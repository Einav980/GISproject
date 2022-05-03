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

const icons = {
  m1: m1Icon,
  m2: m2Icon,
  m3: m3Icon,
};

export const getLineIcon = (line) => {
  return icons[line];
};

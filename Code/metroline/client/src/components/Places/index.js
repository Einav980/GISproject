import { useLoadScript } from '@react-google-maps/api';

export default function Places() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API,
    libraries: ['places'],
  });
  if (!isLoaded) return <div> Loading... </div>;
}

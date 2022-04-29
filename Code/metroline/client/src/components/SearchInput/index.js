import './index.css';
import { Button, Input } from '@mui/material';
import { Search, GpsFixed } from '@mui/icons-material';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import { useLoadScript } from '@react-google-maps/api';
import { useState } from 'react';
import Map from '../../components/Map';
const SearchInput = () => {
  const { selected, setSelected } = useState(null);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API,
    libraries: ['places'],
  });
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <div className='places-container'>
        <PlacesAutocomplete setSelected={setSelected} />
      </div>
      <Map />
    </>
  );
};

const PlacesAutocomplete = ({ setSelected }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();
};
export default SearchInput;

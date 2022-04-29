import 'leaflet/dist/leaflet.css';
import { render } from 'react-dom';
import './App.css';
import Map from './components/Map';
import React, { useState } from 'react';
import Places from './components/Places';
import SearchRoute from './components/SearchRoute';
import SearchInput from './components/SearchInput';
import PlacesAutocomplete from 'react-places-autocomplete';

function App() {
  const [address, setAddress] = useState('');
  const handleSelect = async (value) => {};
  return (
    <>
      <SearchRoute />
      <Map />
    </>
  );
}

export default App;

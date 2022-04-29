import 'leaflet/dist/leaflet.css';
import { render } from 'react-dom';
import './App.css';
import Map from './components/Map';
import React from 'react';
import Places from './components/Places';
import SearchRoute from './components/SearchRoute';
import SearchInput from './components/SearchInput';

function App() {
  return (
    <>
      <SearchRoute />
      <Map />
    </>
  );
}

export default App;

import 'leaflet/dist/leaflet.css';
import './App.css';
import Map from './components/Map';
import React, { useState } from 'react';
import SearchRoute from './components/SearchRoute';

function App() {
  return (
    <>
      <SearchRoute />
      <Map />
    </>
  );
}

export default App;

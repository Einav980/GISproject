import 'leaflet/dist/leaflet.css';
import './App.css';
import Map from './components/Map';
import React, { useState } from 'react';
import SearchRoute from './components/SearchRoute';
import SearchResult from './components/SearchResults';
import ImageLogo from './components/ImageLogo';


function App() {
  return (
    <>
      <ImageLogo/>
      <SearchRoute/>
      <SearchResult/>
      <Map/> 
    </>
  );
}

export default App;

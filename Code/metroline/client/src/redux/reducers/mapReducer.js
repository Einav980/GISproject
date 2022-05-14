import { createSlice } from '@reduxjs/toolkit';

const mapInitialState = {
  routeStartLocation: {
    lat: 0.0,
    lng: 0.0,
  },
  routeEndLocation: {
    lat: 0.0,
    lng: 0.0,
  },
  routeStartStation: {},
  routeEndStation: {},
  routeStations: [],
  stations: [],
};

export const mapSlice = createSlice({
  name: 'map',
  initialState: mapInitialState,
  reducers: {
    setRouteStartLocation: (state, { payload }) => {
      state.routeStartLocation = payload;
    },
    setRouteEndLocation: (state, { payload }) => {
      state.routeEndLocation = payload;
    },
    setStations: (state, { payload }) => {
      state.stations = payload;
    },
    setStartStation: (state, { payload }) => {
      state.routeStartStation = payload;
    },
    setEndStation: (state, { payload }) => {
      state.routeEndStation = payload;
    },
    setStationSelected: (state, { payload }) => {
      console.log('Payload', payload);
      state.stations
        .filter((station) => payload.includes(station.properties.MASAD))
        .forEach((station) => (station.selected = true));
    },
    clearSelectedStations: (state) => {
      state.stations.forEach((station) => (station.selected = false));
    },
  },
});

export const {
  setRouteStartLocation,
  setRouteEndLocation,
  setStations,
  setStartStation,
  setEndStation,
  setStationSelected,
  clearSelectedStations,
} = mapSlice.actions;

export default mapSlice.reducer;

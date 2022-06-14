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
  routeStartStation: null,
  routeEndStation: null,
  stations: [],
  selectedStations: [],
  routeStartAddress: '',
  routeEndAddress: '',
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
      state.selectedStations = payload.map(
        (masad) =>
          state.stations.filter(
            (station) => station.properties.MASAD === masad
          )[0]
      );
      // state.selectedStations = state.stations.filter((station) =>
      //   payload.includes(station.properties.MASAD)
      // );
    },
    clearSelectedStations: (state) => {
      state.selectedStations = [];
    },
    setRouteStartAddress: (state, { payload }) => {
      state.routeStartAddress = payload;
    },
    setRouteEndAddress: (state, { payload }) => {
      state.routeEndAddress = payload;
    },
    clearRouteEndLocation: (state) => {
      state.routeEndLocation = mapInitialState.routeEndLocation;
    },
    clearRouteStartLocation: (state) => {
      state.routeStartLocation = mapInitialState.routeStartLocation;
    },
    clearRouteStartAddress: (state) => {
      state.routeStartAddress = mapInitialState.routeStartAddress;
    },
    clearRouteEndAddress: (state) => {
      state.routeEndAddress = mapInitialState.routeEndAddress;
    },
    clearRouteStartStation: (state) => {
      state.routeStartStation = mapInitialState.routeStartStation;
    },
    clearRouteEndStation: (state) => {
      state.routeEndStation = mapInitialState.routeEndStation;
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
  setRouteStartAddress,
  setRouteEndAddress,
  clearRouteEndAddress,
  clearRouteEndLocation,
  clearRouteEndStation,
  clearRouteStartAddress,
  clearRouteStartLocation,
  clearRouteStartStation,
} = mapSlice.actions;

export default mapSlice.reducer;

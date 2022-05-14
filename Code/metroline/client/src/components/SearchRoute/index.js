import './index.css';
import strings from '../../constants/strings';
import { Grid, Typography, IconButton, Button } from '@mui/material';
import { CleanHands, Clear, ClearAll, Search, SwapVert } from '@mui/icons-material';
import SearchInput from '../SearchInput';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { searchRoute } from '../SearchLogic';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearSelectedStations,
  setEndStation,
  setStartStation,
  setStationSelected,
  setRouteStartAddress,
  setRouteEndAddress,
  setRouteStartLocation,
  setRouteEndLocation,
} from '../../redux/reducers/mapReducer';

const SearchRoute = () => {
  const dispatch = useDispatch();

  const {
    routeStartLocation,
    routeEndLocation,
    stations,
    routeStartAddress,
    routeEndAddress,
    routeStartStation,
    routeEndStation,
  } = useSelector((state) => state.map);

  const swapDirections = (event) => {
    swapLocations();
    swapStations();
    swapAddresses();
  };

  const swapLocations = () => {
    const temp = routeStartLocation;
    dispatch(setRouteStartLocation(routeEndLocation));
    dispatch(setRouteEndLocation(temp));
  };

  const clearSearch = () => {
    dispatch(clearSelectedStations());
  };

  const swapStations = () => {
    const temp = routeStartStation;
    dispatch(setStartStation(routeEndStation));
    dispatch(setEndStation(temp));
  };

  const swapAddresses = () => {
    const temp = routeStartAddress;
    dispatch(setRouteStartAddress(routeEndAddress));
    dispatch(setRouteEndAddress(temp));
  };

  const handleSearch = () => {
    const { lat: routeStartLat, lng: routeStartLng } = routeStartLocation;
    const { lat: routeEndLat, lng: routeEndLng } = routeEndLocation;
    const nearestStart = getNearestStation(routeStartLat, routeStartLng);
    const nearestEnd = getNearestStation(routeEndLat, routeEndLng);

    dispatch(setStartStation(nearestStart));
    dispatch(setEndStation(nearestEnd));

    const { MASAD: startStationMasad } = nearestStart.properties;
    const { MASAD: endStationMasad } = nearestEnd.properties;
    const routeStations = searchRoute(startStationMasad, endStationMasad);
    dispatch(clearSelectedStations());
    dispatch(setStationSelected(routeStations));
  };

  const getNearestStation = (lat, lng) => {
    if (stations.length) {
      var nearestStation = 1;
      var distance = Number.MAX_VALUE;
      stations.forEach((station) => {
        const stationLat = station.geometry.coordinates[1];
        const stationLng = station.geometry.coordinates[0];
        const calculatedDistance = getDistanceFromLatLonInKm(
          lat,
          lng,
          stationLat,
          stationLng
        );
        if (distance > calculatedDistance) {
          distance = calculatedDistance;
          nearestStation = station;
        }
      });
      return nearestStation;
    }
  };

  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  };

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  return (
    <div className='search-route-div'>
      <Grid
        container
        direction='column'
        className='search-route-grid'
        padding='10px'>
        <Grid
          item
          xs={2}
          container
          alignItems='center'
          justifyContent={'center'}>
          <Typography align='center' fontSize='18px' fontWeight='bold'>
            {strings.SEARCH_ROUTE_TITLE}
          </Typography>
        </Grid>
        <Grid item xs={6} container>
          <Grid item xs={10}>
            <Grid item xs={12} padding={'5px'}>
              <SearchInput
                placeholder='בחרו נקודת התחלה'
                direction='rtl'
                isStart={true}
              />
            </Grid>
            <Grid item xs={12} padding={'5px'}>
              <SearchInput placeholder='בחרו נקודת סיום' direction='rtl' />
            </Grid>
          </Grid>
          <Grid
            item
            xs={2}
            container
            alignItems='center'
            justifyContent='center'>
            <IconButton aria-label='swap' size='small' onClick={swapDirections}>
              <SwapVert fontSize='large' />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item xs={3} container justifyContent='center' alignItems='center' gap={'30px'} >
        <Button
            variant='contained'
            startIcon={<Clear />}
            dir='ltr'
            onClick={clearSearch}>
            נקה חיפוש
          </Button>
          <Button
            variant='contained'
            startIcon={<Search />}
            dir='ltr'
            onClick={handleSearch}>
            חפש
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default SearchRoute;

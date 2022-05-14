import './index.css';
import { Button, Input } from '@mui/material';
import { Search, GpsFixed } from '@mui/icons-material';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setRouteStartLocation,
  setRouteEndLocation,
  setRouteStartAddress,
  setRouteEndAddress,
} from '../../redux/reducers/mapReducer';

const SearchInput = (props) => {
  const [address, setAddress] = useState('');
  const { routeStartAddress, routeEndAddress } = useSelector(
    (state) => state.map
  );
  const dispatch = useDispatch();
  const placeHolderText = props.placeholder;

  const handleSelect = async (value) => {
    var lat = 0;
    var lng = 0;
    if (value) {
      await geocodeByAddress(value).then((response) => {
        lat = response[0].geometry.location.lat();
        lng = response[0].geometry.location.lng();
      });

      if (props.isStart) {
        dispatch(setRouteStartLocation({ lat: lat, lng: lng }));
        dispatch(setRouteStartAddress(address));
      } else {
        dispatch(setRouteEndLocation({ lat: lat, lng: lng }));
        dispatch(setRouteEndAddress(address));
      }
    }
  };
  return (
    <div>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}>
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <TextField
              className='search-route-text-field'
              label={props.label}
              variant='filled'
              dir={props.direction}
              fullWidth
              InputProps={{
                endAdornment: (
                  <Button>
                    <Search />
                  </Button>
                ),
              }}
              {...getInputProps({ placeholder: placeHolderText })}
            />
            {loading ? <div> loading...</div> : null}
            {suggestions.map((suggestion) => {
              const style = suggestion.active
                ? {
                    backgroundColor: 'rgba(8,255,200,1)',
                    cursor: 'pointer',
                  }
                : { backgroundColor: 'white', cursor: 'pointer' };
              return (
                <div
                  className='input-suggestion'
                  {...getSuggestionItemProps(suggestion, { style })}>
                  {suggestion.description}
                </div>
              );
            })}
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
};

export default SearchInput;

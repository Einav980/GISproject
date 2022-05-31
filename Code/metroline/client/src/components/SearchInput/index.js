import './index.css';
import { Search } from '@mui/icons-material';
import PlacesAutocomplete, {
  geocodeByAddress,
} from 'react-places-autocomplete';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import {
  setRouteStartLocation,
  setRouteEndLocation,
  setRouteStartAddress,
  setRouteEndAddress,
} from '../../redux/reducers/mapReducer';

const SearchInput = (props) => {
  const { value, onChange } = props;
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
        dispatch(setRouteStartAddress(routeStartAddress));
      } else {
        dispatch(setRouteEndLocation({ lat: lat, lng: lng }));
        dispatch(setRouteEndAddress(routeEndAddress));
      }
    }
  };
  return (
    <div>
      <PlacesAutocomplete
        value={value}
        onChange={onChange}
        onSelect={handleSelect}>
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <div>
              <TextField
                className='search-route-text-field'
                label={props.label}
                variant='filled'
                dir={props.direction}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <p style={{ padding: '0px 0px 0px 10px', margin: '0px' }}>
                      <Search />
                    </p>
                  ),
                }}
                {...getInputProps({
                  placeholder: placeHolderText,
                })}
              />
            </div>
            <div
              style={{
                position: 'fixed',
                zIndex: 100,
                right: '15px',
                width: '400px',
                top: '255px',
                borderRadius: '10px',
              }}>
              {loading ? <div> loading...</div> : null}
              {suggestions.map((suggestion) => {
                const style = suggestion.active
                  ? {
                      backgroundColor: '#1976d2',
                      cursor: 'pointer',
                      color: 'white',
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
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
};

export default SearchInput;

import './index.css';
import { Button, Input } from '@mui/material';
import { Search, GpsFixed } from '@mui/icons-material';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

const SearchInput = (props) => {
  const [address, setAddress] = useState('');
  const placeHolderText = props.placeholder;
  const handleSelect = async (value) => {
    const result = await geocodeByAddress(value);
    console.log(result);
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
              label='התחלה'
              variant='filled'
              {...getInputProps({ placeholder: placeHolderText })}
            />
            <div>
              {loading ? <div> loading...</div> : null}
              {suggestions.map((suggestion) => {
                const style = {
                  backgroundColor: suggestion.active
                    ? 'rgba(8,255,200,1)'
                    : 'white',
                };
                return (
                  <div {...getSuggestionItemProps(suggestion, { style })}>
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

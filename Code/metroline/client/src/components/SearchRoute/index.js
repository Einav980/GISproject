import './index.css';
import strings from '../../constants/strings';
import { TextField, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';
import SearchInput from '../SearchInput';

const SearchRoute = () => {
  return (
    <div className='search-route-div'>
      <div className='search-route-header'>
        <h2 className='search-route-title'>{strings.SEARCH_ROUTE_TITLE}</h2>
      </div>
      <div className='search-route-body'>
        <SearchInput placeholder='Type address...' />
        {/* <TextField
          className='search-route-text-field'
          placeholder='Test'
          id='filled-hidden-label-small'
          defaultValue='Small'
          variant='filled'
          size='small'
        /> */}
      </div>
      <div className='search-route-bottom'>
        <h2>End</h2>
      </div>
    </div>
  );
};

export default SearchRoute;

import './index.css';
import strings from '../../constants/strings';
import {
  TextField,
  InputAdornment,
  Grid,
  Paper,
  Typography,
  IconButton,
  Button,
} from '@mui/material';
import { Search, SwapVert } from '@mui/icons-material';
import SearchInput from '../SearchInput';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const SearchRoute = () => {
  const [startLocation, setStartLocation] = useState();
  const [endLocation, setEndLocation] = useState();

  const swapDirections = (event) => {
    const temp = startLocation;
    setStartLocation(endLocation);
    setEndLocation(temp);
  };

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
              <SearchInput placeholder='בחרו נקודת התחלה' direction='rtl' />
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
            <IconButton aria-label='swap' size='small'>
              <SwapVert fontSize='large' />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item xs={3} container justifyContent='center' alignItems='center'>
          <Button
            variant='contained'
            startIcon={<Search />}
            dir='ltr'
            onClick={swapDirections}>
            חפש
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default SearchRoute;

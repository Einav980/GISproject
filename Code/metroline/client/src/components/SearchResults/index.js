import './index.css';
import strings from '../../constants/strings';
import { Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import CircleIcon from '@mui/icons-material/Circle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import SwapHorizOutlinedIcon from '@mui/icons-material/SwapHorizOutlined';

const SearchResult = () => {
  const { selectedStations } = useSelector((state) => state.map);
  if (selectedStations.length) {
    return (
      <div className='search-result-div'>
        <Grid
          container
          direction='column'
          className='search-result-grid'
          padding='10px'>
          <Grid
            item
            xs={2}
            container
            alignItems='center'
            justifyContent={'center'}>
            <Typography align='center' fontSize='18px' fontWeight='bold'>
              {strings.SEARCH_RESULT_TITLE}
            </Typography>
          </Grid>
          <Grid
            style={{ overflowX: 'hidden' }}
            xs={10}
            item
            container
            className='search-result-body'
            overflow={'scroll'}>
            {selectedStations.map((station, i, arr) => {
              var stationType = '';
              if (i === 0) {
                stationType = 'start';
              } else if (i === arr.length - 1) {
                stationType = 'end';
              } else {
                stationType = 'mid';
              }
              if (i < arr.length - 1) {
                if (station.properties.LINE !== arr[i + 1].properties.LINE) {
                  stationType = 'swap';
                }
              }
              return (
                <Grid item xs={12} container>
                  <Grid
                    item
                    xs={2}
                    container
                    direction={'column'}
                    alignContent='center'>
                    <Grid item xs={6}>
                      {stationType === 'start' && (
                        <CircleIcon fontSize='small' />
                      )}
                      {stationType === 'mid' && (
                        <CircleOutlinedIcon fontSize='small' />
                      )}
                      {stationType === 'end' && (
                        <FmdGoodIcon fontSize='small' />
                      )}
                      {stationType === 'swap' && (
                        <SwapHorizOutlinedIcon fontSize='small' />
                      )}
                    </Grid>
                    <Grid item xs={6}>
                      {stationType !== 'end' && (
                        <MoreVertIcon fontSize='small' />
                      )}
                    </Grid>
                  </Grid>
                  <Grid item xs={5}>
                    <span>{station.properties.NAME}</span>
                  </Grid>
                  <Grid item xs={5}>
                    <span>קו: {station.properties.LINE}</span>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </div>
    );
  }
  return null;
};

export default SearchResult;

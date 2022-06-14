import './index.css';
import strings from '../../constants/strings';
import { Grid, Typography, IconButton, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';


const SearchResult = () => {
  const dispatch = useDispatch();

  const {
    selectedStations,
  } = useSelector((state) => state.map);

  console.log(selectedStations["properties"])

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
          <Grid item xs={9} container className='search-result-body'>
            <div className='search-result-body'>
              <table>
                <thead>
                  <tr>
                    <th>שם תחנה</th>
                    <th>קו תחנה</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedStations.map((selectedStation) => (
                    <tr>
                      <td>{selectedStation.properties.NAME}</td>
                      <td>{selectedStation.properties.LINE}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
  return null
};

export default SearchResult;

import 'leaflet/dist/leaflet.css';
import { render } from 'react-dom';
import './App.css';
import Map from './components/Map';
import { AppBar } from '@mui/material';

function App() {
  return (
    <div>
      <AppBar position='static'>
        {/* <Toolbar variant='dense'>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' color='inherit' component='div'>
            Photos
          </Typography>
        </Toolbar> */}
      </AppBar>
      <Map />;
    </div>
  );
}

export default App;

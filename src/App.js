import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import './App.css';
import Map from './components/map/Map';
import InfoPanel from './components/infopanel/InfoPanel';
import MapToolbar from './components/maptoolbar/MapToolbar';
import MapProvider from './contexts/MapProvider';
import Legend from './components/legend/Legend';
import LegendDetails from './components/legend/LegendDetails';

const useStyles = makeStyles((theme) => ({
  paper: {
    height: 'calc(100vh - 64px)',
    display: 'flex',
    paddingBottom: '100px',
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
}));

function App() {
  const classes = useStyles();
  return (
    <>
    <CssBaseline />
    <MapProvider >
      <Paper square className={classes.paper}>
      <Map name="map" />
      <InfoPanel />
      </Paper>
      <AppBar position="fixed" color="primary" className={classes.appBar}>
      <MapToolbar />
      </AppBar>
      <Legend><LegendDetails /></Legend>
    </MapProvider>
    </>
  );
}

export default App;

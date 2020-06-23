import React, { useContext } from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import LayerButton from './LayerButton';
import ProviderLayerSwitch from './ProviderLayerSwitch';
import tract from '../../geojson/tract.json';
import county from '../../geojson/county.json';
import cousub from '../../geojson/cousub.json';
import MapContext from '../../contexts/MapContext';
import FeatureLayerConfig from '../../config/FeatureLayerConfig';
import FeatureSelection from './FeatureSelection';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  grow: {
    flexGrow: 1,
  },
}));

const geographies = [
    {label: 'TRACT', id: 'tracts', payload: tract},
    {label: 'COMMUNITY', id: 'cousub', payload: cousub},
    {label: 'COUNTY', id: 'county', payload: county},
];

export default function MapToolbar() {
  const classes = useStyles();
  const mapContext = useContext(MapContext);

  const layers = geographies.map( (layer) => (
          <LayerButton layer={layer} key={layer.id} />
        ));
  return (
    <Toolbar>
    <ButtonGroup color="default" variant="contained"
      aria-label="contained primary button group" >
        { layers }
    </ButtonGroup>
    <div className={classes.grow} />
    <FeatureSelection />
      <div className={classes.grow} />
    <ProviderLayerSwitch/>
    </Toolbar>
  );
}
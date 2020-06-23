import React, { useRef, useEffect, useContext, useState } from 'react';
import MapContext from '../../contexts/MapContext';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/MenuItem';
import FeatureLayerConfig from '../../config/FeatureLayerConfig';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    formControl: {
      background: '#DDDDDD',
      minWidth: '300px',
      paddingLeft: '10px',
      flexGrow: 1
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

export default function FeatureSelection({ layer, ...other }){
    const classes = useStyles();
    const mapContext = useContext(MapContext);
    const [metric, setMetric] = useState(0);

    const handleChange = (e) => {
        setMetric(e.target.value);
        mapContext.setActiveMetric(FeatureLayerConfig.features[e.target.value]);
    }

    return (
          <Select
            className={classes.formControl}
            variant='standard'
            color="secondary"
            value={metric}
            onChange={handleChange}
          >
            {
                FeatureLayerConfig.features.map( (v, i) => (
                    <option value={i} key={i}>{v.displayName}</option>
                ))
            }
          </Select>
      );
}
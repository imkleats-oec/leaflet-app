import React, { useState, useRef, useEffect, useContext } from 'react';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import L from 'leaflet';
import {MarkerClusterGroup} from 'leaflet.markercluster';
import MapContext from '../../contexts/MapContext';
import providers from '../../geojson/providers.json';

export default function ProviderLayerSwitch() {
  const [checked, setChecked] = useState(false);
  const providerLayerRef = useRef(null);
  const clusterLayerRef = useRef(null);
  const mapContext = useContext(MapContext);

  useEffect(() => {
    if (mapContext.state.mapInit){
        clusterLayerRef.current = L.markerClusterGroup();
        providerLayerRef.current = L.geoJSON(providers, {
            onEachFeature: function (feature, layer) {
                layer.on('click', (e) => mapContext.setSelectProvider(e.target.feature.properties))
            }
        });
        clusterLayerRef.current.addLayer(providerLayerRef.current);
    }
  }, [mapContext.state.mapInit])

  const toggleChecked = () => {
    toggleProviderLayer();
    setChecked((prev) => !prev);
  };

  const toggleProviderLayer = () => {
    if (!checked) {
        mapContext.state.mapRef.current.addLayer(clusterLayerRef.current);
    } else {
        mapContext.state.mapRef.current.removeLayer(clusterLayerRef.current);
    }
  };
  
  return (
      <FormControlLabel
        control={<Switch checked={checked} onChange={toggleChecked} />}
        label="View Providers on Map"
      />
  );
}
import React, { useEffect, useContext } from 'react';
import './Map.css';
import MapContext from '../../contexts/MapContext';
import { useLeafletMap } from '../../hooks/LeafletHooks';
import Legend from '../legend/Legend';
import LegendDetails from '../legend/LegendDetails';

function Map(props) {
    // const setMarkerPos = useLeaflet();
    const mapContext = useContext(MapContext);
    const [mapRef, legendRef] = useLeafletMap(props.name);

    useEffect(() => {
        console.log("Map initializing: Should run once")
        mapContext.setState({
            ...mapContext.state, 
            mapRef,
            legendRef,
            mapInit: true,
         });
    }, []);

    return (
        <div id={props.name} />
    )
}

export default Map;
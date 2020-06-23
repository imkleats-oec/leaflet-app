import React, { useEffect, useState, useRef } from 'react';
import MapContext from './MapContext';
import L from 'leaflet';
import FeatureLayerConfig from '../config/FeatureLayerConfig';

export default function MapProvider(props) {
    
    const layerRef = useRef(null);
    const legendRef = useRef(null);
    const [markerPos] = useState([39.6, -105.8]);
    const [state, setState] = useState({mapInit: false})
    const [mouseOver, setMouseOver] = useState(null);
    const [selectLayer, setSelectLayer] = useState(null);
    const [selectProvider, setSelectProvider] = useState(null);
    const [activeMetric, setActiveMetric] = useState(FeatureLayerConfig.features[0]);

    const value = {
        state,
        setState,
        mouseOver,
        setMouseOver,
        selectLayer,
        setSelectLayer, 
        selectProvider, 
        setSelectProvider,
        activeMetric, 
        setActiveMetric
    };

    // Initialize base layer
    /*
    useEffect(() => {
        if (state.mapInit){
            setState({
                ...state,
                activeMetric: FeatureLayerConfig.features[0]
            })
        }
    }, [state.mapInit]);*/

    return (
        <MapContext.Provider value={value}>
            { props.children }
        </MapContext.Provider>
    );
}
import React, { useRef, useContext, useEffect} from 'react';
import ReactDOM from 'react-dom';
import L from 'leaflet';
import MapContext from '../../contexts/MapContext';

export default function Legend(props) {
    const ctrlRoot = document.getElementById('mapLegend');
    const mapContext = useContext(MapContext);

    if (ctrlRoot) {
        return ReactDOM.createPortal(
            props.children,
            ctrlRoot
        );
    }
    return null;
}
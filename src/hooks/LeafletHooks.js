import {useEffect, useRef, useState} from 'react';
import L from 'leaflet';

function useLeafletMap(mapId){
    const mapRef = useRef(null);
    const legendRef = useRef(null)

    useEffect(() => {
        console.log("Running useLeafletMap inner useEffect")
        mapRef.current = L.map(mapId, {
            center: [39.0, -105.0],
            zoom: 7,
            layers: [
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; OpenStreetMap contributors'
                }),
            ]
        });
        legendRef.current = L.control({position: 'bottomright'});

        legendRef.current .onAdd = function (map) {
            const div = L.DomUtil.create('div', 'info legend');
            div.id = "mapLegend";
            //div.innerHtml = "Hello";
            return div;
        };

        mapRef.current.addControl(legendRef.current);
    }, []);

    return [mapRef, legendRef];
}

function useLeafletLayer(){
    const layerRef = useRef(null);
    useEffect(() => {
        layerRef.current = L.layerGroup();
    }, []);

    return layerRef;
}

function useLeafletLayerGroup(mapConfig){
    const layerGroupRef = useRef(null);
    useEffect(() => {
        layerGroupRef.current = L.layerGroup();
    }, []);

    return layerGroupRef;
}

function useLeafletMarker(layerGroupRef) {
    const [markerPos, setMarkerPos] = useState([39.6, -105.8]);
    const marker = useRef(null)
    useEffect(
        () => {
            marker.current = L.marker(markerPos);
            marker.current.addTo(layerGroupRef.current);
            
        }, [markerPos]
    );

    return setMarkerPos;
}

export {
    useLeafletMap,
    useLeafletLayerGroup,
    useLeafletMarker
}
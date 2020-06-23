import React, { useRef, useEffect, useContext } from 'react';
import L from 'leaflet';
import Button from '@material-ui/core/Button';
import MapContext from '../../contexts/MapContext';
import {style as LeafletStyle, initOnChange, useLeafletStyle as leafletStyle} from '../../config/LeafletUtility';

export default function LayerButton({ layer, ...other }){
    const layerRef = useRef(null);
    const mapContext = useContext(MapContext);
    const isActive = mapContext.state?.activeGeoId === layer.id;
    let style;
    useEffect(() => {
        if (mapContext.activeMetric) {
            const prev_inited = layerRef.current ? true : false;
            if (prev_inited) {
                layerRef.current.remove();

            }
            style = leafletStyle(mapContext.activeMetric);
            //let geojson;
            function highlightFeature(e) {
                var layer = e.target;
            
                layer.setStyle({
                    weight: 2,
                    color: '#666',
                    dashArray: '',
                    fillOpacity: 0.7
                });
                mapContext.setMouseOver(layer.feature.properties);
            
                if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                    layer.bringToFront();
                }
            }
            function resetHighlight(e) {
                if (layerRef?.current?.resetStyle) {
                    layerRef.current.resetStyle(e.target)
                };
            }
            function zoomToFeature(e) {
                // mapContext.state.mapRef.current.fitBounds(e.target.getBounds());
                //console.log(e.target);
                mapContext.setSelectLayer(e.target.feature.properties);
            }
            function onEachFeature(feature, layer) {
                layer.on({
                    mouseover: highlightFeature,
                    mouseout: resetHighlight,
                    click: zoomToFeature
                });
            }
            layerRef.current = L.geoJSON(layer.payload, {
                style: style,
                onEachFeature: onEachFeature,
            });
            if (prev_inited && isActive) layerRef.current.addTo(mapContext.state.mapRef.current);
            //layerRef.current = geojson;
        }
    }, [mapContext.activeMetric])

    return mapContext.activeMetric ? (
        <Button 
            {...other}
            color={ isActive ? "secondary" : "default"}
            onClick={ () => {
                if (mapContext.state.activeLayer && 
                    mapContext.state.activeLayer.current) {
                    mapContext.state.activeLayer.current.remove();
                }
                if (!isActive) {
                    mapContext.setState({
                        ...mapContext.state,
                        activeLayer: layerRef,
                        activeGeoId: layer.id
                    });
                    //layerRef.current.setStyle(style);
                    layerRef.current.addTo(mapContext.state.mapRef.current);
                } else {
                    mapContext.setState({
                        ...mapContext.state,
                        activeLayer: null,
                        activeGeoId: ''
                    });
                }
            } }>
        {layer.label}
        </Button>
      ) : (
        <Button 
            {...other}
            color="default" disabled >
        {layer.label}
        </Button>
      );
}
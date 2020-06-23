import React, { useContext, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import './Controls.css';
import GeoDashboard from '../dashboard/GeographicDashboard';
import MapContext from '../../contexts/MapContext';
import { Paper } from '@material-ui/core';

function InfoPanel({ mapInitialized }) {
    const mapContext = useContext(MapContext);
    return (
        <Paper component="div" className="controlPanel">
            <GeoDashboard />
            <Button onClick={() => mapContext.state.mapRef.current.zoomIn()}>
                Click Me.
            </Button>
            {
                mapContext.state.mapInit ? (
                    <p>Loaded!</p>
                ) : (<p>Loading...</p>)
            }
        </Paper>
    )
}

export default Controls;
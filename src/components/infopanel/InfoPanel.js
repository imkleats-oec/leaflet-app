import React, { useContext, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import './Controls.css';
import GeoDashboard from '../dashboard/GeographicDashboard';
import MapContext from '../../contexts/MapContext';
import { Paper } from '@material-ui/core';
import ProviderDetailDashboard from '../dashboard/ProviderDashboard';

export default function InfoPanel({ mapInitialized }) {
    const mapContext = useContext(MapContext);
    return (
        <Paper component="div" className="controlPanel">
            <GeoDashboard />{/*
            <Button color="primary" variant="contained" onClick={() => {
                mapContext.state.mapRef.current.zoomIn();
                console.log(mapContext.selectProvider);
            }}>
                Click Me.
        </Button>*/}
            <ProviderDetailDashboard />
        </Paper>
    )
}
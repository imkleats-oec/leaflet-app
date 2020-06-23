import React, { useContext, useEffect } from 'react';
import MapContext from '../../contexts/MapContext';
import { Paper, makeStyles } from '@material-ui/core';
import { useLeafletLegend } from '../../config/LeafletUtility';

function getColor(d) {
    return d > 1000 ? '#800026' :
           d > 500  ? '#BD0026' :
           d > 200  ? '#E31A1C' :
           d > 100  ? '#FC4E2A' :
           d > 50   ? '#FD8D3C' :
           d > 20   ? '#FEB24C' :
           d > 10   ? '#FED976' :
                      '#FFEDA0'; // []
}

function colorBrewer(d, scale, palette) {
    return scale.reduce((acc, v, idx) => {
        acc = d > v ? palette[idx] : acc;
        return acc;
    }, '#666666')
}

const useStyles = makeStyles({
    legend: {
        lineHeight: '18px',
        textAlign: 'center',
        maxWidth: '200px',
        color: '#555',
        display: 'flex',
        flexDirection: 'column',
        '& i': {
            width: '18px',
            height: '18px',
            float: 'left',
            marginRight: '8px',
            opacity: 0.7,
        }
    },
    info: {
        padding: '6px 8px',
        font: '14px/16px Arial, Helvetica, sans-serif',
        background: 'white',
        background: 'rgba(255,255,255,0.8)',
        boxShadow: '0 0 15px rgba(0,0,0,0.2)',
        borderRadius: '5px',
        '& h4': {
            margin: '0 0 5px',
            color: '#777',
        }
    },
});

export default function LegendDetails(){
    const classes = useStyles();
    const mapContext = useContext(MapContext);
    let legend = useLeafletLegend(mapContext.activeMetric);
    /*
    useEffect(() => {
        mapContext.setState({
            ...mapContext.state,
            legendTest: false,
        })
    },[]);*/
    return (
        <Paper className={`${classes.info} ${classes.legend}`} >
        <h4>{mapContext.activeMetric?.displayName}</h4>
        { legend }
        </Paper>
    );
}
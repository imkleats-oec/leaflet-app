import React from 'react';
import L from 'leaflet';

export function getColor(d) {
    return d > 4.5 ? '#800026' :
           d > 4.0  ? '#BD0026' :
           d > 3.5  ? '#E31A1C' :
           d > 3.0  ? '#FC4E2A' :
           d > 2.5   ? '#FD8D3C' :
           d > 2.0   ? '#FEB24C' :
           d > 1.0   ? '#FED976' :
                      '#FFEDA0';
}

function colorBrewer(d, scale, palette) {
    return scale.reduce((acc, v, idx) => {
        const color = palette[idx]
        //console.log("Pre", acc);
        acc = (idx === 0 ? d >= v : d > v) ?
            `rgba(${Math.floor(color[0])},${Math.floor(color[1])},${Math.floor(color[2])},1)` : 
            acc;
        //console.log("Post", acc);
        return acc;
    }, '#888888')
}

function colorBlend(a, b){ //, opacity) {  
    var src_r = a[0];
    var src_g = a[1];
    var src_b = a[2];
    var src_a = a[3]; // 0.5; 
    // if(src_a == 0) continue; //don't draw if src color is fully transparent. This also prevents a divide by zero if both src_a and dst_a are 0.

    var dst_r = b[0];
    var dst_g = b[1];
    var dst_b = b[2];
    var dst_a = b[3]; //1 // (b & 0x000000ff) / 255;
    //Blending formula lines! All lines are now correct.

    //we need to calculate the final alpha first.
    var final_a = 1 - (1 - dst_a) * (1 - src_a);
    var final_r = ((src_r * src_a) + (dst_r * dst_a * (1 - src_a))) / final_a;
    var final_g = ((src_g * src_a) + (dst_g * dst_a * (1 - src_a))) / final_a;
    var final_b = ((src_b * src_a) + (dst_b * dst_a * (1 - src_a))) / final_a;
    return `rgba(${Math.floor(final_r)},${Math.floor(final_g)},${Math.floor(final_b)},${Math.round(final_a*100)/100})`;
}

var orangepalette_hex = [
    [0xff, 0xed, 0xa0, 0.50],
    [0xfe, 0xd9, 0x76, 0.53],
    [0xfe, 0xb2, 0x4c, 0.56],
    [0xFD, 0x8D, 0x3C, 0.60], 
    [0xFC, 0x4E, 0x2A, 0.64], 
    [0xE3, 0x1A, 0x1C, 0.68], 
    [0xBD, 0x00, 0x26, 0.72], 
    [0x80, 0x00, 0x26, 0.75],
];
var bluepalette_hex = [
    [0xf7, 0xfb, 0xff, 0.50], 
    [0xde, 0xeb, 0xf7, 0.53], 
    [0xc6, 0xdb, 0xef, 0.56], 
    [0x9e, 0xca, 0xe1, 0.60],
    [0x6b, 0xae, 0xd6, 0.64], 
    [0x42, 0x92, 0xc6, 0.68], 
    [0x21, 0x71, 0xb5, 0.72], 
    [0x08, 0x45, 0x94, 0.75],
];
var greenpalette_hex = [
[0xf7, 0xfc, 0xf5, 0.50],
[0xe5, 0xf5, 0xe0, 0.53],
[0xc7, 0xe9, 0xc0, 0.56],
[0xa1, 0xd9, 0x9b, 0.60],
[0x74, 0xc4, 0x76, 0.64],
[0x41, 0xab, 0x5d, 0.68],
[0x23, 0x8b, 0x45, 0.72],
[0x00, 0x5a, 0x32, 0.75],
]
var redpalette_hex = [
    [0xff, 0xf5, 0xf0, 0.50], 
    [0xfe, 0xe0, 0xd2, 0.53], 
    [0xfc, 0xbb, 0xa1, 0.56], 
    [0xfc, 0x92, 0x72, 0.60],
    [0xfb, 0x6a, 0x4a, 0.64], 
    [0xef, 0x3b, 0x2c, 0.68], 
    [0xcb, 0x18, 0x1d, 0.72], 
    [0x99, 0x00, 0x0d, 0.75],
];

const defaultScale = [1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5];
const defaultColors = greenpalette_hex;

export function useLeafletStyle(activeMetric){
    console.log("Logging useLeafletStyle: ", activeMetric);
    if (!activeMetric) {
        return function(feature) {
            return {
                fillColor: colorBrewer(feature.properties.wQRIS, defaultScale, defaultColors),
                weight: 1,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.7
            }
        }
    }
    
    return function(feature) {
        const myColor = activeMetric.kind === 'two' ?
            colorBlend(
                colorBrewer(
                feature.properties[
                    activeMetric.metric[0].featureId
                ], 
                activeMetric.metric[0].scale,
                activeMetric.metric[0].colors,
                ),
                colorBrewer(
                feature.properties[
                    activeMetric.metric[1].featureId
                ], 
                activeMetric.metric[1].scale,
                activeMetric.metric[1].colors,
                )
            ) :
            colorBrewer(
                feature.properties[activeMetric.metric[0].featureId], 
                activeMetric.metric[0].scale,
                activeMetric.metric[0].colors,
            );

        return {
            fillColor: myColor,
            weight: 1,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.8
        }
    }
}

export function useLeafletLegend(activeMetric) {
    if (!activeMetric) return;
    let palette;
    if (activeMetric.kind === 'two') {
        const scale_y = activeMetric.metric[0].scale;
        const colors_y = activeMetric.metric[0].colors;
        const scale_x = activeMetric.metric[1].scale;
        const colors_x = activeMetric.metric[1].colors;

        palette = scale_y.map((y, idy, a) => {
            //console.log(colorBrewer(grades[idx] + 1, grades, colors))
            //getColor(grades[idx] + 1)
            const nextIdy = idy < a.length - 1 ? idy + 1 : idy;
            const nextLevely = nextIdy == idy ? 0.01 : 0.01*(a[nextIdy] - y);
            const color_y = colorBrewer(y + nextLevely, scale_y, colors_y);

            const row = scale_x.map((x, idx, b) => {
                const nextIdx = idx < b.length - 1 ? idx + 1 : idx;
                const nextLevelx = nextIdx == idx ? 0.01 : 0.01*(b[nextIdx] - x);
                const color_x = colorBrewer(x + nextLevelx, scale_x, colors_x);
                return (
                    <div className="colorSwatch" style={{background: colorBlend(color_x, color_y)}} />
                )
            });
            return (
            <div className="colorRow" style={{display: 'flex', flexDirection: 'row'}}>
            {row}
            </div>
            );
        });
    } else {
        const scale = activeMetric.metric[0].scale;
        const colors = activeMetric.metric[0].colors;
        palette = scale.map((v, idx, a) => {
            //console.log(colorBrewer(grades[idx] + 1, grades, colors))
            //getColor(grades[idx] + 1)
            const nextIdx = idx < a.length - 1 ? idx + 1 : idx;
            const nextLevel = nextIdx == idx ? 0.01 : 0.01*(scale[nextIdx] - v);
            return (
            <div key={v}>
            <i style={{background: colorBrewer(v + nextLevel, scale, colors)}} /> 
            {`${v}${ nextIdx > idx ? ` \u2013 ${a[nextIdx]}` : ' +' }`}
            </div>
            )
        });
    }
    return palette;
}

export function style(feature) {
    return {
        fillColor: colorBrewer(feature.properties.wQRIS, defaultScale, defaultColors),
        weight: 1,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

export function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 2,
        color: '#666', //0x08, 0x45, 0x94, 0.75 #666
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}

export function initOnChange(leafletMap, cb) {

    function zoomToFeature(e) {
        leafletMap.fitBounds(e.target.getBounds());
    }
    
    function resetHighlight(e) {
        const thisLayer = cb();
        thisLayer.resetStyle(e.target);
    }
    return function onEachFeature(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: zoomToFeature
        });
    }
}

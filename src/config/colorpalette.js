function getColorBrew(d, p) {
	return d > 1000 ? p[7] :
			d > 500  ? p[6] :
			d > 200  ? p[5] :
			d > 100  ? p[4] :
			d > 50   ? p[3] :
			d > 20   ? p[2] :
			d > 10   ? p[1] :
						p[0];
}

var orangepalette = [
    '#FFEDA0', '#FED976', '#FEB24C', '#FD8D3C',
    '#FC4E2A','#E31A1C', '#BD0026', '#800026',
];
var bluepalette = [
    '#f7fbff', '#deebf7', '#c6dbef', '#9ecae1',
    '#6baed6', '#4292c6', '#2171b5', '#084594'
];
var redpalette = [
    '#fff5f0', '#fee0d2', '#fcbba1', '#fc9272',
    '#fb6a4a', '#ef3b2c', '#cb181d', '#99000d',
];

// Hex is 0xRedRedGrnGrnBluBluOpaOpa
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

function blendColor(a, b){ //, opacity) {  
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

function drawColorPalette() {
    var paletteDiv = document.createElement("div"),
        xDiv = document.createElement("div"),
		grades = [0, 10, 20, 50, 100, 200, 500, 1000],
        redlabels = [],
        redFrom, redTo, blueFrom, blueTo;

    paletteDiv.id = 'myPalette';
    paletteDiv.className = 'palette';
    xDiv.id = 'x-axis-palette';
    xDiv.className = 'palette-bar';

	for (var i = 0; i < grades.length; i++) {
		redFrom = grades[i];
        redTo = grades[i + 1];
        var redrow = [];
        for (var j = 0; j < grades.length; j++) {
            blueFrom = grades[j];
            blueTo = grades[j+1];
            var blendedRGBA = blendColor(getColorBrew(blueFrom + 1, bluepalette_hex), getColorBrew(redFrom + 1, redpalette_hex), 1);
            redrow.push(
                `<div class="palette-item" style="background:${blendedRGBA};color:${blendedRGBA}"></div> `
            );
        }
        redlabels.push(['<div class="palette-row">','</div>'].join(redrow.join('')));
	}

	xDiv.innerHTML = redlabels.join('\n');
    paletteDiv.appendChild(xDiv);
    document.getElementById('map-legend-details').appendChild(paletteDiv);
    //document.getElementsByTagName('body')[0].appendChild(paletteDiv);
};

function drawBlendedColorPalette() {
    var paletteDiv = document.createElement("div"),
        xDiv = document.createElement("div"),
        yDiv = document.createElement("div"),
		grades = [0, 10, 20, 50, 100, 200, 500, 1000],
        redlabels = [],
        bluelabels = [],
        from, to;

    paletteDiv.id = 'myBlendedPalette';
    paletteDiv.className = 'palette';
    xDiv.id = 'x-axis-palette';
    xDiv.className = 'palette-bar';

	for (var i = 0; i < grades.length; i++) {
		redFrom = grades[i];
        redTo = grades[i + 1];
        var redrow = [];
        var bluerow = [];
        for (var j = 0; j < grades.length; j++) {
            blueFrom = grades[j];
            blueTo = grades[j+1];

            redrow.push(
                '<span class="palette-item" style="background:' + getColorBrew(redFrom + 1, redpalette) + ';color:' + getColorBrew(redFrom + 1, redpalette) + '">+</span> '
            );
        }
        redlabels.push(redrow.join(''));
	}

	xDiv.innerHTML = redlabels.join('<br />');
	paletteDiv.appendChild(xDiv);
    document.getElementsByTagName('body')[0].appendChild(paletteDiv);
};

drawColorPalette();
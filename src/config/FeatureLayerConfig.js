const KIND = {
    ONE: 'one',
    TWO: 'two'
}

const COLORS = {
    ORANGE: [
        [0xff, 0xed, 0xa0, 0.50],
        [0xfe, 0xd9, 0x76, 0.53],
        [0xfe, 0xb2, 0x4c, 0.56],
        [0xFD, 0x8D, 0x3C, 0.60], 
        [0xFC, 0x4E, 0x2A, 0.64], 
        [0xE3, 0x1A, 0x1C, 0.68], 
        [0xBD, 0x00, 0x26, 0.72], 
        [0x80, 0x00, 0x26, 0.75],
    ],
    BLUE: [
        [0xf7, 0xfb, 0xff, 0.50], 
        [0xde, 0xeb, 0xf7, 0.53], 
        [0xc6, 0xdb, 0xef, 0.56], 
        [0x9e, 0xca, 0xe1, 0.60],
        [0x6b, 0xae, 0xd6, 0.64], 
        [0x42, 0x92, 0xc6, 0.68], 
        [0x21, 0x71, 0xb5, 0.72], 
        [0x08, 0x45, 0x94, 0.75],
    ],
    GREEN: [
    [0xf7, 0xfc, 0xf5, 0.50],
    [0xe5, 0xf5, 0xe0, 0.53],
    [0xc7, 0xe9, 0xc0, 0.56],
    [0xa1, 0xd9, 0x9b, 0.60],
    [0x74, 0xc4, 0x76, 0.64],
    [0x41, 0xab, 0x5d, 0.68],
    [0x23, 0x8b, 0x45, 0.72],
    [0x00, 0x5a, 0x32, 0.75],
    ],
    RED: [
        [0xff, 0xf5, 0xf0, 0.50], 
        [0xfe, 0xe0, 0xd2, 0.53], 
        [0xfc, 0xbb, 0xa1, 0.56], 
        [0xfc, 0x92, 0x72, 0.60],
        [0xfb, 0x6a, 0x4a, 0.64], 
        [0xef, 0x3b, 0x2c, 0.68], 
        [0xcb, 0x18, 0x1d, 0.72], 
        [0x99, 0x00, 0x0d, 0.75],
    ]
}

const FeatureLayerConfig = {
    features: [
        {
            kind: KIND.ONE,
            displayName: 'Avg. Quality Rating',
            metricId: 'quality',
            metric: [
                {
                    display: "Avg. Quality Rating",
                    featureId: "wQRIS",
                    scale: [1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5],
                    colors: COLORS.BLUE
                }
            ]
        },
        {
            kind: KIND.ONE,
            displayName: 'Avg. Coaching Hours per Capacity',
            metricId: "CsqiHrsPerCapAvg",
            metric: [
                {
                    display: "Avg. Coaching Hours per Capacity",
                    featureId: "CsqiHrsPerCapAvg",
                    scale: [0, 0.04, 0.08, 0.12, 0.16, 0.20, 0.24, 0.28],
                    colors: COLORS.RED
                }
            ]
        }
    ]
}

export default FeatureLayerConfig;
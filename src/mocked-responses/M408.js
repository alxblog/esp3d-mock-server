module.exports = (B, T) =>
    `{
    "status": "I",
    "heaters":[
        ${B},
        ${T}
    ],
    "active":[0.000000,0.000000],
    "standby":[0.000000,0.000000],
    "hstat":[0,0],
    "pos":[0.000000,0.000000,0.000000],
    "extr":[${T}],
    "sfactor":100,
    "efactor":[100],
    "tool":0,
    "probe":1000,
    "fanPercent":[0.000000],
    "homed":[0,0,0],
    "coords": {
        "axesHomed":[0,0,0],
        "extr":[0.000000],
        "xyz":[0.000000,0.000000,0.000000]
    },
    "currentTool":0,
    "params": {
        "atxPower":1,
        "fanPercent":[0.000000],
        "speedFactor":100,
        "extrFactors":[100]},
        "temps": {
            "bed": {
            "current":${B},
            "active":0.000000,
            "state":1
        },
        "heads": {
            "current": [${T}],
            "active": [0.000000],
            "state": [1]
        }
    },
    "time":23005
}\n`

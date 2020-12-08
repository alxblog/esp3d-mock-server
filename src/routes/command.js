const express = require('express')
const router = express.Router()
const grbl = require('../mocked-responses/grbl')
const esp800 = require('../mocked-responses/ESP800')
const esp400 = require('../mocked-responses/ESP400')
const esp401 = require('../mocked-responses/ESP401')
const esp410 = require('../mocked-responses/ESP410.json')
const esp420 = require('../mocked-responses/ESP420.json')
const smCat = require('../mocked-responses/smoothieware')
const m205 = require('../mocked-responses/M205.repetier')
const m114 = require('../mocked-responses/M114')
const m503 = require('../mocked-responses/M503')

const {
    extractGcodeCmd,
    sendSensorData,
} = require('../lib')

const isStartsWith = (src, lookup) => (src.startsWith(lookup) != -1) ? true : false

const commandRoute = (esp3d) => {
    const targetFW = esp3d.targetFW
    router.all("/", (req, res) => {
        const { cmd } = req.query
        const [command, ...rest] = decodeURI(cmd).split(' ')
        const extratedCmd = extractGcodeCmd(command) || command  //extract command ex: M500 or raw command
        if (esp3d.serialPort != null && !command.startsWith('ESP')) {
            esp3d.serialPort.write(`${decodeURI(cmd)}\n`, function (err) {
                if (err) console.log('Error on write: ', err.message)
                res.send("ok")
            })
        }
        else
            switch (extratedCmd) {
                case "$$": //GRBL Settings
                    if (targetFW == "grbl") esp3d.sendBinary(grbl)
                    res.send("ok")
                    break;
                case "cat": //Smoothieware Settings
                    if (targetFW == "smoothieware") esp3d.sendBinary(smCat())
                    res.send("ok")
                    break;
                case "ESP400": //Get full EEPROM settings content
                    res.json(esp400(esp3d.getFWId(targetFW)))
                    break;
                case "ESP401": //Set EEPROM setting //TO-CHECK BY LUC
                    esp401(rest, esp3d)
                    res.send("ok ")
                    break;
                case "ESP410": //Get available AP list (limited to 30)
                    res.send(esp410)
                    break;
                case "ESP420": // Get current settings of ESP3D
                    res.json(esp420)
                    break;
                case "ESP800": //Get FW Informations
                    res.json(esp800(targetFW))
                    break;
                case "M20":
                    res.send(rest)
                    break;
                case "M21":
                    if (["repetier", "repetier4davinci"].includes(targetFW))
                        esp3d.sendBinary("ok\n");
                    res.send("")
                    break;
                case "M105":
                    const g = () => (Math.random() * (100 - 0) + 0).toFixed(2)
                    esp3d.sendBinary(`T:${g()} / ${g()} B:${g()} / ${g()}`);
                    res.send("ok\n")
                    break;
                case "M114":
                    esp3d.sendBinary(m114())
                    res.send("")
                    break;
                case "M205":
                    if (targetFW == "repetier") esp3d.sendBinary(m205)
                    res.send("")
                    break;
                case "M220":
                    break;
                case "M408":
                    break;
                case "M503":
                    esp3d.sendBinary(m503(targetFW))
                    res.send("")
                    break;
                default:
                    res.json({ custom: "unknown query" })
                    // SendBinary("ok\n")
                    break;
            }

    })
    // HANDLE COMMANDS HERE
    return router
}

module.exports = commandRoute

/*
ECHO%3A
ECHO%3A
AUTOWAIT
ON
OFF
M20%20SD%3A
M20%20U%3A
M20
M21
M105
M105%20ON
M105%20OFF
M114
M205
M220
M220%20S
M220%20S
M408
M503
ESP420
ESP400
ESP401
ESP410
ESP800
SENSOR%20ON
SENSOR%20OFF
=%24%24
=cat
P%3D
%20T%3D
V%3D
&
*/
const express = require('express')
const router = express.Router()
const grbl = require('../mocked-responses/grbl')
const esp = require('../mocked-responses/ESP')
const smCat = require('../mocked-responses/smoothieware')
const m205 = require('../mocked-responses/M205.repetier')
const m114 = require('../mocked-responses/M114')
const m503 = require('../mocked-responses/M503')

const {
    extractGcodeCmd,
    sendSensorData,
} = require('../lib')

const { isJson, isStartsWith } = require('../utils')

const parseESPCmd = (cmd) => {
    const [matches] = [...cmd.matchAll(/\[?(?:ESP)(?<espcmd>\d+)\]?/gmi)]
    const { espcmd } = matches.groups
    return (espcmd) ? espcmd : false
    // console.log(match.espcmd)
}

const commandRoute = (esp3d) => {
    const targetFW = esp3d.targetFW
    router.all("/", (req, res) => {
        const { cmd } = req.query
        const [command, ...rest] = decodeURI(cmd).split(' ')

        /**
        * If is ESP3D command
        */
        if (command.startsWith('[ESP') || command.startsWith('ESP')) {
            const espCode = parseESPCmd(command)
            // console.log('COMMANDE ESP', espCode)
            const espResp = (espCode) ? esp(espCode, targetFW, esp3d, rest) : null
            if (isJson(espResp)) { res.json(JSON.parse(espResp)) }
            else { res.send(espResp) }
        }
        /**
         * If Serial Binding is enable
         */
        else if (esp3d.serialPort != null && !command.startsWith('ESP')) {
            esp3d.serialPort.write(`${decodeURI(cmd)}\n`, function (err) {
                if (err) console.log('Error on write: ', err.message)
                res.send("ok")
            })
        }
        else {
            const extratedCmd = extractGcodeCmd(command) || command  //extract command ex: M500 or raw command
            switch (extratedCmd) {
                case "$$": //GRBL Settings
                    if (targetFW == "grbl") esp3d.sendBinary(grbl)
                    res.send("ok")
                    break;
                case "cat": //Smoothieware Settings
                    if (targetFW == "smoothieware") esp3d.sendBinary(smCat())
                    res.send("ok")
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
SENSOR%20ON
SENSOR%20OFF
=%24%24
=cat
P%3D
%20T%3D
V%3D
&
*/
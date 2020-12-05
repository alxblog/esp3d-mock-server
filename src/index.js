#!/usr/bin/env node

const { version } = require('../package.json')
const { program } = require('commander')
const express = require("express")
const WebSocket = require("ws")
const cors = require('cors')
const fileUpload = require("express-fileupload")
const throttle = require('express-throttle-bandwidth')
const chalk = require('chalk')
const { colorizedHTTPMethods } = require('./lib/dev')
const Table = require('cli-table')
const { init } = require('./init')
const ESP3D = require('./lib/esp3d')
const { sendSensorData, SendBinary, sendBinary } = require('./lib')

program
    .version(version)
    .option('-P, --port <number>', 'HTTP port', 8080)
    .option('-F, --firmware <name>', 'Target firmware', "marlin")
    .option('-W, --ws-port <number>', 'Websocket server port', 81)
    .option('-T, --throttle <number>', 'Throttle value (bps)', 0)
    .parse(process.argv)

/**
 * Ext Routes
 */
var filesRoute = require('./routes/files')
var commandRoute = require('./routes/command')


const throttleValue = program.port || 0 //(bps) if bps is <= 0 it does not throttle.
const port = program.port || 8080 //8888
const wsPort = program.wsPort || 81//8830
const targetFW = program.firmware || "marlin"
const fsDir = "public"
let currentID = 0
let sensorInterval = null
let tempInterval = null
let waitInterval = null
let feedrate = 100

const app = express()
const wss = new WebSocket.Server({ port: wsPort })
const esp3d = new ESP3D(targetFW, wss)

/**
 * MIDDLEWARES
 */
app.use(cors())
app.use(express.static(fsDir))
app.use(throttle(throttleValue))
app.use(fileUpload({ preserveExtension: true, debug: false }))

app.use((req, res, next) => {
    const table = new Table()
    const [service, args] = req.originalUrl.split('?')
    table.push(
        ['Firmware', chalk`{cyan ${esp3d.targetFW}}`],
        ['Method', colorizedHTTPMethods[req.method]],
        ['URL', chalk`{magenta ${service}}?${args}`],
        ['Query params', JSON.stringify(req.query, null, 2)]
        //req.params
    )
    console.log(table.toString())
    next()
})

/**
 * ROUTES
 */
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post("/login", (req, res) => { res.send("") })
app.use('/files', filesRoute(fsDir))
app.use('/command', commandRoute(esp3d))

app.all("/updatefw", function (req, res) { res.send("ok") })

const run = (async () => {
    await init()
    app.listen(process.env.PORT || port, () => {
        console.log(chalk`{white.bgBlack ESP}{black.bgWhite 3D} Mocking Server listening at {cyan http://localhost:${process.env.PORT || port}}`)
        console.log(chalk`Firmware : {cyan.bold ${esp3d.targetFW}}`)
    })

    wss.on("connection", ws => {
        console.log("WS : New connection")
        ws.send(`currentID:${currentID}`)
        wss.clients.forEach(
            client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(`activeID:${currentID}`)
                }
            })
        currentID++
        ws.on("message", (message) => console.log("WS : received: %s", message))
    })
})

run()
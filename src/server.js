
const express = require("express")
const WebSocket = require("ws")
const cors = require('cors')
const fileUpload = require("express-fileupload")
const throttleBandwidth = require('express-throttle-bandwidth')
const SerialPort = require('serialport')
const chalk = require('chalk')
const { colorizedHTTPMethods } = require('./lib/dev')
const Table = require('cli-table')
const { init } = require('./init')
const ESP3D = require('./lib/esp3d')
const { sendSensorData, SendBinary, sendBinary } = require('./lib')


/**
 * @todo Check throttle
 */

/**
 * Ext Routes
 */
var filesRoute = require('./routes/files')
var commandRoute = require('./routes/command')


const server = ({
    serialPort,
    serialSpeed,
    firmware,
    httpPort,
    wsPort,
    throttle,
}) => {
    const fsDir = "public"
    let currentID = 0
    let sensorInterval = null
    let tempInterval = null
    let waitInterval = null
    let feedrate = 100

    const app = express()
    const wss = new WebSocket.Server({ port: wsPort })
    const esp3d = new ESP3D(
        firmware,
        wss,
        (serialPort)
            ? new SerialPort(serialPort, { baudRate: parseInt(serialSpeed) })
            : null
    )

    /**
     * MIDDLEWARES
     */
    app.use(cors())
    app.use(express.static(fsDir))
    app.use(throttleBandwidth(parseIn(throttle)))
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
        app.listen(httpPort, () => {
            console.log(chalk`{white.bgBlack ESP}{black.bgWhite 3D} Mocking Server listening at {cyan http://localhost:${httpPort}}`)
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
}

module.exports = server
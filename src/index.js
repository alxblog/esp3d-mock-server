#!/usr/bin/env node

const { version } = require('../package.json')
const { program } = require('commander')
const inquirer = require('inquirer')
const clear = require('console-clear')
const jsonFwList = require('./firmwareList.json')
const express = require("express")
const WebSocket = require("ws")
const cors = require('cors')
const fileUpload = require("express-fileupload")
const throttle = require('express-throttle-bandwidth')
const SerialPort = require('serialport')
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
    .option('-S, --serial-port <path>', 'Serial path to bind', 0)
    .option('-B, --serial-speed <number>', 'Serial communication speed', 250000)
    .option('--prompt', 'Run CLI')
    .parse(process.argv);


/**
 * Ext Routes
 */
var filesRoute = require('./routes/files')
var commandRoute = require('./routes/command')
const baudRateList = [9600, 14400, 19200, 38400, 57600, 115200, 128000, 250000, 256000, { name: chalk`{cyan custom}`, value: 'custom' }]

const getDefaultIndex = (arr, value) => {
    const index = arr.indexOf(value)
    return (index != -1) ? index : false
}

let throttleValue = program.throttle //(bps) if bps is <= 0 it does not throttle.
let port = program.port //8888
let wsPort = program.wsPort //8830
let targetFW = program.firmware
let serialPort = program.serialPort
let serialSpeed = program.serialSpeed

if (program.prompt) {
    const cli = async (program, firmwareList) => {
        clear()
        const availableSerialPorts = await SerialPort.list()
        const answers = await inquirer
            .prompt([
                {
                    type: 'confirm',
                    name: 'useSerialBinding',
                    message: 'Use serial binding',
                    default: true,
                },
                {
                    type: 'list',
                    name: 'serialPort',
                    message: 'Choose serial port',
                    choices: availableSerialPorts.map(port => port.path),
                    when: (answers) => answers.useSerialBinding
                },
                {
                    type: 'list',
                    name: 'speed',
                    message: 'Set baudrate',
                    choices: baudRateList,
                    default: getDefaultIndex(baudRateList, program.serialSpeed) || 7,
                    when: (answers) => answers.useSerialBinding
                },
                {
                    type: 'number',
                    name: 'customSpeed',
                    message: 'Custom baudrate',
                    when: (answers) => answers.speed === 'custom'
                },
                {
                    type: 'list',
                    name: 'firmware',
                    message: 'Target firmware',
                    choices: firmwareList.map(fw => fw.name),
                    default: getDefaultIndex(firmwareList.map(fw => fw.name), program.firmware) || 'marlin',
                },
                {
                    type: 'number',
                    name: 'httpPort',
                    message: 'HTTP Port',
                    default: 8080
                },
                {
                    type: 'number',
                    name: 'wsPort',
                    message: 'Websocket Port',
                    default: 81
                },
                {
                    type: 'number',
                    name: 'throttle',
                    message: 'Throttle (bps)',
                    default: 0
                },
            ])
        // .then((answers) => {
        //     console.log(JSON.stringify(answers, null, '  '));
        // run()
        // });
        return new Promise((resolve, reject) => {
            // answers.catch(err => { if (err) reject(err) })
            console.log(answers)
            resolve(answers)
        })

    }
    cli(program, jsonFwList.firmwareList).then(answers => {
        throttleValue = answers.throttle
        port = answers.httpPort
        wsPort = answers.wsPort
        targetFW = answers.firmware
        serialPort = answers.serialPort
        serialSpeed = answers.speed
        run()
    })
}

const fsDir = "public"
let currentID = 0
let sensorInterval = null
let tempInterval = null
let waitInterval = null
let feedrate = 100

const app = express()
const wss = new WebSocket.Server({ port: wsPort })
const esp3d = new ESP3D(
    targetFW,
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
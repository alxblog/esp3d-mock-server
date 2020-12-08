#!/usr/bin/env node

const updateNotifier = require('update-notifier');
const { program } = require('commander')
const inquirer = require('inquirer')
const clear = require('console-clear')
const chalk = require('chalk')
const SerialPort = require('serialport')
const pkg = require('../package.json');
const { firmwareList } = require('./firmwareList.json')
const server = require('./index')

const baudRateList = [9600, 14400, 19200, 38400, 57600, 115200, 128000, 250000, 256000, { name: chalk`{cyan custom}`, value: 'custom' }]

const getDefaultIndex = (arr, value) => {
    const index = arr.indexOf(value)
    return (index != -1) ? index : false
}

const getCLIOptions = () => {
    const {
        httpPort,
        firmware,
        wsPort,
        throttle,
        serialPort,
        serialSpeed,
        interactive
    } = program
        .version(pkg.version)
        .option('-P, --http-port <number>', 'HTTP port', 8080)
        .option('-F, --firmware <name>', 'Target firmware', "marlin")
        .option('-W, --ws-port <number>', 'Websocket server port', 81)
        .option('-T, --throttle <number>', 'Throttle value (bps)', 0)
        .option('-S, --serial-port <path>', 'Serial path to bind')
        .option('-B, --serial-speed <number>', 'Serial communication speed', 250000)
        .option('-I, --interactive', 'Run interactive CLI')
        .parse(process.argv)
    return ({
        httpPort,
        firmware,
        wsPort,
        throttle,
        serialPort,
        serialSpeed,
        interactive
    })
}

const getPromptOptions = async (defaultOpt, firmwareList) => {
    {

        const availableSerialPorts = await SerialPort.list()
        return await inquirer
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
                    name: 'serialSpeed',
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
    }
}

const getAppParams = async () => {
    clear()
    updateNotifier({ pkg }).notify();
    const cliOptions = getCLIOptions()
    const promptOptions = (cliOptions.interactive) ? await getPromptOptions(cliOptions, firmwareList) : false
    return (promptOptions) ? promptOptions : cliOptions
}

const appParams = getAppParams()
appParams.then(res => { server(res) })
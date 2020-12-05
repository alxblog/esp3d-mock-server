const { firmwareList } = require('../firmwareList.json')

const sendSensorData = () => {
    let T = Number(Math.floor(Math.random() * 25).toFixed(2))
    let Pa = Number(Math.floor(Math.random() * 1500).toFixed(2))
    let H = Number(Math.floor(Math.random() * 100).toFixed(2))
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send("SENSOR:" + T + "[C] " + Pa + "[Pa] " + H + "[%]")
        }
    })
}



const extractGcodeCmd = (cmd) => {
    const gcodeCommand = cmd.match(/([A-Z]+)(\d+)/g)
    return (Array.isArray(gcodeCommand)) ? gcodeCommand[0] : false
}

module.exports = {
    extractGcodeCmd,
    sendSensorData,
}
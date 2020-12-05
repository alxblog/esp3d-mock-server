const { firmwareList } = require('../firmwareList.json')

let ESP3D = class {
    constructor(targetFW, webSocket) {
        this.fwList = firmwareList
        this.targetFW = targetFW
        this.webSocket = webSocket
    }
    /**
     * Get a Firmware id by it name 
     * @param {number} fwId
     */
    getFWId = (fwName) => this.fwList.filter(fw => fw.name == fwName)[0].id

    /**
     * Get a Firmware name by it id 
     * @param {number} fwId
     */
    getFWName = (fwId) => this.fwList.filter(fw => fw.id == fwId)[0].name

    /**
     * Set Target Firmware
     * @param {number|string} fw 
     */
    setFirmware(fw) {
        this.targetFW = (!isNaN(fw)) ? this.getFWName(fw) : fw
        return this
    }

    /**
     * Send on WS a binary converted string
     */
    sendBinary = (text) => {
        const response = new Uint8Array(text.length).map((val, i) => text.charCodeAt(i))
        console.log(`WS: Binary send `)
        this.webSocket.clients.forEach(client => {
            if (client.readyState == 1) client.send(response)
        })
    }
}

module.exports = ESP3D
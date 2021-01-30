const esp400 = require('../mocked-responses/ESP400')
// const esp400 = require('../../public/ESP400.json')
const esp401 = require('../mocked-responses/ESP401')
const esp410 = require('../mocked-responses/ESP410.json')
const esp420 = require('../mocked-responses/ESP420.json')
const esp800 = require('../mocked-responses/ESP800')

module.exports = (cmd, targetFW, esp3d, params) => {
    const cmdInt = parseInt(cmd)
    var esp = {
        400: function () {
            //handle missing esp400 file
            // return esp400(esp3d.getFWId(targetFW))
            return esp400()
        },
        401: function () {
            esp401(params, esp3d)
            return "ok\n"
        },
        410: function () {
            return esp410
        },
        420: function () {
            return esp420
        },
        // 444: function () {            
        // },
        800: function () {
            return esp800(targetFW);
        },
        'default': function () {
            esp3d.sendBinary(`echo:Unknown ESP command: "[ESP${command}]"\nok\n`)
            return { "custom": "unknown ESP query" };
        }
    };
    return (esp[cmdInt] || esp['default'])();
}
const m503Marlin = require('./M503.marlin')
const m503Smoothieware = require('./M503.smoothieware')

module.exports = (firmware) => {
    if (firmware === "smoothieware") return m503Smoothieware
    return m503Marlin
}
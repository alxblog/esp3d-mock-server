const path = require('path')
const fs = require('fs')
const copy = require('recursive-copy')

const publicSrcPath = path.resolve(__dirname, '../public')
const publicDestPath = path.resolve(__dirname, '../../public')

const getESP400File = async () => {
    const esp400DestPath = path.join(publicDestPath, 'ESP400.json')
    const esp400DestExist = await new Promise((resolve, reject) => {
        fs.access(esp400DestPath, fs.F_OK, (err) => {
            if (err) reject(err)
            resolve()
        })
    })
        .then(() => { return true })
        .catch(err => { return false })

    if (!esp400DestExist) {
        await copy(
            path.join(publicSrcPath, 'ESP400.json'),
            esp400DestPath
        )
    }
    const rawdata = await fs.promises.readFile(esp400DestPath, { encoding: 'utf8' })
    return JSON.parse(rawdata)
}

const updateESP400 = async (position, value) => {
    const ESP400 = await getESP400File()
    const currentSetting = ESP400["Settings"].filter(setting => setting["P"] == position)
    const restSettings = ESP400["Settings"].filter(setting => setting["P"] != position)
    const newSetting = { ...currentSetting[0], V: value } //new value updating
    newSettings = {
        "Settings": [
            ...restSettings,
            newSetting
        ]
    }
    return fs.writeFile(
        path.join(publicDestPath, 'ESP400.json'),
        JSON.stringify(newSettings, null, 4),
        'utf8',
        (err) =>
            new Promise((resolve, reject) => {
                if (err) reject(err)
                resolve()
            })
    )
}


module.exports = async (args, esp3d) => {
    const argsArr = args.join('').match(/(\w{1})=(\d+)/g)
    const { P, T, V } = argsArr
        .reduce((curr, val) => {
            const [key, value] = val.split('=')
            return ({ ...curr, [key]: value })
        }, {})
    console.log({ P, T, V })
    if (P === "461") await updateESP400(P, esp3d.getFWName(V))
    else await updateESP400(P, V)
    return P
}
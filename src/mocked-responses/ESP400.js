const path = require('path')
const fs = require('fs')
const copy = require('recursive-copy')

const publicSrcPath = path.resolve(__dirname, '../public')
const publicDestPath = path.resolve(__dirname, '../../public')

module.exports = () => {
    const esp400DestPath = path.join(publicDestPath, 'ESP400.json')
    /* const esp400DestExist = await new Promise((resolve, reject) => {
        fs.access(esp400DestPath, fs.F_OK, (err) => {
            if (err) reject(err)
            resolve()
        })
    })
        .then(() => { return true })
        .catch(err => { console.log(err); return false })

    if (!esp400DestExist) {
        await copy(
            path.join(publicSrcPath, 'ESP400.json'),
            esp400DestPath
        )
    } 
    */
    // const rawdata = await fs.promises.readFile(esp400DestPath, { encoding: 'utf8' })
    //     return rawdata
    return fs.readFileSync(esp400DestPath, { encoding: 'utf8' })

}

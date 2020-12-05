const path = require('path')
const fs = require('fs')
const copy = require('recursive-copy');

const publicSrcPath = path.resolve(__dirname, './public')
const publicDestPath = path.resolve(__dirname, '../public')

const isExistPublicDestFolder = () => {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(publicDestPath)) {
            fs.mkdir(publicDestPath, (err) => {
                if (err) reject(err);
                else resolve()
            })
        }
        else resolve()
    })
}

const getFileList = (path) =>
    new Promise((resolve, reject) => {
        fs.readdir(path, (err, files) => {
            if (err) reject(err);
            else resolve(files)
        })
    })

const listPublicDestFolder = async () =>
    await getFileList(publicDestPath).catch(err => { if (err) throw err })

const listPublicSrcFolder = async () =>
    await getFileList(publicSrcPath).catch(err => { if (err) throw err })

const checkDefaultFilesPresent = async () => {
    const publicDestList = await listPublicDestFolder()
    const publicSrcList = await listPublicSrcFolder()
    for (const file of publicSrcList) {
        if (!publicDestList.includes(file)) {
            await copy(
                path.join(publicSrcPath, file),
                path.join(publicDestPath, file)
            )
        }
    }
}

const init = async () => {
    await isExistPublicDestFolder().catch(err => { if (err) throw err })
    checkDefaultFilesPresent()
}

module.exports = {
    init,
    listPublicDestFolder,
    listPublicSrcFolder,
}
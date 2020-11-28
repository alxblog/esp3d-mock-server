const pathModule = require('path')
const fs = require('fs')
const express = require('express')
const router = express.Router()

function fileSizeString(size) {
    if (size < 1024) return size + " B"
    if (size < (1024 ** 2)) return (size / 1024).toFixed(2) + " KB"
    if (size < (1024 ** 3)) return (size / (1024 ** 2)).toFixed(2) + " MB"
    if (size < (1024 ** 4)) return (size / (1024 ** 3)).toFixed(2) + " GB"
    return "X B"
}

const getAllFiles = (dirPath, arrayOfFiles) => {
    arrayOfFiles = arrayOfFiles || []
    fs.readdirSync(dirPath)
        .forEach(file => {
            if (fs.statSync(dirPath + "/" + file).isDirectory()) {
                arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
            } else {
                arrayOfFiles.push(dirPath + "/" + file)
            }
        })
    return arrayOfFiles
}

const getTotalSize = (directoryPath) =>
    getAllFiles(directoryPath)
        .reduce((acc, curr) => acc + fs.statSync(curr).size, 0)

function filesList(path) {
    let totalused = getTotalSize(path)
    let total = 1.31 * 1024e2
    const files = fs.readdirSync(path)
        .map(file => {
            const fileStat = fs.statSync(pathModule.join(path, file))
            const size = (fileStat.isFile()) ? fileSizeString(fileStat.size) : -1
            return { name: file, size }
        })

    return {
        files,
        path,
        occupation: ((100 * totalused) / total).toFixed(0),
        status: "ok",
        total: fileSizeString(total),
        used: fileSizeString(totalused),
    }
}

const filesRoute = (fsdir) => {

    router.post('/', (req, res, next) => {
        const { path = '' } = req.query
        const { myFile = [] } = req.files
        const targetPath = pathModule.resolve(process.cwd(), fsdir, path.replace(/^\/?/gm, ''))
        const fileList = (!Array.isArray(myFile)) ? [myFile] : myFile
        fileList.forEach(file => {
            console.log(pathModule.join(targetPath, file.name))
            file.mv(pathModule.join(targetPath, file.name), err => {
                if (err) {
                    res.status(500).send(err)
                    next()
                }
                res.send(filesList(targetPath))
            })
        })
    })


    return router
}


module.exports = filesRoute
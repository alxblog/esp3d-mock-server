const pathModule = require('path')
const fs = require('fs')
const rimraf = require("rimraf")
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

const createDir = (path) => { if (!fs.existsSync(path)) fs.mkdirSync(path) }
const deleteFile = (path) => {
    try {
        fs.unlinkSync(path)

    } catch (error) {
        console.log(error)
    }
}
const deleteDir = (path) => {
    rimraf(path, () => { });
}

const filesRoute = (fsdir) => {

    router.post('/', (req, res, next) => {
        const { path = '' } = req.query
        const { myfile = [] } = req.files
        const targetPath = pathModule.resolve(__dirname, '../../', fsdir, path.replace(/^\/?/gm, ''))
        const fileList = (!Array.isArray(myfile)) ? [{ ...myfile }] : myfile
        const mvPromiseList = fileList.map(file => file.mv(pathModule.join(targetPath, file.name)))
        Promise.all(mvPromiseList).then((err) => {
            res.send(filesList(targetPath))
        }).catch(err => {
            res.status(500).send(err)
        });
    })

    router.all('/', (req, res) => {
        const { path, filename = '', action } = req.query
        const targetPath = pathModule.resolve(__dirname, '../../', fsdir, path.replace(/^\/?/gm, ''))
        const fullPath = pathModule.join(targetPath, filename)
        switch (action) {
            case 'deletedir':
                deleteDir(fullPath)
                break;
            case 'delete':
                deleteFile(fullPath) //do it real async
                break;
            case 'createdir':
                createDir(fullPath)
                break;

            default:
                break;
        }
        res.send(filesList(targetPath))

    })

    return router
}


module.exports = filesRoute
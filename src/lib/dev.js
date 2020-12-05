const chalk = require('chalk')

const colorizedHTTPMethods = {
    GET: chalk`{white.bgGreen  GET }`,
    HEAD: chalk`{black.bgWhite  HEAD }`,
    POST: chalk`{white.bgBlue  POST }`,
    PUT: chalk`{black.bgWhite  PUT }`,
    DELETE: chalk`{black.bgWhite  DELETE }`,
    CONNECT: chalk`{black.bgWhite  CONNECT }`,
    OPTIONS: chalk`{black.bgWhite  OPTIONS }`,
    TRACE: chalk`{black.bgWhite  TRACE }`,
    PATCH: chalk`{black.bgWhite  PATCH }`,
}
module.exports = { colorizedHTTPMethods }
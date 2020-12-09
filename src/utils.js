const isJson = (str) => {
    try {
        return JSON.parse(str);
    } catch (e) {
        return false;
    }
}

const isStartsWith = (src, lookup) => (src.startsWith(lookup) != -1) ? true : false

module.exports = { isJson, isStartsWith }
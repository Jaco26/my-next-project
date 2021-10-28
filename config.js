const fs = require('fs')
const path = require('path')

/**
 * 
 * @typedef {import('./config/types').Config} Config
 * @typedef {import('./config/types').CreateImg} CreateImg
 */


/** @type {CreateImg} */
function img(src, alt, width, height) {
    return { src, alt, width, height }
}

function text() {

}

/**
 * 
 * @param {Config} config 
 * @returns 
 */
function validateConfig(config) {
    return true
}

/**
 * 
 * @param {Config} config 
 */
function createConfig(config) {
    validateConfig(config)
    fs.writeFileSync(path.resolve('./config/config.json'), JSON.stringify(config))
}



module.exports = { createConfig, validateConfig, img }
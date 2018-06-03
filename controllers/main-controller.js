// Modules
const cache = require('memory-cache')
const randomstring = require('randomstring')

/**
 * Creates a new Neural Network, trains it with the provided data and generates a code to access the network
 * @param {*} data Data to train the Neural Network
 * @returns {string} The exclusive code to access the Neural Network
 */
const createNetwork = data => {
  return new Promise((resolve, reject) => {
    let code = generateCode()

    resolve(code)
  })
}

/**
 * Generates an exclusive code to access the Neural Network
 * @returns {string} The generated code
 */
const generateCode = () => {
  let code = ''

  // Keep generating while the code already exists
  do {
    code = randomstring.generate(6)
  } while (cache.get(code))

  // Stores the code
  cache.put(code, true)

  return code
}

module.exports = {
  createNetwork
}
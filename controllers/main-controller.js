// Modules
const cache = require('memory-cache')
const randomstring = require('randomstring')
const synaptic = require('synaptic')
const util = require('util')

const Neuron    =   synaptic.Neuron,
    	Layer     =   synaptic.Layer,
	    Network   =   synaptic.Network,
	    Trainer   =   synaptic.Trainer,
      Architect =   synaptic.Architect

// Services
const networkService = require('../services/network-service')


/**
 * Creates a new Neural Network, trains it with the provided data and generates a code to access the network
 * @param {Object[]} data Data to train the Neural Network
 * @returns {string} The exclusive code to access the Neural Network
 */
const createNetwork = data => {
  return new Promise((resolve, reject) => {
    try {
      // Generates a new code
      let code = generateCode()

      // Creates the network and the trainer
      const perceptron = new networkService.Perceptron(1, 5, 4)
      const trainer = new Trainer(perceptron)

      // Normalize the data
      let normalizedData = normalizeData(data)
      
      // Trains the network and store the result
      let trainingResult = trainer.train(normalizedData)

      // Stores the network and the trainer
      cache.put(`${code}/network`, perceptron)
      cache.put(`${code}/trainer`, trainer)

      console.log(`Network created with code ${code}`)

      // Resolve the promise returning the code and the training result
      resolve({ code, trainingResult })
    } catch (e) {
      reject(e)
    }
  })
}

/**
 * Generates an exclusive code to access the Neural Network
 * @returns {string} The generated code
 */
const generateCode = () => {
  try {
    let code = ''
  
    // Keep generating while the code already exists
    do {
      code = randomstring.generate(6)
    } while (cache.get(code))
  
    // Stores the code
    cache.put(code, true)
  
    return code
    
  } catch (e) {
    throw e
  }
}

/**
 * Normalizes the data
 * TODO: Try to simplify methods 'normalizeData' and 'normalizeInput'
 * @param {Object[]} data Data to be normalized
 * @returns {Object[]} Normalized data
 */
const normalizeData = data => {
  for (let i = 0; i < data.length; i++) {

    // Normalizes input
    data[i].input[0] = data[i].input[0] / 50

    // Normalizes output
    switch(data[i].output[0]) {
      case 'w':
        data[i].output = [1, 0, 0, 0]
        break
      case 'a':
        data[i].output = [0, 1, 0, 0]
        break
      case 's':
        data[i].output = [0, 0, 1, 0]
        break
      case 'd':
        data[i].output = [0, 0, 0, 1]
    }
  }

  return data
}

/**
 * Normalizes the input
 * TODO: Try to simplify methods 'normalizeData' and 'normalizeInput'
 * @param {number[]} input Input to be normalized
 * @returns {number[]} Normalized input
 */
const normalizeInput = input => {
  for (let i = 0; i < input.length; i++) {
    input[i] = input[i] / 50
  }

  return input
}

/**
 * Activates the network identified by the given code
 * @param {string} code Code of the network to activate
 * @param {number[]} input Input to use in the activation
 */
const activateNetwork = (code, input) => {
  return new Promise((resolve, reject) => {
    try {
      // Get the network from cache
      let network = cache.get(`${code}/network`)

      // Normalize the input
      let normalizedInput = normalizeInput(input)

      // Activate the network, obtaining the output
      let output = network.activate(normalizedInput)
      
      // Convert the output back
      let key = convertOutput(output)

      // Return the output
      resolve(key)
  
    } catch (e) {
      reject(e)
    }
  })
}

/**
 * Convert the output to the desired key
 * @param {number[]} output Output to convert
 * @returns {string} Converted output
 */
const convertOutput = output => {
  let i = output.indexOf(Math.max(...output))

  switch (i) {
    case 0:
      return 'w'
    case 1:
      return 'a'
    case 2:
      return 's'
    case 3:
      return 'd'
  }

  return ''
}

/**
 * Checks if the given network code exists
 * @param {string} code Code to be checked
 * @returns {boolean} True if the code exists, false if it doesn't
 */
const codeExists = code => {
  return new Promise((resolve, reject) => {
    try {
      resolve(cache.get(code))
    } catch (e) {
      reject(e)
    }
  })
}


module.exports = {
  createNetwork,
  activateNetwork,
  codeExists
}
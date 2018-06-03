// Modules
const cache = require('memory-cache')
const randomstring = require('randomstring')
const synaptic = require('synaptic')

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

      // Trains the network
      trainer.train(data)

      // Stores the network and the trainer
      cache.put(`${code}/network`, perceptron)
      cache.put(`${code}/trainer`, trainer)

      console.log(`Network created with code ${code}`)

      // Resolve the promise returning the code
      resolve(code)
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


module.exports = {
  createNetwork
}
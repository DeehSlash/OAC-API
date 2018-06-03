// Modules
const synaptic = require('synaptic')

const Neuron    =   synaptic.Neuron,
    	Layer     =   synaptic.Layer,
	    Network   =   synaptic.Network,
	    Trainer   =   synaptic.Trainer,
      Architect =   synaptic.Architect


/**
 * Perceptron constructor
 * @param {number} input Number of neurons in the input layer
 * @param {number} hidden Number of neurons in the hidden layer
 * @param {number} output Number of neurons in the output layer
 */
function Perceptron (input, hidden, output) {
	// Create the layers
	var inputLayer = new Layer(input)
	var hiddenLayer = new Layer(hidden)
	var outputLayer = new Layer(output)

	// Connect the layers
	inputLayer.project(hiddenLayer)
	hiddenLayer.project(outputLayer)

	// Set the layers
	this.set({
		input: inputLayer,
		hidden: [hiddenLayer],
		output: outputLayer
	})
}

/**
 * Extends the Perceptron prototype
 */
const extendPrototype = () => {
  Perceptron.prototype = new Network()
  Perceptron.prototype.constructor = Perceptron
}

module.exports = {
  Perceptron,
  extendPrototype
}
class Level{  // controls one level of our nerual network
    constructor(inputCount, outputCount){
        this.inputs = new Array(inputCount);
        this.outputs = new Array(outputCount);
        this.biases = new Array(outputCount);

        // the strength between each input and output
        this.weights = [];

        // creates a connection from each input node to all the output nodes
        for(let i=0;i<inputCount; i++){
            this.weights[i] = new Array(outputCount);
        }

        Level.#randomize(this); //randomize the weights and biases on this level
    }

    // create static method so that the information is serialized
    static #randomize(level) {
        for(let i=0;i<level.inputs.length;i++){
            for(let j=0;j<level.outputs.length;j++){
                level.weights[i][j]=Math.random()*2-1; // get a number between -1 and 1
            }
        }

        level.biases.forEach(bias => ( bias = Math.random()*2-1 ));
    }

    // compute output values using this algorithmn
    static feedForward(givenInputs, level){
        // receive inputs from sensors
        for(let i=0; i<level.inputs.length;i++){
            level.inputs[i]=givenInputs[i];
        }

        for(let i=0; i<level.outputs;i++){  //loop through every output
            let sum = 0;
            for(let j=0; j<level.inputs;j++){ // loop through every input
                sum += level.inputs[j]*level.weights[j][i]; //input * the weight of the connection to output
            }

            sum > level.biases[i] ? level.outputs[i] = 1 : level.outputs[i] = 0; // bias = likelihood to activate this output

            // if the input times the weight of the connection exceeds the bias we activate the output neuron
        }

        // return the new outputs
        return level.outputs;
    }
}
class NeuralNetwork{
    constructor(neuronCounts){ // an array of the amount of neurons each level of the network has
        this.levels=[];

        for(let i =0; i< neuronCounts.length-1; i++){ // creates a new level's inputs, and connects the next level to it
        this.levels.push(new Level(
                neuronCounts[i], neuronCounts[i+1]
            ));
        }
    }


    // feed forward algorithms move the information through the neural network
    // this feed forward concerns itself with the network as a whole and uses Level's feed forward
    // to contain the calculations within the level itself

    static feedForward(givenInputs, network){ //when given a set of inputs and a network
        let outputs = Level.feedForward(  // calls the first level of the network to produce it's outputs
            givenInputs, network.levels[0]);

        for(let i=1;i<network.levels.length;i++){ // starting with the previously calculated inputs
            outputs = Level.feedForward(          // get the outputs for each consecutive level
                outputs, network.levels[i]);
        }

        return outputs;  // return the final output
    }
}



class Level{  // controls one level of our nerual network
    constructor(inputCount, outputCount){
        this.inputs = new Array(inputCount);
        this.outputs = new Array(outputCount);
        this.biases = new Array(outputCount);

        // the strength between each input and output
        this.weights = [];

        // creates a connection from each input node to all the output nodes
        for(let i=0;i<inputCount; i++){
            this.weights[i] = new Array(outputCount); // one arrray of length of the outputs for each input
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


        for(let i=0; i<level.biases.length;i++){
            level.biases[i] = Math.random()*2-1;
        }
    }

    // compute output values using this algorithmn, this feed forward only concerns itself with the interaction
    // of the current level to the next level
    static feedForward(givenInputs, level){
        // receive inputs from sensors
        for(let i=0; i<level.inputs.length;i++){
            level.inputs[i]=givenInputs[i];
        }

        for(let i=0; i<level.outputs.length;i++){  //loop through every output
            let sum = 0;  //value of the inputs and weights
            for(let j=0; j<level.inputs.length;j++){ // loop through every input
                sum += level.inputs[j]*level.weights[j][i]; //input * the weight of the connection to output
            }

            // (sum > level.biases[i]) ? level.outputs[i] = 1 : level.outputs[i] = 0; // bias = likelihood to activate this output

            if(sum>level.biases[i]){
                level.outputs[i] = 1;
            }else {
                level.outputs[i] = 0;
            }

            // if the input times the weight of the connection exceeds the bias we activate the output neuron
        }

        // return the new outputs
        return level.outputs;
    }
}
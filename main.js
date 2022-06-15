// searches the html doc its on for an element with id #mainCanvas
const carCanvas = document.getElementById("mainCanvas");
// window refers to the size of the browser
carCanvas.width=300;

const networkCanvas = document.getElementById("networkCanvas");
networkCanvas.width=500;



const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

const road = new Road(carCanvas.width/2, carCanvas.width*0.9);
const cars = generateCars(100);
let bestCar = cars[0]; //set the best Car to the first one at start

if(localStorage.getItem("bestBrain")){ // check to see if their is a brain locally stored
    bestCar.brain=JSON.parse(localStorage.getItem("bestBrain")); // replace random brain with good brain
}

const traffic = [
    new Car(road.getLaneCenter(1), -100, 40, 60, "NPC", 2),
    new Car(road.getLaneCenter(0), -300, 40, 60, "NPC", 2),
    new Car(road.getLaneCenter(2), -300, 40, 60, "NPC", 2)
] 
   

animate();

//we need to be able to save the best iteration of each generation somehow so that we can advance AI
//we can achieve this by serializing the Car object in our local memory
function save(){
    localStorage.setItem("bestBrain", JSON.stringify(bestCar.brain));
}

function discard(){
    localStorage.removeItem("bestBrain");
}




function generateCars(genSize){
    const cars = [];

    for(let i=0; i<genSize; i++){
        cars.push(new Car(road.getLaneCenter(1),400,40,60, "AI"));
    }

    return cars;
}

function animate(time){
    for(i=0;i<traffic.length;i++){
        traffic[i].update(road.borders, []); // updates cars in traffic, dont pass npc cars traffic for collisions
    }

    for(let i=0; i<cars.length;i++){
        cars[i].update(road.borders, traffic);
    }

    // find the most interesting car (the furthest driving car)
    // this is our fitness function (how we push the AI to achieve the results we are looking for)
    bestCar = cars.find( //find the first element that returns true in the block
                        c => c.y==Math.min(  //is y the smallest value
                                            ...cars.map( // splat the array of the cars y values
                                                        c=>c.y
                                                        )
                                            )
                    ); // pretty sure this can be simplified to a single reduce function

    carCanvas.height = window.innerHeight;
    networkCanvas.height = window.innerHeight;

    // adds camera like effect to follow the car
    carCtx.save();
    carCtx.translate(0, -bestCar.y+carCanvas.height*0.7); // only follow one car

    road.draw(carCtx);
    for(i=0;i<traffic.length;i++){
        traffic[i].draw(carCtx);
    }
    carCtx.globalAlpha=0.2;
    for(i=0; i<cars.length;i++){
        bestCar == cars[i] ? '' : cars[i].draw(carCtx); //simple optimization: don't draw the best car in intial loop
    }
    carCtx.globalAlpha=1;
    bestCar.draw(carCtx);

    carCtx.restore();

    networkCtx.lineDashOffset=-time/50; 
    Visualizer.drawNetwork(networkCtx, bestCar.brain);  //method call to properly visualize the given network
    // calls this method everytime it finishes
    // allows the illusion of movement
    requestAnimationFrame(animate);
}


// ran into VM problem where the date was wrong
// adding for new commit on the 3rd day of works correct date



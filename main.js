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
const traffic = [
    new Car(road.getLaneCenter(1), -100, 40, 60, "NPC", 2),
]  //eventually I want to update this to be all cars and deal with traffic within cars
   // this should allow npc cars to crash into eah other and into the pc
   

animate();

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

    carCanvas.height = window.innerHeight;
    networkCanvas.height = window.innerHeight;

    // adds camera like effect to follow the car
    carCtx.save();
    carCtx.translate(0, -cars[0].y+carCanvas.height*0.7); // only follow one car

    road.draw(carCtx);
    for(i=0;i<traffic.length;i++){
        traffic[i].draw(carCtx);
    }
    carCtx.globalAlpha=0.2;
    for(i=0; i<cars.length;i++){
        cars[i].draw(carCtx);
    }
    carCtx.globalAlpha=1;

    carCtx.restore();

    networkCtx.lineDashOffset=-time/50; 
    Visualizer.drawNetwork(networkCtx, cars[0].brain);  //method call to properly visualize the given network
    // calls this method everytime it finishes
    // allows the illusion of movement
    requestAnimationFrame(animate);
}


// ran into VM problem where the date was wrong
// adding for new commit on the 3rd day of works correct date



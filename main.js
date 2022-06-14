// searches the html doc its on for an element with id #mainCanvas
const carCanvas = document.getElementById("mainCanvas");
// window refers to the size of the browser
carCanvas.width=300;

const networkCanvas = document.getElementById("networkCanvas");
networkCanvas.width=500;



const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

const road = new Road(carCanvas.width/2, carCanvas.width*0.9);
const car = new Car(road.getLaneCenter(1),400,40,60, "AI"); //need to specify between npc and pc cars
const traffic = [
    new Car(road.getLaneCenter(1), -100, 40, 60, "NPC", 2),
]  //eventually I want to update this to be all cars and deal with traffic within cars
   // this should allow npc cars to crash into eah other and into the pc

animate();

function animate(){
    for(i=0;i<traffic.length;i++){
        traffic[i].update(road.borders, []); // updates cars in traffic, dont pass npc cars traffic for collisions
    }

    car.update(road.borders, traffic);
    carCanvas.height = window.innerHeight;
    networkCanvas.height = window.innerHeight;

    // adds camera like effect to follow the car
    carCtx.save();
    carCtx.translate(0, -car.y+carCanvas.height*0.7);

    road.draw(carCtx);
    for(i=0;i<traffic.length;i++){
        traffic[i].draw(carCtx);
    }
    car.draw(carCtx);

    carCtx.restore();

    Visualizer.drawNetwork(networkCtx, car.brain);  //method call to properly visualize the given network
    // calls this method everytime it finishes
    // allows the illusion of movement
    requestAnimationFrame(animate);
}


// ran into VM problem where the date was wrong
// adding for new commit on the 3rd day of works correct date



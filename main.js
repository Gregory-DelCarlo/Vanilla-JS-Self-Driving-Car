// searches the html doc its on for an element with id #mainCanvas
const canvas = document.getElementById("mainCanvas");
// window refers to the size of the browser
canvas.width=300;


const ctx = canvas.getContext("2d");
const road = new Road(canvas.width/2, canvas.width*0.9);
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
    canvas.height = window.innerHeight;

    // adds camera like effect to follow the car
    ctx.save();
    ctx.translate(0, -car.y+canvas.height*0.7);

    road.draw(ctx);
    for(i=0;i<traffic.length;i++){
        traffic[i].draw(ctx);
    }
    car.draw(ctx);
    // calls this method everytime it finishes
    // allows the illusion of movement
    requestAnimationFrame(animate);
}


// ran into VM problem where the date was wrong
// adding for new commit on the 3rd day of works correct date



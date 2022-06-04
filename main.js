// searches the html doc its on for an element with id #mainCanvas
const canvas = document.getElementById("mainCanvas");
// window refers to the size of the browser
canvas.width=300;


const ctx = canvas.getContext("2d");
const road = new Road(canvas.width/2, canvas.width*0.9);
const car = new Car(road.getLaneCenter(1),400,40,60);

animate();

function animate(){
    car.update(road.borders);
    canvas.height = window.innerHeight;

    // adds camera like effect to follow the car
    ctx.save();
    ctx.translate(0, -car.y+canvas.height*0.7);

    road.draw(ctx);
    car.draw(ctx);
    // calls this method everytime it finishes
    // allows the illusion of movement
    requestAnimationFrame(animate);
}



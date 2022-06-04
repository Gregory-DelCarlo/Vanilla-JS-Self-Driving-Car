// searches the html doc its on for an element with id #mainCanvas
const canvas = document.getElementById("mainCanvas");
// window refers to the size of the browser
canvas.width=200;


const ctx = canvas.getContext("2d");
const car = new Car(100,100,30,50);

animate();

function animate(){
    car.update();
    canvas.height = window.innerHeight;
    car.draw(ctx);
    // calls this method everytime it finishes
    // allows the illusion of movement
    requestAnimationFrame(animate);
}



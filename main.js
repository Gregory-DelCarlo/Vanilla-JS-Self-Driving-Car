// searches the html doc its on for an element with id #mainCanvas
const canvas = document.getElementById("mainCanvas");
// window refers to the size of the browser
canvas.height = window.innerHeight;
canvas.width=200;


const ctx = canvas.getContext("2d");
const car = new Car(100,100,30,50);
// car.draw(ctx);

ctx.lineWidth = 10;

// Wall
ctx.strokeRect(75, 140, 150, 110);

// Door
ctx.fillRect(130, 190, 40, 60);

// Roof
ctx.beginPath();
ctx.moveTo(50, 140);
ctx.lineTo(150, 60);
ctx.lineTo(250, 140);
ctx.closePath();
ctx.stroke();



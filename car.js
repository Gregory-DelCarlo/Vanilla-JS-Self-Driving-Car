class Car{
    constructor(x,y,width,height){
        // stores information about itself (position, and size)
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        // instead of directly mainpulating the position of the car we can use speed and acceleration to create
        // the illusion of inertia and friction
        this.speed = 0;
        this.acceleration = 0.2;
        this.maxSpeed = 3;
        this.friction = 0.05;
        // zero being straight ahead this creates a variable we can use as a unit circle to rotate the car
        this.angle = 0;

        this.sensor = new Sensor(this); // pass this object to it's Sensor object
        this.controls = new Controls();
    }

    update(roadBorders){
        this.#updateY();
        this.#updateX();
        this.sensor.update(roadBorders); // pass boarder informatio from main to the sensors through the car
    }

    #updateY(){
    // on webpages (0,0) is the top left corner so moving -2 in y moves the car up the page
    if(this.controls.forward){
        this.speed += this.acceleration;
    }else if(this.controls.backward){
        this.speed -= this.acceleration;
    }

    // cap the speed of the car
    if (this.speed>this.maxSpeed){
        this.speed = this.maxSpeed;
    } else if (this.speed< -this.maxSpeed/2){
        this.speed = -this.maxSpeed/2;
    }

    // simulates friction this will cause the car to decelerate when a direction is not being pressed
    if (this.speed>0){
        this.speed -= this.friction;
    }else if (this.speed<0){
        this.speed += this.friction;
    }

    // full stop when force < friction
    if(Math.abs(this.speed)<this.friction) {
        this.speed = 0;
    }
    // moderate speed based on direction + amount the car is travelling left or right
    // basically as the angle of the car increases the acceleration forward is decreased
    // this stops the car from being able to move faster than it should when traveling at an angle
    this.y -= Math.cos(this.angle)*this.speed;
    }

    #updateX(){
        // basic check to see which direction we are moving and change steering if needed
        const flip = this.speed>0?1:-1;
        // rotates the car 3 degrees along its unit circle
        // instead of just moving the car left and right this will make the car "drive" in different directions
        if(this.controls.left){
            this.angle+=0.03*flip;
        }else if(this.controls.right){
            this.angle-=0.03*flip;
        }

        // update x based on the angle use sine to get a value 0-1 and scale by speed
        // basically as the angle of the car increases the speed traveled left or right
        // changes without pushing the vehicle passed its max speed
        this.x -= Math.sin(this.angle)*this.speed
    }

    draw(ctx){
        ctx.save();
        // tell the context where to center the rotation (the center of our car)
        ctx.translate(this.x, this.y);
        // rotate the car
        ctx.rotate(-this.angle)

        ctx.beginPath();
        ctx.fillRect(
            //sets the origin points to the center of the rectangle's size and draw out
            -this.width/2,
            -this.height/2,
            this.width,
            this.height
        );

        ctx.restore();

        this.sensor.draw(ctx);
    }

    
}


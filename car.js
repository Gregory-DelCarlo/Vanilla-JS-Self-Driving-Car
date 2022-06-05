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
        this.polygon = this.#createPolygon(); // generates polygon of the car rather than basic rectangle
        this.sensor.update(roadBorders); // pass boarder informatio from main to the sensors through the car
    }


    #createPolygon(){
        const points=[]; // will get a set of points, 1 for each corner of our car

        // to find these points we must find the distance from the center to the corner of the car (the "radius")
        // this is the same distance for each corner
        const rad = Math.hypot(this.width,this.height)/2; // in this case the hypotenuse is the diagonal bisect of the car
                                                          // half of this is equal to the distance from the center to a corner

        // we also will need the angle between the vertical bisect and this radius
        const hAngle = Math.atan2(this.width,this.height); // finds the arc tangent knowing width and height

        // add first point
        points.push({
            x: this.x-Math.sin(this.angle-hAngle)*rad,  //more fancy circle math that adjusts points location based on cars rotation
            y: this.y-Math.cos(this.angle-hAngle)*rad,   // rotates the coordinate right along the unit circle
        }); // this returns the top right corner of the car

        // add second point
        points.push({
            x: this.x-Math.sin(this.angle+hAngle)*rad, // rotates the coordinate left along the unit circle
            y: this.y-Math.cos(this.angle+hAngle)*rad
        }); // this returns the top left corner of the car

        // add third point
        points.push({
            x: this.x-Math.sin(Math.PI+this.angle-hAngle)*rad, // rotates the coordinate right along the unit circle
            y: this.y-Math.cos(Math.PI+this.angle-hAngle)*rad  // multiply by by to move to the bottom of the unit circle
        }); // this returns the bottom right corner of the car

        // add fourth point
        points.push({
            x: this.x-Math.sin(Math.PI+this.angle+hAngle)*rad, // rotates the coordinate left along the unit circle
            y: this.y-Math.cos(Math.PI+this.angle+hAngle)*rad
        }); // this returns the bottom left corner of the car

        return points;
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
        if(this.speed!=0){ // car cant rotate if its not moving
            // basic check to see which direction we are moving and change steering if needed
            const flip = this.speed>0?1:-1;
            // rotates the car 3 degrees along its unit circle
            // instead of just moving the car left and right this will make the car "drive" in different directions
            if(this.controls.left){
                this.angle+=0.03*flip;
            }else if(this.controls.right){
                this.angle-=0.03*flip;
            }
        }
        // update x based on the angle use sine to get a value 0-1 and scale by speed
        // basically as the angle of the car increases the speed traveled left or right
        // changes without pushing the vehicle passed its max speed
        this.x -= Math.sin(this.angle)*this.speed
    }

    draw(ctx){
        // bad practice: does not store coordinates of the edges of the car
        // ctx.save();
        // // tell the context where to center the rotation (the center of our car)
        // ctx.translate(this.x, this.y);
        // // rotate the car
        // ctx.rotate(-this.angle)

        // ctx.beginPath();
        // ctx.fillRect(
        //     //sets the origin points to the center of the rectangle's size and draw out
        //     -this.width/2,
        //     -this.height/2,
        //     this.width,
        //     this.height
        // );

        // ctx.restore();

        ctx.beginPath();
        ctx.moveTo(this.polygon[0].x,this.polygon[0].y) // polygon will contain an array of points to connect

        // more bad practice
        // for(i=1;i<this.polygon.length;i++){
        //     ctx.lineTo(this.polygon[i].x,this.polygon[i].y); // draw a line between each point of the polygon 
        // }

        this.polygon.forEach((polygon) => {
            ctx.lineTo(polygon.x, polygon.y);
        });

        ctx.fill();

        this.sensor.draw(ctx);
    }

    
}


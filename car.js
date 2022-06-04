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

        this.controls = new Controls();
    }

    update(){
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

        if(Math.abs(this.speed)<this.friction) {
            this.speed = 0;
        }
        // update y position based on speed (in px) of the car 
        this.y -= this.speed;
    }

    draw(ctx){
        ctx.beginPath();
        ctx.fillRect(
            //sets the origin points to the center of the rectangle's size
            this.x-this.width/2,
            this.y-this.height/2,
            this.width,
            this.height
        );
    }
}


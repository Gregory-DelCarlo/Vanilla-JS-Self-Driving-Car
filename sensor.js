class Sensor{
    // attach the sensor to the car
    constructor(car){
        this.car = car;
        this.rayCount=15;  // these will be our sensor that "reach out"
        this.rayLength=150;  //sets the length that our sensors "reach out" from the car
        this.raySpread = Math.PI * 2; // sets the spread along the unit circle of the car (45 dg)

        this.rays = []; // will hold all of the individual arrays
    }

    update(){
        this.#castRays();
    }

    #castRays(){
        this.rays=[];
        for(let i = 0; i<this.rayCount; i++){
            const rayAngle=lerp(  // magic circle math to get the rays where I want them
                this.raySpread/2, 
                -this.raySpread/2, 
                this.rayCount==1?0.5:i/(this.rayCount-1)  
            )                                
                + this.car.angle; //adjusts ray angle to face the proper direction in relation to the car
            const start = {x:this.car.x, y:this.car.y}
            const end = {x:this.car.x-
                                        Math.sin(rayAngle) * this.rayLength, // get the value on the unit circle of the car
                                                                             // scale by the ray length
                         y:this.car.y-
                                        Math.cos(rayAngle)*this.rayLength                                                    
                        };
            
            this.rays.push([start,end]) // form a segment between the start and end point of the ray
        }
    }

    draw(ctx) {
        // do this for each ray
        for(let i=0;i<this.rayCount;i++){
            ctx.beginPath();
            ctx.lineWidth=2;
            ctx.strokeStyle="yellow";

            //sets the segment points to those that were found 
            ctx.moveTo(
                this.rays[i][0].x,
                this.rays[i][0].y
            );

            ctx.lineTo(
                this.rays[i][1].x,
                this.rays[i][1].y
            );

            ctx.stroke();
        }
    }
}
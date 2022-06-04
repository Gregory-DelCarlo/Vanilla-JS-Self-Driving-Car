class Sensor{
    // attach the sensor to the car
    constructor(car){
        this.car = car;
        this.rayCount=15;  // these will be our sensor that "reach out"
        this.rayLength=350;  //sets the length that our sensors "reach out" from the car
        this.raySpread = Math.PI; // sets the spread along the unit circle of the car (45 dg)

        this.rays = []; // will hold all of the individual arrays
        this.readings = [];
    }

    update(roadBorders){
        this.#castRays();
        this.readings = [];

        for(let i = 0;i<this.rays.length;i++){ // get a reading of the borders from each array
            this.readings.push(
                this.#getReading(this.rays[i],roadBorders)
            );
        }
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

    #getReading(ray, roadBorders){
        let touches =[];

        for(let i=0;i<roadBorders.length;i++){
            const touch=getIntersection(  // return an x and y value and an offset (distance between the car and the collision)
                ray[0],
                ray[1],
                roadBorders[i][0],
                roadBorders[i][1]
            );
            if(touch){
                touches.push(touch);
            }
        }

        if (touches.length == 0){
            return null;
        }else {
            // const offsets = touches.map(touch => touch.offset); // get all the offsets of each touch
            // const minOffset=Math.min(...offsets); // find the smallest offset
            // return touches.find(touch => touch.offset == minOffset); // return the closest touch

            //better. only loops through the touches once instead of three times
            return touches.reduce((least, touch)=> {
                touch.offset <= least ? least = touch.offset : least;
            });
        }
    }



    draw(ctx) {
        // do this for each ray
        for(let i=0;i<this.rayCount;i++){
            let end = this.rays[i][1];
            if(this.readings[i]){
                end=this.readings[i];
            }

            ctx.beginPath();
            ctx.lineWidth=2;
            ctx.strokeStyle="yellow";

            //sets the segment points to those that were found 
            ctx.moveTo(
                this.rays[i][0].x,
                this.rays[i][0].y
            );
            
            // draw until a collision is found
            ctx.lineTo(
                end.x,
                end.y
            );

            ctx.stroke();

            
            // second segment is drawn for the rest of the ray after the collision
            ctx.beginPath();
            ctx.lineWidth=2;
            ctx.strokeStyle="black";

            //sets the segment points to those that were found 
            ctx.moveTo(
                this.rays[i][1].x,
                this.rays[i][1].y
            );

            ctx.lineTo(
                end.x,
                end.y
            );

            ctx.stroke();
        }
    }
}

function closest(least, touch) {
    return touch.offset <= least ? least = touch.offset : least;
}
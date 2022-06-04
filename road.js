class Road{
    constructor(x, width, laneCount=3){
        this.x = x;
        this.width = width;
        this.laneCount=laneCount;

        this.left=x-width/2;
        this.right=x+width/2;

        // extend road forever
        const infinity = 1000000;
        this.top = -infinity;
        this.bottom = infinity;

        //create road points for border segments
        const topLeft={x:this.left, y:this.top};
        const topRight={x:this.right, y:this.top};
        const bottomLeft={x:this.left, y:this.bottom};
        const bottomRight={x:this.right, y:this.bottom};

        //create borders for the car
        // use multiple arrays to create border segments of two points
        this.borders = [
            [topLeft, bottomLeft],
            [topRight, bottomRight]
        ];

    }

    getLaneCenter(laneIdx){
        const laneWidth = this.width/this.laneCount;

        return ( this.left +
                            laneWidth/2 + // start in the middle of the first lane
                                            laneIdx*laneWidth ) // move to the center lane
    }


    draw(ctx){
        ctx.lineWidth=5;
        ctx.strokeStyle="white";
        
        // use linear interpolation to get the x placement of the inner lanes
        for(let i=1; i<=this.laneCount-1;i++){
            // from left to write, using percentage based on total lanes
            const x = lerp(
                this.left,
                this.right,
                i/this.laneCount
            );

            // draw the middle lanes of the road
            ctx.setLineDash([20,20]);

            ctx.beginPath();
            ctx.moveTo(x, this.top); //sets starting point for the draw
            ctx.lineTo(x, this.bottom); // draws a line from starting point to given point
            ctx.stroke();
        }

        // draw the game borders

        ctx.setLineDash([]);
        this.borders.forEach(border => {
            ctx.beginPath();
            ctx.moveTo(border[0].x,border[0].y);
            ctx.lineTo(border[1].x,border[1].y);
            ctx.stroke();
        })
    }
}

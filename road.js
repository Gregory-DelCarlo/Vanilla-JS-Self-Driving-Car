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
        
        // use linear interpolation to get the x placement of the lanes
        for(let i=0; i<=this.laneCount;i++){
            // from left to write, using percentage based on total lanes
            const x = lerp(
                this.left,
                this.right,
                i/this.laneCount
            );

            // draw the lanes of the road, add dashes if they are middle names
            (i>0 && i<this.laneCount) ? ctx.setLineDash([20,20]) : ctx.setLineDash([]);

            ctx.beginPath();
            ctx.moveTo(x, this.top);
            ctx.lineTo(x, this.bottom);
            ctx.stroke();
        }

    }
}

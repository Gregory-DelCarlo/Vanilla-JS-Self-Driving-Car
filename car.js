class Car{
    constructor(x,y,width,height){
        // stores information about itself (position, and size)
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
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
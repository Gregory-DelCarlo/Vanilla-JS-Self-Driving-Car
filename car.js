class Car{
    constructor(x,y,width,height){
        // stores information about itself (position, and size)
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.controls = new Controls();
    }

    update(){
        // on webpages (0,0) is the top left corner so moving -2 in y moves the car up the page
        if(this.controls.forward){
            this.y-=2;
        }else if(this.controls.backward){
            this.y+=2;
        }
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


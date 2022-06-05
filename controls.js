class Controls {
    constructor(type) {
        this.forward = false;
        this.backward = false;
        this.left = false;
        this.right = false;
        //listen whenever this class is intialized
        switch(type){
            case "PC":
                this.#addKeyboardListeners();
                break;
            case "NPC":
                this.forward = true;
                break;
        }
    }

    // create private method to listen for keyboard input

    #addKeyboardListeners(){
        // use arrow function here to avoid inheritance issues
        document.onkeydown=(event)=>{
            switch(event.key) {
                case "ArrowUp":
                    this.forward = true;
                    break;
                case "ArrowDown":
                    this.backward = true;
                    break;
                case "ArrowLeft":
                    this.left = true;
                    break;
                case "ArrowRight":
                    this.right = true;
                    break;
            }
        }
        // stops input when key is released
        document.onkeyup=(event)=>{
            switch(event.key) {
                case "ArrowUp":
                    this.forward = false;
                    break;
                case "ArrowDown":
                    this.backward = false;
                    break;
                case "ArrowLeft":
                    this.left = false;
                    break;
                case "ArrowRight":
                    this.right = false;
                    break;
            }
        }
    }
}
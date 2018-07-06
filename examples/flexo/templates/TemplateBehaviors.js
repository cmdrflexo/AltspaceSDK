BehaviorTemplate = function(printOut) {

    this.printOut = printOut;

    this.awake = function(parent, scene) {
        this.object3d = parent;
    }

    this.update = function(deltaTime) {
        console.log(this.printOut);
    }
}
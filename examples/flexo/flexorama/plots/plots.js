
function Plot(owner, x, z) {
    this.owner = owner;
    this.position = {x: x, z: z};
}


// BEHAVIORS
PlotUserInfo = function(head) {

    this.awake = function(parent, scene) {
        this.object3d = parent;
    }

    this.update = function(deltaTime) {
        if(head) console.log(head.position);
    }
}

Hover = function(position) {
    this.timer = 0;
    this.yPos;
    this.ran = Math.random();
    this.position = position;
    // this.ran = 1;
    this.awake = function(parent) {
        this.object3d = parent;
        this.yPos = this.object3d.position.y;
    }
    this.update = function(deltaTime) {
        this.timer += deltaTime * 0.001;
        this.object3d.position.y = this.yPos + 0.1 + 
            // Math.sin(this.timer) * (10 * this.ran);
            Math.sin(this.timer) * (this.position.z * 0.1);
    }
}
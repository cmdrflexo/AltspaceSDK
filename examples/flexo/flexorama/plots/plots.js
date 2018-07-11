
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

Hover = function(userHead) {
    this.timer = 0;
    this.yPos;
    this.ran = Math.random();
    this.userHead = userHead;
    // this.position = position;
    // this.ran = 1;
    this.awake = function(parent) {
        this.object3d = parent;
        this.yPos = this.object3d.position.y;
    }

    this.update = function(deltaTime) {
        this.timer += deltaTime * 0.001;
        this.object3d.position.y = this.yPos - 
        0.005 * GetDistance(this.object3d.position, this.userHead.position) * GetDistance(this.object3d.position, this.userHead.position);
            // Math.sin(this.timer) * (10 * this.ran);
            // Math.sin(this.timer) * 0.001 * GetDistance(this.object3d.position, this.userHead.position) * GetDistance(this.object3d.position, this.userHead.position);//(this.position.z * 0.1);
    }

    function GetDistance(v1, v2) {
        var dx = v1.x - v2.x;
        var dz = v1.z - v2.z;
        return Math.sqrt(dx * dx + dz * dz);
    }
}

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
        this.object3d.position.y = this.yPos - 0.0025 
            * GetDistance(this.object3d.position, this.userHead.position) 
            * GetDistance(this.object3d.position, this.userHead.position);
    }

    function GetDistance(v1, v2) {
        var dx = v1.x - v2.x;
        var dz = v1.z - v2.z;
        return Math.sqrt(dx * dx + dz * dz);
    }
}

Fall = function() {
    this.speed = 0;
    this.awake = function(parent, scene) {
        this.object3d = parent;
    }

    this.update = function(deltaTime) {
        this.speed += 0.98 * deltaTime * 0.001;
        this.object3d.position.y += this.speed;
    }
}

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

Floaty = function(x, z, movementScale = 1) {
    this.x = x;
    this.z = z;
    this.timer = 0;
    this.yPos;
    this.ran = Math.random();
    this.scale = movementScale;
    
    this.awake = function(parent) {
        this.object3d = parent;
        this.yPos = this.object3d.position.y;
    }

    this.update = function(deltaTime) {
        this.timer += deltaTime * 0.001;
        this.object3d.position.y = this.yPos + Math.abs(
            Math.sin(this.timer) * this.scale *
            // 0.3 * (this.x % 2 + 0.5) * (this.z % 2 + 0.5) * 
            this.ran + 0.05
        );
        this.object3d.rotation.y = this.timer * (1 - this.ran) * 2;
        // if(this.timer >= 03) {
        //     this.ran = Math.random();
        //     this.timer = 0;
        // }
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

Icon = function(head, large = false, isHead = false) {
    this.timer = 0;
    this.userHead = head;
    this.large = large;
    this.isHead = isHead;
    this.awake = function(parent, scene) {
        this.object3d = parent;
    }
    this.update = function(deltaTime) {
        this.timer += deltaTime;
        this.scale = this.large ? 500 : 0.002;
        this.height = this.large ? -550 : 550;
        if(this.isHead) {
            this.object3d.rotation.set(
                this.userHead.rotation.x,
                this.userHead.rotation.y,
                this.userHead.rotation.z,
                this.userHead.rotation.w
            );
            
        }
        if(large) {
            this.object3d.position.set(
                (this.userHead.position.x - 1) * this.scale,
                isHead ? 100 : 0.5 * this.scale / 2 - 550,
                (this.userHead.position.z - 10) * this.scale
            );
        } else {
            this.object3d.position.set(
                this.userHead.position.x * this.scale + 1, 
                ((this.userHead.position.y + this.height) * this.scale) + 0.7, 
                this.userHead.position.z * this.scale + 10
            );
        }
        // if(this.timer >= 1000 && this.userHead) {
        //     this.timer = 0;
        //     if(large)
        //         console.log(this.object3d.rotation.y);
        // }
    }
}
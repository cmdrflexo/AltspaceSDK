SkyRotate = function(time) {
    if(time == 0) time = 1;
    this.rotationSpeed =  (360 / time) * (Math.PI / 180) * 0.001;

    this.awake = function(parent, scene) {
        this.object3d = parent;
    }

    this.update = function(deltaTime) {
        this.object3d.rotation.z += deltaTime * this.rotationSpeed;
    }
}

SkyFade = function(delaySeconds, fadeSpeed) {

    this.awake = function(parent, scene) {
        this.object3d = parent;
    }

    this.fade = 10;
    this.opacity = 0;
    this.update = function(deltaTime) {
        this.opacity += deltaTime / this.fade * 0.001;
        // this.opacity /= this.fade;
        // console.log(this.opacity);
        this.opacity = THREE.Math.clamp(this.opacity, 0, 1);
        if(this.opacity == 0 || this.opacity == 1) this.fade = -this.fade;
        this.object3d.material.opacity = this.opacity;
    }
}

SkyRotateZ = function(time) {
    this.time = time == 0 ? 1 : time;
    this.rotationSpeed = (360 / time) * (Math.PI / 180) * 0.001;

    this.awake = function(parent, scene) {
        this.object3d = parent;
    }

    this.update = function(deltaTime) {
        this.object3d.rotation.z += deltaTime * this.rotationSpeed;
    }
}

MoonPhasesTest = function(geometry, material) {
    this.geometry = geometry;
    this.material = material;

    this.awake = function(parent, scene) {this.object3d = parent;}

    this.delay = 3000;
    this.timer = 0;
    this.phase = 0;
    this.side = 0;
    this.update = function(deltaTime) {
        this.timer += deltaTime;
        if(this.timer >= this.delay) {
            this.timer = 0;
            if(this.phase < 4) {
                this.material.map.offset.set(this.side * 0.5, this.phase * 0.25);
                // this.material.needsUpdate = true;
                // this.geometry.uvsNeedUpdate = true;
                this.phase++;
            } else {
                this.phase = 0;
                this.side = 1 - this.side;
            }
        }
    }
}

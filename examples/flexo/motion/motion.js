SkyRotate = function(time) {
    if(time == 0) time = 1;
    this.rotationSpeed =  (360 / time) * (Math.PI / 180) * 0.001;

    this.awake = function(parent, scene) {
        this.object3d = parent;
    }

    this.update = function(deltaTime) {
        this.object3d.rotation.y += deltaTime * this.rotationSpeed;
    }
}

SkyFade = function(delaySeconds, fadeSpeed) {

    this.update = function(deltaTime) {
        this.object3d.material.opacity = 1;
        // this.object3d.material.opacity -= 0.1 * deltaTime;
        // if(this.object3d.material.opacity <= 0)
        //     this.object3d.material.opacity = 1;
    }
}
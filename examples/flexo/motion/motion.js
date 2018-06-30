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

    this.awake = function(parent, scene) {
        this.object3d = parent;
    }

    var fade = 0.3;
    var opacity = 0;
    this.update = function(deltaTime) {
        opacity += fade * deltaTime * 0.001;
        opacity = THREE.Math.clamp(opacity, 0, 1);
        if(opacity == 0 || opacity == 1) fade = -fade;
        this.object3d.material.opacity = opacity;
        // console.log(opacity);
    }
}

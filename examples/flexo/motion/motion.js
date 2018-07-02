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

    var fade = 0.05;
    var opacity = 0;
    this.update = function(deltaTime) {
        opacity += fade * deltaTime * 0.001;
        opacity = THREE.Math.clamp(opacity, 0, 1);
        if(opacity == 0 || opacity == 1) fade = -fade;
        this.object3d.material.opacity = opacity;
    }
}

MoonPhasesTest = function(geometry, material) {

    this.awake = function(parent, scene) {
        this.object3d = parent;
    }

    var delay = 1000;
    var timer = 0;
    var i = 0;
    this.update = function(deltaTime) {
        timer += deltaTime;
        // console.log(timer);
        if(timer >= delay) {
            console.log("tick");
            timer = 0;
            if(i < 4) {
                console.log("i = " + i);
                material.map.offset.set(0, i * 0.25);
                material.needsUpdate = true;
                geometry.uvsNeedUpdate = true;
                i++;
            } else {
                i = 0;
            }
        }
    }
}

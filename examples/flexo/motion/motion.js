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
SkyRotate = function(time) {
    
    this.rotationSpeed = degressPerSecond  * (Math.PI / 180) * 0.001;

    var full = 1 / 360; // 0.002777

    this.rotationSpeed =  

    this.awake = function(parent, scene) {
        this.object3d = parent;
    }

    this.update = function(deltaTime) {
        this.object3d.rotation.z += deltaTime * this.rotationSpeed;
    }
}
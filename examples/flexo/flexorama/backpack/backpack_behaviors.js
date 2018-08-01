
EyeIdle = function(backpack) {
    this.timer = 0;
    this.pack = backpack;
    this.awake = function(parent) {
        this.object3d = parent;
    }
    this.update = function(deltaTime) {
        this.timer += deltaTime * 0.001;
        if(this.timer >= 1) {
            this.timer = 0;
            this.pack.arm02.rotation.y = deltaTime;
            var eyePitch = (Math.random() * 90) - 45;
            this.pack.eye.rotation.x = THREE.Math.degToRad(eyePitch);
        }
    }
}

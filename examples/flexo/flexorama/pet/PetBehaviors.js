Follower = function(followTarget, minDistance, maxDistance, moveSpeed) {

    this.followTarget = followTarget;
    this.minDistance = minDistance;
    this.maxDistance = maxDistance;
    this.moveSpeed = moveSpeed;

    this.move = false;

    this.awake = function(parent, scene) {
        this.object3d = parent;
    }

    this.update = function(deltaTime) {
        if(this.followTarget) {
            this.dist = GetDistance(
                this.object3d.position,
                this.followTarget.position
            );

            if(this.dist > this.maxDistance)
                this.move = true;
            if(this.dist <= this.minDistance)
                this.move = false;

            if(this.move) {
                this.moveDir = GetMoveDirection(
                    this.object3d.position,
                    this.followTarget.position
                );
                
                this.object3d.position.x = this.moveDir.x * this.moveSpeed * deltaTime * 0.001;
                this.object3d.position.z = this.moveDir.z * this.moveSpeed * deltaTime * 0.001;

                console.log(
                    "max: " + maxDistance +
                    ", min: " + minDistance
                );

                console.log(
                    "this.object3d.position: " + 
                    this.object3d.position.x + ", " +
                    this.object3d.position.z
                );
            }
        }

        
    }

    function GetDistance(v1, v2) {
        var dx = v1.x - v2.x;
        var dy = v1.y - v2.y;
        var dz = v1.z - v2.z;
        return Math.sqrt(dx*dx + dy*dy + dz*dz);
    }

    function GetMoveDirection(v1, v2) {
        return new THREE.Vector3(v2.x - v1.x, v2.y - v1.y, v2.z - v1.z);
    }

}

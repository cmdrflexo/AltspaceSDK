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
                console.log("this.dist: " + this.dist);
                console.log("this.moveDir: " + this.moveDir);
                // this.object3d.position.set(
                //     moveDir.x * this.moveSpeed * deltaTime, 
                //     0.25, 
                //     moveDir.z * this.moveSpeed * deltaTime
                // );
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
        return v2 - v1;
    }

}

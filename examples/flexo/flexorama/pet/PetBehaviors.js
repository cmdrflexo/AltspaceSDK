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
            var dist = GetDistance(
                this.object3d.position,
                this.followTarget.position
            );

            if(dist > maxDistance)
                this.move = true;
            if(dist <= minDistance)
                this.move = false;

            if(this.move) {
                var moveDir = GetMoveDirection(
                    this.object3d.position,
                    this.followTarget.position
                );
                this.object3d.position.x = moveDir.x * this.moveSpeed * deltaTime;
                this.object3d.position.z = moveDir.z * this.moveSpeed * deltaTime;
            }
        }

        // this.object3d.position.set(
        //     this.followTarget.position.x, 
        //     0.25, 
        //     this.followTarget.position.z
        // );
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

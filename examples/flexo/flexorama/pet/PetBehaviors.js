Follower = function(followTarget, minDistance, maxDistance, moveSpeed, fhead) {

    this.followTarget = followTarget;
    this.minDistance = minDistance;
    this.maxDistance = maxDistance;
    this.moveSpeed = moveSpeed;

    this.fhead = fhead;

    this.moveTowards = false;
    this.moveAway = false;

    this.rotation = 0;

    this.awake = function(parent, scene) {
        this.object3d = parent;
    }

    this.update = function(deltaTime) {
        if(this.followTarget) {

            this.fhead.position.set(
                this.object3d.position.x, 0.5, this.object3d.position.z
            );

            this.dist = GetDistance(
                this.object3d.position,
                this.followTarget.position
            );

            if(this.dist > this.maxDistance)
                this.moveTowards = true;
            if(this.dist <= this.minDistance)
                this.moveTowards = false;

            this.moveAway = this.dist < this.minDistance / 2;

            this.moveDir = GetMoveDirection(
                this.object3d.position,
                this.followTarget.position
            );

            this.moveDirNorm = this.moveDir.clone().normalize();

            this.axis = GetRotateAxis(this.moveDir).normalize();
            this.rotate = THREE.Math.degToRad(0.36 * deltaTime);
            if(this.moveTowards || this.moveAway)
                this.object3d.rotateOnWorldAxis(
                    this.axis,
                    this.moveTowards ? this.rotate : -this.rotate
                );

            if(this.moveTowards) {
                this.object3d.position.x += this.moveDir.x * this.moveSpeed * deltaTime * 0.001;
                this.object3d.position.z += this.moveDir.z * this.moveSpeed * deltaTime * 0.001;
            } else if(this.moveAway) {
                this.object3d.position.x -= this.moveDirNorm.x * this.moveSpeed * deltaTime * 0.001;
                this.object3d.position.z -= this.moveDirNorm.z * this.moveSpeed * deltaTime * 0.001;
            }
        }

        
    }

    function GetDistance(v1, v2) {
        var dx = v1.x - v2.x;
        var dz = v1.z - v2.z;
        return Math.sqrt(dx * dx + dz * dz);
    }

    function GetMoveDirection(v1, v2) {
        return new THREE.Vector3(v2.x - v1.x, 0, v2.z - v1.z);
    }

    function GetRotateAxis(travelVector) {
        var rads = THREE.Math.degToRad(-90);
        return new THREE.Vector3(
            travelVector.x * Math.cos(rads) - travelVector.z * Math.sin(rads), 0,
            travelVector.x * Math.sin(rads) - travelVector.z * Math.cos(rads)
        );
    }
}

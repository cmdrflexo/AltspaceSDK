Follower = function(followTarget, minDistance, maxDistance, moveSpeed) {

    this.followTarget = followTarget;
    this.minDistance = minDistance;
    this.maxDistance = maxDistance;
    this.moveSpeed = moveSpeed;

    this.moveTowards = false;
    this.moveAway = false;

    this.rotation = 0;

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
                this.moveTowards = true;
            if(this.dist <= this.minDistance)
                this.moveTowards = false;

            this.moveAway = this.dist < this.minDistance / 2;

            this.moveDir = GetMoveDirection(
                this.object3d.position,
                this.followTarget.position
            );

            this.rotation += deltaTime * 0.01;
            // console.log("this.rotation: " + this.rotation);
            // console.log("GetRotateAxis(this.moveDir.normalize): " + GetRotateAxis(this.moveDir.normalize));
            this.object3d.rotateOnAxis(
                GetRotateAxis(this.moveDir.normalize()),
                // GetRotateAxis(this.moveDir),
                this.rotation
            );

            if(this.moveTowards) {
                this.object3d.position.x += this.moveDir.x * this.moveSpeed * deltaTime * 0.001;
                this.object3d.position.z += this.moveDir.z * this.moveSpeed * deltaTime * 0.001;
                // this.object3d.rotation.x += THREE.Math.degToRad(0.01 * deltaTime);
            }
            if(this.moveAway) {
                this.object3d.position.x -= this.moveDir.x * this.moveSpeed * deltaTime * 0.001;
                this.object3d.position.z -= this.moveDir.z * this.moveSpeed * deltaTime * 0.001;
                // this.object3d.rotation.x -= THREE.Math.degToRad(0.01 * deltaTime);
            }
        }

        
    }

    function GetDistance(v1, v2) {
        var dx = v1.x - v2.x;
        var dz = v1.z - v2.z;
        return Math.sqrt(dx*dx + dz*dz);
    }

    function GetMoveDirection(v1, v2) {
        return new THREE.Vector3(v2.x - v1.x, 0, v2.z - v1.z);
    }

    function GetRotateAxis(travelVector) {
        var rads = THREE.Math.degToRad(-90);
        return new THREE.Vector3(
            travelVector.x * Math.cos(rads) - travelVector.y * Math.sin(rads), 0,
            travelVector.x * Math.sin(rads) - travelVector.y * Math.cos(rads)
        );
    }

    /*
    static double[] RotateVector2d(double x, double y, double degrees) {
        double[] result = new double[2];
        result[0] = x * Math.Cos(degrees) - y * Math.Sin(degrees);
        result[1] = x * Math.Sin(degrees) + y * Math.Cos(degrees);
        return result;
    }
    */

}

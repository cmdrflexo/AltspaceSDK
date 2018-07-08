AttentionLook = function(lookTarget, minLook, maxLook, tiltX) {

    this.lookTarget = lookTarget;
    this.minLook = minLook;
    this.maxLook = maxLook;
    this.tiltX = tiltX;

    this.zPos = 0;

    this.awake = function(parent) {
        this.object3d = parent;
    }

    this.update = function(deltaTime) { 
        if(this.lookTarget) {       
            // this.moveDir = GetMoveDirection(
            //     this.object3d.position,
            //     this.lookTarget.position
            // );
            // this.object3d.lookAt(this.object3d.position + this.moveDir);
            this.object3d.lookAt(this.lookTarget.position);
            this.object3d.rotateOnAxis(
                new THREE.Vector3(1, 0, 0), 
                THREE.Math.degToRad(this.tiltX)
            );
        }
    }
}

TESTTailWag = function() {
    this.timer = 0;
    this.awake = function(parent) {
        this.object3d = parent;
    }
    this.update = function(deltaTime) {
        this.timer += deltaTime * 0.001;
        this.object3d.rotation.y = THREE.Math.degToRad(15 * Math.sin(this.timer * 20));
    }
}

TESTTurning = function(target) {
    this.timer = 0;

    // this.root = root;
    this.target = target;

    this.awake = function(parent) {
        this.object3d = parent;
    }

    this.update = function(deltaTime) {
        this.timer = this.timer < 250 ? this.timer + deltaTime : 0;

        // this.root.rotateOnAxis(new THREE.Vector3(0, 1, 0), deltaTime * 0.001);

        this.targetWorldPos = this.target.getWorldPosition(this.targetWorldPos);
        
        this.heading;
        this.heading = this.object3d.getWorldDirection(this.heading);
        
        this.targetDir = GetMoveDirection(
            this.object3d.position, 
            this.targetWorldPos
        ).normalize();

        this.cross = this.heading.clone().cross(this.targetDir);

        if(this.cross)
            this.object3d.rotateOnAxis(this.cross, deltaTime * 0.001);

        // if(this.timer == 0) 
        //     console.log(this.cross);
        //     console.log(this.targetWorldPos);

    }

    function GetDistance(v1, v2) {
        var dx = v1.x - v2.x;
        var dz = v1.z - v2.z;
        return Math.sqrt(dx * dx + dz * dz);
    }

    function GetMoveDirection(v1, v2) {
        return new THREE.Vector3(v2.x - v1.x, 0, v2.z - v1.z);
    }
}

Follower = function(followTarget, minDistance, maxDistance, moveSpeed, fhead) {

    this.followTarget = followTarget;
    this.minDistance = minDistance;
    this.maxDistance = maxDistance;
    this.moveSpeed = moveSpeed;

    this.fhead = fhead;

    this.moveTowards = false;
    this.moveAway = false;

    this.rotation = 0;

    this.timer = 0;

    this.isBall = true;
    this.isDog = false;

    this.awake = function(parent, scene) {
        this.object3d = parent;
    }

    

    this.update = function(deltaTime) {
        
        this.timer += deltaTime * 0.001;
        if(this.timer > 1) this.timer = 0;

        if(this.followTarget) {

            this.fhead.position.set(
                this.object3d.position.x, 0.25, this.object3d.position.z
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

            // this.worldPos = this.object3d.getWorldPosition(this.worldPos);
            this.object3d.lookAt(this.followTarget.position);

            // if(this.timer == 0) 
            //     console.log(THREE.Math.radToDeg(this.object3d.rotation.y));

            this.moveDir = GetMoveDirection(
                this.object3d.position,
                this.followTarget.position
            );

            this.moveDirNorm = this.moveDir.clone().normalize();
            
            // if(this.isBall) {
            this.axis = GetRotateAxis(this.moveDir).normalize();
            this.rotate = THREE.Math.degToRad(0.36 * deltaTime);
            if(this.moveTowards || this.moveAway)
                this.object3d.rotateOnWorldAxis(
                    this.axis,
                    this.moveTowards ? this.rotate : -this.rotate
                );
            // }

            if(this.isDog) {
                // console.log(this.object3d.position.angleTo(this.followTarget.position));
                this.dogWorldPos = this.object3d.getWorldPosition(this.dogWorldPos);
                // this.userWorldPos = this.followTarget.getWorldPosition(this.userWorldPos);


                
                if(this.object3d.position.angleTo(this.followTarget.position) < 0.3)// THREE.Math.degToRad(1))
                    this.object3d.rotateOnAxis(
                        new THREE.Vector3(0, 1, 0), 
                        THREE.Math.degToRad(1)
                    );
            }

            if(this.moveTowards) {
                this.object3d.position.x += this.moveDir.x * this.moveSpeed * deltaTime * 0.001;
                this.object3d.position.z += this.moveDir.z * this.moveSpeed * deltaTime * 0.001;
            } else if(this.moveAway) {
                this.object3d.position.x -= this.moveDirNorm.x * this.moveSpeed * deltaTime * 0.003;
                this.object3d.position.z -= this.moveDirNorm.z * this.moveSpeed * deltaTime * 0.003;
            }
        }

        
    }

    function GetTurnAngle(o3d, tPos) {
        var forward = o3d.getWorldDirection(forward);
        var h = GetDistance(o3d.position, tPos);
        var p = o3d.position + (forward * h);
        var o = GetDistance(tPos, p) * 0.5;
        return Math.arcsin(o / h) * 0.5;
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

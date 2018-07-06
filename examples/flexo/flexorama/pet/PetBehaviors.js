Follower = function(_followTarget, minDistance, maxDistance) {

    this.followTarget = _followTarget;

    this.awake = function(parent, scene) {
        this.object3d = parent;
    }

    this.update = function(deltaTime) {
        // get distance to target
        // if target distance > maxdistance
        // var f = GetDistance(this.object3d.position, this.followTarget.position);
        // console.log("Distance" + f);
        // console.log("follower: " + this.object3d.position);
        if(_followTarget)
            console.log("target: " + _followTarget.position);
        // this.object3d.position.set(
        //     this.followTarget.position.x, 0.25, this.followTarget.position.z
        // );
    }

    function GetDistance(v1, v2) {
        var dx = v1.x - v2.x;
        var dy = v1.y - v2.y;
        var dz = v1.z - v2.z;
        return Math.sqrt(dx*dx + dy*dy + dz*dz);
    }

}

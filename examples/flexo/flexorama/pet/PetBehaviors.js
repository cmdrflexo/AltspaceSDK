Follower = function(followTarget, minDistance, maxDistance) {

    this.followTarget = followTarget;

    this.awake = function(parent, scene) {
        this.object3d = parent;
    }

    this.update = function(deltaTime) {
        // get distance to target
        // if target distance > maxdistance
    }

}

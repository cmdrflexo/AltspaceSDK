PlotUserInfo = function(head) {

    this.awake = function(parent, scene) {
        this.object3d = parent;
    }

    this.update = function(deltaTime) {
        if(head) console.log(head.position);
    }
}
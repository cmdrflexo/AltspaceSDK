altspace.getThreeJSTrackingSkeleton().then(function(_skeleton) {
    var skeleton = _skeleton;
    sim.scene.add(skeleton);
    var head = skeleton.getJoint("Head");
});
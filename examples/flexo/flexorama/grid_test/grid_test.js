var testing = true;
if(!testing) altspaceutil.getFullspaceEnclosure().then(function(enclosure) { start(); });
else start();

var boxURL = "https://cmdrflexo.github.io/AltspaceSDK-Flexo/examples/flexo/flexorama/models/";

function start() {
    sim = new altspace.utilities.Simulation();

    loadModel(
        boxURL + "uv_box.obj",
        boxURL + "uv_box.mtl",
        new THREE.Vector3(0, 2, 0),
        new THREE.Vector3(1, 1, 1),
        1//(1 / 16) * 0.66
    );

}

function loadModel(objFilename, mtlFilename, position, size, scale, follow = false) {
    var loader = new altspace.utilities.shims.OBJMTLLoader();
    loader.load(
        objFilename, mtlFilename, 
        function(obj) {
            obj.position.x = position.x * scale + 1;
            obj.position.y = position.y * scale + 0.4125;
            obj.position.z = position.z * scale;
            obj.rotation.y = THREE.Math.degToRad(180);
            obj.scale.set(size.x * scale, size.y * scale, size.z * scale);
            sim.scene.add(obj);
        }
    );
}

var testing = false;
if(!testing) altspaceutil.getFullspaceEnclosure().then(function(enclosure) { start(); });
else start();

var boxURL = "https://cmdrflexo.github.io/AltspaceSDK-Flexo/examples/flexo/flexorama/models/";

function start() {
    sim = new altspace.utilities.Simulation();

    var plots = new Array();

    for(var z = 0; z < 10 ; z++) {
        for(var x = 0; x < 10 ; x++) {
            if(x == 5 && z == 5) {
                loadModel(
                    boxURL + "uv_box.obj",
                    "https://cmdrflexo.github.io/AltspaceSDK-Flexo/examples/flexo/flexorama/models/ghast/ghast.mtl",
                    new THREE.Vector3(1600, 160, 1600),
                    new THREE.Vector3(1024, 1024, 1024),
                    (1 / 16),
                    true
                );
            }
            plots.push(new Plot("plot["+x+","+z+"]", x, z));
            loadModel(
                boxURL + "uv_box.obj",
                boxURL + "uv_box.mtl",
                new THREE.Vector3(x * 10, -10 + ((z + x) * 0.5), z * 10),
                new THREE.Vector3(10, 0.5, 10),
                1
            );
        }
    }
}

function loadModel(objFilename, mtlFilename, position, size, scale, follow = false) {
    var loader = new altspace.utilities.shims.OBJMTLLoader();
    loader.load(
        objFilename, mtlFilename, 
        function(obj) {
            obj.position.x = position.x * scale + 1;
            obj.position.y = position.y * scale;
            obj.position.z = position.z * scale;
            obj.rotation.y = THREE.Math.degToRad(180);
            obj.scale.set(size.x * scale, size.y * scale, size.z * scale);
            obj.addBehavior(new Hover(position));
            sim.scene.add(obj);
            if(follow)
                obj.rotation.y = THREE.Math.degToRad(90 - 45);
        }
    );
}

var testing = false;
if(!testing) altspaceutil.getFullspaceEnclosure().then(function(enclosure) { start(); });
else start();

var boxURL = "https://cmdrflexo.github.io/AltspaceSDK-Flexo/examples/flexo/flexorama/models/";

function start() {
    sim = new altspace.utilities.Simulation();

    var plots = new Array();

    for(var z = 0; z < 10 ; z++) {
        for(var x = 0; x < 10 ; x++) {
            plots.push(new Plot("plot["+x+","+z+"]", x, z));
            loadModel(
                boxURL + "uv_box.obj",
                boxURL + "uv_box.mtl",
                new THREE.Vector3(x * 10, -0.05, z * 10),
                new THREE.Vector3(10, 0.1, 10),
                1
            );
        }
    }

    // plots.push(new Plot("Flexo", 0, 0));
    // plots.push(new Plot("Holly", 0, 0));
    // plots.push(new Plot("Nicole", 0, 0));
    // plots.push(new Plot("Bender", 0, 0));
    // plots.push(new Plot("Kenny", 0, 0));
    
    // console.log("Plot Owners: ");
    // for(var i = 0; i < plots.length; i++)
    //     console.log(plots[i].owner);
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
            sim.scene.add(obj);
        }
    );
}

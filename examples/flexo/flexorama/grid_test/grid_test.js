var testing = false;
if(!testing) altspaceutil.getFullspaceEnclosure().then(function(enclosure) { start(); });
else start();

var boxURL = "https://cmdrflexo.github.io/AltspaceSDK-Flexo/examples/flexo/flexorama/models/";

// if(x == 5 && z == 5) {
//     loadModel(
//         boxURL + "uv_box.obj",
//         "https://cmdrflexo.github.io/AltspaceSDK-Flexo/examples/flexo/flexorama/models/ghast/ghast.mtl",
//         new THREE.Vector3(1600, 160, 1600),
//         new THREE.Vector3(1024, 1024, 1024),
//         (1 / 16),
//         true
//     );
// }

var skyNightURL = "https://cmdrflexo.github.io/AltspaceSDK-Flexo/examples/flexo/images/sky/galaxy.jpg";

function start() {
    sim = new altspace.utilities.Simulation();

    // function Test() {
    //     var url = "https://jcanuet.000webhostapp.com/flexo/flexorama/database/ajax/name.php";
    //     var testOutput = "Flexo";

    //     $.post(url, {name: testOutput}, function(data) {
    //         console.log(data);
    //     });
    // }

    // Test();

    // var plots = new Array();

    var sky = new THREE.Mesh(
        new THREE.SphereGeometry(1500, 32, 16),
        new THREE.MeshBasicMaterial({
            color: 0xffffff,
            map: new THREE.Texture({
                src: altspaceutil.getAbsoluteURL(skyNightURL)
            })
        })
    );
    sky.scale.x = -1;
    sim.scene.add(sky);


    altspace.getThreeJSTrackingSkeleton().then(function(_skeleton) {
        var skeleton = _skeleton;
        sim.scene.add(skeleton);
        var head = skeleton.getJoint("Head");

        var size = 20;
        var blockSize = 10;
        for(var z = 0; z < size; z++) {
            for(var x = 0; x < size; x++) {
                loadModel(
                    boxURL + "uv_box.obj",
                    boxURL + "uv_box_grass.mtl",
                    new THREE.Vector3((x - (size/2)) * blockSize, -blockSize/2, (z - (size/2)) * blockSize),
                    new THREE.Vector3(blockSize, blockSize/3, blockSize),
                    1,
                    false,
                    head
                );
            }
        }

    });

    
}

function loadModel(objFilename, mtlFilename, position, size, scale, follow = false, userHead) {
    var loader = new altspace.utilities.shims.OBJMTLLoader();
    loader.load(
        objFilename, mtlFilename, 
        function(obj) {
            obj.position.x = position.x * scale + 1;
            obj.position.y = position.y * scale;
            obj.position.z = position.z * scale;
            obj.scale.set(size.x * scale, size.y * scale, size.z * scale);
            obj.addBehavior(new Hover(userHead));
            // obj.addBehavior(new Fall());
            sim.scene.add(obj);
        }
    );
}

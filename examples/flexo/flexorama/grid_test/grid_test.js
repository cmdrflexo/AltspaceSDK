var testing = false;
if(!testing) altspaceutil.getFullspaceEnclosure().then(function(enclosure) { start(); });
else start();

var boxURL = "https://cmdrflexo.github.io/AltspaceSDK-Flexo/examples/flexo/flexorama/models/";
var centralURL = "https://cmdrflexo.github.io/AltspaceSDK-Flexo/examples/flexo/flexorama/models/buildings/central-test-01/";

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

var skyDayURL = "https://cmdrflexo.github.io/AltspaceSDK-Flexo/examples/flexo/images/sky/sky_test3.png";
var skyNightURL = "https://cmdrflexo.github.io/AltspaceSDK-Flexo/examples/flexo/images/sky/galaxy.jpg";

function start() {
    sim = new altspace.utilities.Simulation();

    var terrain = CreateTerrain();
    terrain.position.y = -550;
    sim.scene.add(terrain);

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
    sky.rotation.z = THREE.Math.degToRad(-45);
    sky.scale.x = -1;
    sky.position.y = - 500;
    sim.scene.add(sky);


    // altspace.getThreeJSTrackingSkeleton().then(function(_skeleton) {
    //     var skeleton = _skeleton;
    //     sim.scene.add(skeleton);
    //     var head = skeleton.getJoint("Head");

    //     var size = 20;
    //     var blockSize = 10;
    //     for(var z = 0; z < size; z++) {
    //         for(var x = 0; x < size; x++) {
    //             loadModel(
    //                 boxURL + "uv_box.obj",
    //                 boxURL + "uv_box_grass.mtl",
    //                 new THREE.Vector3((x - (size/2)) * blockSize, -blockSize/6, (z - (size/2)) * blockSize),
    //                 new THREE.Vector3(blockSize, blockSize/3, blockSize),
    //                 1,
    //                 false,
    //                 head
    //             );
    //         }
    //     }

    // });

    var head = 0;
    // var size = 30;
    // var blockSize = 10;
    // for(var z = 0; z < size; z++) {
    //     for(var x = 0; x < size; x++) {
    //         loadModel(
    //             boxURL + "uv_box.obj",
    //             boxURL + "uv_box_grass.mtl",
    //             new THREE.Vector3((x - (size/2)) * blockSize, -blockSize/6, -300 + (z - (size/2)) * blockSize),
    //             new THREE.Vector3(blockSize, blockSize/3, blockSize),
    //             1,
    //             false,
    //             head
    //         );
    //     }
    // }

    // loadModel(
    //     boxURL + "uv_box.obj",
    //     boxURL + "uv_box_grass.mtl",
    //     new THREE.Vector3(0, -550.5, 0),
    //     new THREE.Vector3(2000, 1, 2000),
    //     1,
    //     false,
    //     head
    // );

    loadModel(
        centralURL + "central_test-ext.obj",
        centralURL + "central_test-ext.mtl",
        new THREE.Vector3(0, -550, 0),
        // new THREE.Vector3(0, 0, -300),
        new THREE.Vector3(1, 1, 1),
        1,
        false,
        head
    );

    // loadModel(
    //     centralURL + "central_test-interior.obj",
    //     centralURL + "central_test-interior.mtl",
    //     // new THREE.Vector3(0, 250, -300),
    //     new THREE.Vector3(0, 0, 0),
    //     new THREE.Vector3(1, 1, 1),
    //     1,
    //     false,
    //     head
    // );

    // var testPortal = new THREE.Mesh(
    //     new THREE.BoxGeometry(1, 1, 1),
    //     new THREE.MeshBasicMaterial({ color: 0xffffff })
    // );?__, browser cashe busting
    // ?v=1.0
    for(var i = 0; i < 25; i++) {
        var portal = new THREE.Object3D();
        portal.position.x = 25 - (i * 2);
        portal.position.y = 0.5;
        portal.addBehavior(
            new altspaceutil.behaviors.NativeComponent(
                "n-portal", {
                    data: {
                        targetSpace: null,
                        targetEvent: null,
                        targetPosition:   { x: 10, y:  0, z: 10 },
                        targetQuaternion: { x:  0, y:  0, z:  0, w: 0 }
                    }
                    // },
                    // update: function() {
                    //     if(this.config.targetEntity) {
                    //         console.log(this.config.targetEntity);
                    //         this.scene.updateMatrixWorld(true);
                    //         this.data.targetPosition = this.config.targetEntity.getWorldPosition(new THREE.Vector3());
                    //         var quaternion = this.config.targetEntity.getWorldQuaternion(new THREE.Quaternion());
                    //         this.data.targetQuaternion = { x: quaternion.x, y: quaternion.y, z: quaternion.z, w: quaternion.w };
                    //     }
                    //     if(this.initialized) {
                    //         console.log("test");
                    //         altspace.updateNativeComponent(this.component, this.type, this.data);
                    //     }
                    // }
                }
            )
        );
        sim.scene.add(testPortal);
    }

    /*
    'n-portal': {
		data: {
			targetSpace: null, // defaults to current space when omited
			targetEvent: null, // defaults to current space when omited
			targetPosition: { x: 0, y: 0, z: 0 },
			targetQuaternion: { x: 0, y: 0, z: 0, w: 1 }
		},
		update: function() {
			if(this.config.targetEntity) {
				this.scene.updateMatrixWorld(true);
				this.data.targetPosition = this.config.targetEntity.getWorldPosition(new THREE.Vector3());
				var quaternion = this.config.targetEntity.getWorldQuaternion(new THREE.Quaternion());
				this.data.targetQuaternion = { x: quaternion.x, y: quaternion.y, z: quaternion.z, w: quaternion.w };
			}

			if(this.initialized) altspace.updateNativeComponent(this.component, this.type, this.data);
		}
	}
    */

    /*
    .addBehavior(
        new altspaceutil.behaviors.NativeComponent(
            'n-mesh-collider', { 
                type: 'environment', 
                convex: true 
            }
        )
    );
    */
    
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
            // obj.addBehavior(new Hover(userHead));
            // obj.addBehavior(new Fall());
            sim.scene.add(obj);
        }
    );
}

function CreateTerrain() {
    var plane = new THREE.Mesh(
        new THREE.PlaneGeometry(4000, 4000),
        new THREE.MeshBasicMaterial({ 
            color: 0xffffff,
            map: new THREE.Texture({ 
                src: altspaceutil.getAbsoluteURL(grassTextureURL)
            })
        })
    )
    plane.material.map.repeat.set(400, 400);
    plane.material.map.wrapS = plane.material.map.wrapT = THREE.RepeatWrapping;
    plane.position.y = -0.001;
    plane.rotation.x = THREE.Math.degToRad(-90);
    return plane;
}

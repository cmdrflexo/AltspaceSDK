var testing = false;
if(!testing) altspaceutil.getFullspaceEnclosure().then(function(enclosure) { start(); });
else start();

var boxURL = "https://cmdrflexo.github.io/AltspaceSDK-Flexo/examples/flexo/flexorama/models/";
var boxTextureURL = "https://cmdrflexo.github.io/AltspaceSDK-Flexo/examples/flexo/flexorama/textures/16x16_box.png";
var grassTextureURL = "https://cmdrflexo.github.io/AltspaceSDK-Flexo/examples/flexo/flexorama/textures/16x16_grass.png";
var centralURL = "https://cmdrflexo.github.io/AltspaceSDK-Flexo/examples/flexo/flexorama/models/buildings/central-test-01/";

var podURL = "https://cmdrflexo.github.io/AltspaceSDK-Flexo/examples/flexo/flexorama/models/pods/";
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

    var terrain = CreateTerrain(1, grassTextureURL);
    terrain.position.y = -552;
    sim.scene.add(terrain);

    // var smallTerrain = CreateTerrain(0.002, boxTextureURL);
    var smallTerrain = CreateTerrain(0.002, grassTextureURL);
    smallTerrain.position.set(1, 0.699, 10);
    sim.scene.add(smallTerrain);

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
        new THREE.SphereGeometry(2500, 32, 16),
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

    var head;
    altspace.getThreeJSTrackingSkeleton().then(function(_skeleton) {
        var skeleton = _skeleton;
        sim.scene.add(skeleton);
        head = skeleton.getJoint("Head");
        
        var smallIcon = new THREE.Mesh(
            new THREE.BoxGeometry(0.002, 0.005, 0.002),
            new THREE.MeshBasicMaterial({ color: 0xff0000 })
        );
        smallIcon.addBehavior(new Icon(head));
        sim.scene.add(smallIcon);

        var largeScale = 500;
        var largeIcon = new THREE.Mesh(
            new THREE.BoxGeometry(
                0.5 * largeScale, 
                1.5 * largeScale, 
                0.5 * largeScale),
            new THREE.MeshBasicMaterial({ color: 0xff0000 })
        );
        var largeIconHead = new THREE.Mesh(
            new THREE.SphereGeometry(0.5 * largeScale, 16, 32),
            new THREE.MeshBasicMaterial({ color: 0xff0000 })
        );
        largeIconHead.position.y += 1 * largeScale;
        // largeIcon.add(largeIconHead);
        largeIconHead.addBehavior(new Icon(head, true, true));
        sim.scene.add(largeIconHead);
        largeIcon.addBehavior(new Icon(head, true));
        sim.scene.add(largeIcon);

    });


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

    // loadModel(
    //     podURL + "pod-01.obj",
    //     podURL + "pod-01.mtl",
    //     new THREE.Vector3(11.5, 0.1, -3.5),
    //     new THREE.Vector3(1, 1, 1),
    //     1,
    //     false,
    //     head
    // );

    DualObject(
        podURL + "pod-01.obj",
        podURL + "pod-01.mtl",
        new THREE.Vector3(12.5, 0.1, -3.5)
    );

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

    loadModel(
        centralURL + "central_test-ext.obj",
        centralURL + "central_test-ext.mtl",
        new THREE.Vector3(0, 0.7, 10),
        // new THREE.Vector3(0, 0, -300),
        new THREE.Vector3(-0.002, 0.002, 0.002),
        1,
        false,
        head
    );

    loadModel(
        centralURL + "central_test-interior.obj",
        centralURL + "central_test-interior.mtl",
        // new THREE.Vector3(0, 250, -300),
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(1, 1, 1),
        1,
        false,
        head
    );

    var obj = loadModel(
        centralURL + "central_test-interior.obj",
        centralURL + "central_test-interior.mtl",
        // new THREE.Vector3(0, 250, -300),
        new THREE.Vector3(0, 1.8, 10),
        new THREE.Vector3(0.002, 0.002, 0.002),
        1,
        false,
        head,
        true
    );

    // MakeRoads();

    // Flexo(modelsURL);

    /*
    for(var i = 0; i < 100; i++) {
                var smallObj = obj.clone();
                smallObj.position.set(1, 0.701, 10);
                smallObj.position.x += (pos.x + i * 10) * 0.002;
                smallObj.position.z += pos.z * 0.002;
                smallObj.scale.set(0.002, 0.002, 0.002);
                sim.scene.add(smallObj);
            }
    */
    

    // var testPortal = new THREE.Mesh(
    //     new THREE.BoxGeometry(1, 1, 1),
    //     new THREE.MeshBasicMaterial({ color: 0xffffff })
    // );?__, browser cashe busting
    // ?v=1.0
    // for(var i = 0; i < 25; i++) {
    //     var portal = new THREE.Object3D();
    //     portal.position.x = 25 - (i * 2);
    //     portal.position.y = 0.5;
    //     portal.addBehavior(
    //         new altspaceutil.behaviors.NativeComponent(
    //             "n-portal", {
    //                 data: {
    //                     targetSpace: null,
    //                     targetEvent: null,
    //                     targetPosition:   { x: 10, y:  0, z: 10 },
    //                     targetQuaternion: { x:  0, y:  0, z:  0, w: 0 }
    //                 }
    //                 // },
    //                 // update: function() {
    //                 //     if(this.config.targetEntity) {
    //                 //         console.log(this.config.targetEntity);
    //                 //         this.scene.updateMatrixWorld(true);
    //                 //         this.data.targetPosition = this.config.targetEntity.getWorldPosition(new THREE.Vector3());
    //                 //         var quaternion = this.config.targetEntity.getWorldQuaternion(new THREE.Quaternion());
    //                 //         this.data.targetQuaternion = { x: quaternion.x, y: quaternion.y, z: quaternion.z, w: quaternion.w };
    //                 //     }
    //                 //     if(this.initialized) {
    //                 //         console.log("test");
    //                 //         altspace.updateNativeComponent(this.component, this.type, this.data);
    //                 //     }
    //                 // }
    //             }
    //         )
    //     );
    //     sim.scene.add(testPortal);
    // }

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

function DualObject(objURL, mtlURL, pos, rotation = 0) {
    var loader = new altspace.utilities.shims.OBJMTLLoader();
    loader.load(
        objURL, mtlURL, 
        function(obj) {
            obj.position.set(pos.x, pos.y, pos.z);
            obj.rotation.y = THREE.Math.degToRad(rotation);
            sim.scene.add(obj);

            var smallObj = obj.clone();
            smallObj.position.set(
                1 + pos.x * 0.002, 
                0.7 + (pos.y + 550) * 0.002, 
                10 + pos.z * 0.002
            );
            smallObj.scale.set(0.002, 0.002, 0.002);
            sim.scene.add(smallObj);
        }
    );
};

function loadModel(objFilename, mtlFilename, position, size, scale, follow = false, userHead, clone = false) {
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
            if(clone) {
                for(var i = 0; i < 45; i++) {
                    var newobj = obj.clone();
                    newobj.position.y = 1.8 - 0.012 * i;//set(0, , 10);
                    sim.scene.add(newobj);
                }
            }
        }
    );
}

function CreateTerrain(scale, textureURL) {
    var plane = new THREE.Mesh(
        new THREE.PlaneGeometry(1000 * scale, 1000 * scale),
        new THREE.MeshBasicMaterial({ 
            color: 0xffffff,
            map: new THREE.Texture({ 
                src: altspaceutil.getAbsoluteURL(textureURL)
            })
        })
    );
    plane.material.map.repeat.set(100, 100);
    plane.material.map.wrapS = plane.material.map.wrapT = THREE.RepeatWrapping;
    plane.rotation.x = THREE.Math.degToRad(-90);
    return plane;
}

function MakeRoads() {
    var modelsURL = "https://cmdrflexo.github.io/AltspaceSDK-Flexo/examples/flexo/grid_objects/roads/";
    for(var i = 0; i < 96; i++) {
        DualObject(
            modelsURL + "road_edge.obj",
            modelsURL + "road_edge.mtl",
            new THREE.Vector3(-475 + i * 10, -550, -495),
            -90
        );
        DualObject(
            modelsURL + "road_edge.obj",
            modelsURL + "road_edge.mtl",
            new THREE.Vector3(-475 + i * 10, -550, -485),
            90
        );

        DualObject(
            modelsURL + "road_edge.obj",
            modelsURL + "road_edge.mtl",
            new THREE.Vector3(-475 + i * 10, -550, 485),
            -90
        );
        DualObject(
            modelsURL + "road_edge.obj",
            modelsURL + "road_edge.mtl",
            new THREE.Vector3(-475 + i * 10, -550, 495),
            90
        );

        DualObject(
            modelsURL + "road_edge.obj",
            modelsURL + "road_edge.mtl",
            new THREE.Vector3(485, -550, -475 + i * 10),
            0
        );
        DualObject(
            modelsURL + "road_edge.obj",
            modelsURL + "road_edge.mtl",
            new THREE.Vector3(495, -550, -475 + i * 10),
            180
        );

        DualObject(
            modelsURL + "road_edge.obj",
            modelsURL + "road_edge.mtl",
            new THREE.Vector3(-495, -550, -475 + i * 10),
            0
        );
        DualObject(
            modelsURL + "road_edge.obj",
            modelsURL + "road_edge.mtl",
            new THREE.Vector3(-485, -550, -475 + i * 10),
            180
        );
    }
    for(var i = 0; i < 4; i++) {
        DualObject(
            modelsURL + "road_center.obj",
            modelsURL + "road_center.mtl",
            i == 0 ? new THREE.Vector3( 495, -550, 495) :
            i == 1 ? new THREE.Vector3(-485, -550, 495) :
            i == 2 ? new THREE.Vector3( 495, -550, -495) :
                     new THREE.Vector3(-485, -550, -495)
        );
        DualObject(
            modelsURL + "road_center.obj",
            modelsURL + "road_center.mtl",
            i == 0 ? new THREE.Vector3( 485, -550, 495) :
            i == 1 ? new THREE.Vector3(-495, -550, 495) :
            i == 2 ? new THREE.Vector3( 485, -550, -495) :
                     new THREE.Vector3(-495, -550, -495)
        );
        DualObject(
            modelsURL + "road_center.obj",
            modelsURL + "road_center.mtl",
            i == 0 ? new THREE.Vector3( 495, -550, 485) :
            i == 1 ? new THREE.Vector3(-485, -550, 485) :
            i == 2 ? new THREE.Vector3( 495, -550, -485) :
                     new THREE.Vector3(-485, -550, -485)
        );
        DualObject(
            modelsURL + "road_center.obj",
            modelsURL + "road_center.mtl",
            i == 0 ? new THREE.Vector3( 485, -550, 485) :
            i == 1 ? new THREE.Vector3(-495, -550, 485) :
            i == 2 ? new THREE.Vector3( 485, -550, -485) :
                     new THREE.Vector3(-495, -550, -485)
        );
    }
}
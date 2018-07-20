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

var skyDayURL   = "https://cmdrflexo.github.io/AltspaceSDK-Flexo/examples/flexo/images/sky/sky_test3.png";
// var skyNightURL = "https://cmdrflexo.github.io/AltspaceSDK-Flexo/examples/flexo/images/sky/galaxy.jpg";
var skyNightURL = "https://cmdrflexo.github.io/AltspaceSDK-Flexo/examples/flexo/images/sky/purple_galaxy.png";

function start() {
    sim = new altspace.utilities.Simulation();

    // var terrain = CreateTerrain(1, grassTextureURL);
    // terrain.position.y = 0;
    // sim.scene.add(terrain);

    // var smallTerrain = CreateTerrain(0.002, boxTextureURL);
    // var smallTerrain = CreateTerrain(0.002, grassTextureURL);
    // smallTerrain.position.set(1, 0.699, 10);
    // sim.scene.add(smallTerrain);

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
    // sky.rotation.z = THREE.Math.degToRad(-45);
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

    // var box = new THREE.Mesh(
    //     new THREE.BoxGeometry(1, 1, 1),
    //     new THREE.MeshBasicMaterial({ 
    //         color: 0x000000,
    //         map: new THREE.Texture({ 
    //             src: altspaceutil.getAbsoluteURL(textureURL)
    //         })
    //     })
    // );

    // var head;
    // altspace.getThreeJSTrackingSkeleton().then(function(_skeleton) {
    //     var skeleton = _skeleton;
    //     sim.scene.add(skeleton);
    //     head = skeleton.getJoint("Head");
        
    //     var smallIcon = new THREE.Mesh(
    //         new THREE.BoxGeometry(0.002, 0.005, 0.002),
    //         new THREE.MeshBasicMaterial({ color: 0xff0000 })
    //     );
    //     smallIcon.addBehavior(new Icon(head));
    //     sim.scene.add(smallIcon);

    //     var largeScale = 500;
    //     var largeIcon = new THREE.Mesh(
    //         new THREE.BoxGeometry(
    //             0.5 * largeScale, 
    //             1.5 * largeScale, 
    //             0.5 * largeScale
    //         ), new THREE.MeshBasicMaterial({ color: 0xff0000 })
    //     );
    //     var largeIconHead = new THREE.Mesh(
    //         new THREE.SphereGeometry(0.5 * largeScale, 16, 32),
    //         new THREE.MeshBasicMaterial({ color: 0xff0000 })
    //     );
    //     largeIconHead.position.y += 1 * largeScale;
    //     // largeIcon.add(largeIconHead);
    //     largeIconHead.addBehavior(new Icon(head, true, true));
    //     sim.scene.add(largeIconHead);
    //     largeIcon.addBehavior(new Icon(head, true));
    //     sim.scene.add(largeIcon);
    // });

    Glowsticks();
    function Glowsticks() {
        if(false) {
            for(var z = 0; z < 20; z++) {
                for(var x = 0; x < 20; x++) {
                    let glowstick = new THREE.Object3D();
                    glowstick.position.set(
                        (-50) + x * 5, 10, (-50) + z * 5
                    );
                    glowstick.rotation.z = THREE.Math.degToRad(90);
                    glowstick.scale.set(0.001, 0.001, 0.001);
                    var ran = Math.random();
                    glowstick.addBehaviors(
                        ran < 0.3 ?
                        new altspaceutil.behaviors.NativeComponent(
                            "n-spawner", 
                            { res: 'interactables/glowstick-purple' }
                        ) : 
                        ran > 0.3 && ran < 0.6 ?
                        new altspaceutil.behaviors.NativeComponent(
                            "n-spawner", 
                            { res: 'interactables/glowstick-purple' }
                        ) : 
                        new altspaceutil.behaviors.NativeComponent(
                            "n-spawner", 
                            { res: 'interactables/glowstick-blue' }
                        ),
                        new Floaty(0, 0, 100)
                    );
                    sim.scene.add(glowstick);
                }
            }
        }
        if(true) {
            let armGlowstick = new THREE.Object3D();
            armGlowstick.addBehaviors(
                new altspaceutil.behaviors.NativeComponent(
                    "n-spawner", 
                    { res: 'interactables/glowstick-purple' }
                ),
                new altspaceutil.behaviors.NativeComponent('n-skeleton-parent', { part: 'hand', side: 'left' })
            );
            armGlowstick.rotation.x = THREE.Math.degToRad(90);
            armGlowstick.scale.set(0.001, 0.001, 0.001);
            sim.scene.add(armGlowstick);
            
            let glowstick2 = new THREE.Object3D();
            glowstick2.addBehaviors(
                new altspaceutil.behaviors.NativeComponent(
                    "n-spawner", 
                    { res: 'interactables/glowstick-blue' }
                ),
                new altspaceutil.behaviors.NativeComponent('n-skeleton-parent', { part: 'hand', side: 'right' })
            );
            glowstick2.rotation.x = THREE.Math.degToRad(90);
            glowstick2.scale.set(0.001, 0.001, 0.001);
            sim.scene.add(glowstick2);
        }
    }

    Meteors();
    function Meteors() {
        for(var i = 0; i < 5; i++) {
            setTimeout(function() {
                var meteor = new THREE.Object3D();
                meteor.position.set(100, 100, 100);
                // meteor.scale.set(100, 100, 100);
                meteor.addBehaviors(
                    new altspaceutil.behaviors.NativeComponent(
                        "n-spawner", 
                        { res: 'interactables/glowstick-red' }
                    ),
                    // new altspaceutil.behaviors.NativeComponent(
                    //     "n-spawner", 
                    //     { res: 'interactables/glowstick-green' }
                    // ),
                    new altspaceutil.behaviors.NativeComponent(
                        "n-spawner", 
                        { res: 'interactables/glowstick-blue' }
                    ),
                    new Meteor(1000 + Math.random() * 1000)
                );
                sim.scene.add(meteor);
            }, Math.random() * 10000);
        }
    }

    // Burgers();
    function Burgers() {
        var bun = new THREE.Object3D();
        bun.addBehaviors(
            new altspaceutil.behaviors.NativeComponent(
                "n-spawner", 
                { res: 'interactables/burger-sandwich' }
            ),
            new altspaceutil.behaviors.NativeComponent('n-skeleton-parent', { part: 'hand', side: 'right' })
        );
        // glowstick2.scale.set(0.001, 0.001, 0.001);
        sim.scene.add(bun);
        var patty = new THREE.Object3D();
        patty.addBehaviors(
            new altspaceutil.behaviors.NativeComponent(
                "n-spawner", 
                { res: 'interactables/burger-patty' }
            ),
            new altspaceutil.behaviors.NativeComponent('n-skeleton-parent', { part: 'hand', side: 'left' })
        );
        // glowstick2.scale.set(0.001, 0.001, 0.001);
        sim.scene.add(patty);
    }

    var retroURL = "https://cmdrflexo.github.io/AltspaceSDK-Flexo/examples/flexo/flexorama/models/retro/";
    Retro();
    function Retro() {
        var loader = new altspace.utilities.shims.OBJMTLLoader();
        loader.load(
            retroURL + "retro_mountains.obj",
            retroURL + "retro_mountains.mtl",
            function(obj) {
                obj.position.y = 5;
                sim.scene.add(obj);
                // for(var z = 0; z < d; z++) {
                //     for(var x = 0; x < w; x++) {
                //         var newobj = obj.clone();
                //         newobj.addBehavior(new Floaty(x, z));
                //         newobj.position.set(
                //             armyPos.clone().x - (w/2) + x*2, 
                //             armyPos.clone().y,// + (z * 0.5), 
                //             armyPos.clone().z - z*2
                //         );
                //         var r = 0.5 + Math.random();
                //         newobj.scale.set(r, r, r);
                //         sim.scene.add(newobj);
                //     }
                // }
            }
        );

        var retroBox = new THREE.Mesh(
            new THREE.BoxGeometry(10, 1, 10),
            new THREE.MeshBasicMaterial({ 
                color: 0xffffff,
                map: new THREE.Texture({ 
                    src: altspaceutil.getAbsoluteURL(
                        retroURL + "retro_grid-01.png"
                    )
                })
            })
        );

        retroBox.position.y = -1;
        retroBox.scale.set(100, 1, 100);
        sim.scene.add(retroBox);
        for(var z = 0; z < 20; z++) {
            for(var x = 0; x < 20; x++) {
                var boxclone = retroBox.clone();
                boxclone.position.set(-95 + x * 10, -0.51, -95 + z * 10);
                boxclone.scale.set(1, 1, 1);
                sim.scene.add(boxclone);
            }
        }
    }


    GlowstickCube(new THREE.Vector3(-10, 0.1, -10));
    GlowstickCube(new THREE.Vector3(10, 0.1, -10));

    // GlowstickCube(new THREE.Vector3(-10, 0.1, 10));
    // GlowstickCube(new THREE.Vector3(-10, 0.1, 10));

    // GlowstickCube(new THREE.Vector3(10, 0.1, -10));
    // GlowstickCube(new THREE.Vector3(10, 0.1, -10));

    // GlowstickCube(new THREE.Vector3(-10, 0.1, -10));
    // GlowstickCube(new THREE.Vector3(-10, 0.1, -10));

    function GlowstickCube(pos) {
        var glows = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({ 
                color: 0xffffff,
                map: new THREE.Texture({ 
                    src: altspaceutil.getAbsoluteURL(retroURL + "retro_grid-01.png")
                })
            })
        );
        glows.position.set(pos.x, pos.y, pos.z);
        glows.scale.set(0.2, 0.2, 0.2);
        glows.addBehaviors(new CubeRotate(3), new BasicFloat(2));
        sim.scene.add(glows);

        var glowStrings = new Array();
        glowStrings.push("interactables/glowstick-green");
        glowStrings.push("interactables/glowstick-purple");
        glowStrings.push("interactables/glowstick-red");
        glowStrings.push("interactables/glowstick-orange");
        glowStrings.push("interactables/glowstick-blue");
        glowStrings.push("interactables/glowstick-magenta");

        var dist = 1.5;
        var rot = THREE.Math.degToRad(90);
        for(var i = 0; i < 6; i++) {
            var g = new THREE.Object3D();    
            switch(i) {
                case 0:
                    g.position.x = + dist;
                    g.rotation.z = rot;
                    break;
                case 1:
                    g.position.x = - dist;
                    g.rotation.z = rot;
                    break;
                case 2:
                    g.position.y = + dist;
                    break;
                case 3:
                    g.position.y = - dist;
                    break;
                case 4:
                    g.position.z = + dist;
                    g.rotation.x = rot;
                    break;
                case 5:
                    g.position.z = - dist;
                    g.rotation.x = rot;
                    break;
            }
            g.scale.set(0.001, 0.001, 0.001);
            g.addBehavior(new altspaceutil.behaviors.NativeComponent(
                "n-spawner", { res: glowStrings[i] }
            ));
            glows.add(g);
        }
    }

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

    // Spawners();

    // Rock
    // var rockPos = new THREE.Vector3(1, 1.6, 1);
    // var rockPos = new THREE.Vector3(0, 2.5, 0);
    
    // for(var x = 0; x < 3; x++) {
    //     for(var z = 0; z < 1; z++) {
    //         if(x == 0) {
    //             let gemSpawner = new THREE.Object3D();
    //             gemSpawner.position.set(0, 0.1, 0);
    //             gemSpawner.addBehaviors(
    //                 new altspaceutil.behaviors.NativeComponent('n-spawner', { res: 'interactables/gem' })
    //             );

    //             let ringSpawner = new THREE.Object3D();
    //             ringSpawner.position.set(0, 0, -0.1);
    //             ringSpawner.add(gemSpawner);
    //             ringSpawner.addBehaviors(
    //                 new altspaceutil.behaviors.NativeComponent('n-spawner', { res: 'interactables/ring' }),
    //                 new altspaceutil.behaviors.NativeComponent('n-skeleton-parent', { part: 'ring', side: 'left' })
    //             );
    //             ringSpawner.scale.set(0.15, 0.15, 0.15);
    //             sim.scene.add(ringSpawner);
    //         } else {
    //             rockPos = new THREE.Vector3((rockPos.x + x) * 0.1, rockPos.y, (rockPos.x + z) * 0.1);
    //             let gemSpawner = new THREE.Object3D();
    //             gemSpawner.position.set(0, 0.1, 0);
    //             gemSpawner.addBehaviors(
    //                 new altspaceutil.behaviors.NativeComponent('n-spawner', { res: 'interactables/gem' })
    //             );

    //             let ringSpawner = new THREE.Object3D();
    //             ringSpawner.position.set(rockPos.x, rockPos.y - 0.015, rockPos.z);
    //             ringSpawner.add(gemSpawner);
    //             sim.scene.add(ringSpawner);
    //             ringSpawner.addBehaviors(
    //                 new altspaceutil.behaviors.NativeComponent('n-spawner', { res: 'interactables/ring' }),
    //                 new Floaty(x, z)
    //             );
    //             ringSpawner.scale.set(0.15, 0.15, 0.15);
    //         }
    //     }
    // }

    /*
    // n-skeleton-parent
    let nskeletonparent = new THREE.Mesh(new THREE.BoxBufferGeometry(0.2, 0.2, 0.2), new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.3 }));
    nskeletonparent.position.set(0, 0.3, 0);
    app.anchor.add(nskeletonparent);
    nskeletonparent.addBehaviors(
        new altspaceutil.behaviors.NativeComponent('n-skeleton-parent', { part: 'head', side: 'center' }),
        new altspaceutil.behaviors.NativeComponent('n-text', { text: 'n-skeleton-parent', height: 1, fontSize: 2, verticalAlign: 'top' })
    );
    */

    var flexoAvatarURL   = "https://cmdrflexo.github.io/AltspaceSDK-Flexo/examples/flexo/flexorama/models/avatars/s-series-m01/s-series-m01_flexo_01/";
    var nicole1AvatarURL = "https://cmdrflexo.github.io/AltspaceSDK-Flexo/examples/flexo/flexorama/models/avatars/pod-classic/pod-classic_nicole/";
    var nicole2AvatarURL = "https://cmdrflexo.github.io/AltspaceSDK-Flexo/examples/flexo/flexorama/models/avatars/pod-classic/pod-classic_nicole/pod-classic_nicole_big-head/";
    var donAvatarURL     = "https://cmdrflexo.github.io/AltspaceSDK-Flexo/examples/flexo/flexorama/models/avatars/pod-classic/pod-classic_don/";
    var chaysAvatarURL   = "https://cmdrflexo.github.io/AltspaceSDK-Flexo/examples/flexo/flexorama/models/avatars/rubenoid-male-01/rubenoid-male-01_chays/";
    var jaywAvatarURL    = "https://cmdrflexo.github.io/AltspaceSDK-Flexo/examples/flexo/flexorama/models/avatars/robothead-roundguy-01/";
    var mrHandyURL       = "https://cmdrflexo.github.io/AltspaceSDK-Flexo/examples/flexo/flexorama/models/mr_handy/";
    
    var avatarPos = new THREE.Vector3(-20, 0, -14);
    
    function FlexoArmy() {
        var armyPos = new THREE.Vector3(0, 0, 0);
        var w = 15;
        var d = 15;
        var loader = new altspace.utilities.shims.OBJMTLLoader();
        loader.load(
            flexoAvatarURL + "s-series-m01_flexo_02.obj",
            flexoAvatarURL + "s-series-m01_flexo_02.mtl",
            function(obj) {
                // sim.scene.add(obj);
                for(var z = 0; z < d; z++) {
                    for(var x = 0; x < w; x++) {
                        var newobj = obj.clone();
                        newobj.addBehavior(new Floaty(x, z));
                        newobj.position.set(
                            armyPos.clone().x - (w/2) + x*2, 
                            armyPos.clone().y,// + (z * 0.5), 
                            armyPos.clone().z - z*2
                        );
                        var r = 0.5 + Math.random();
                        newobj.scale.set(r, r, r);
                        sim.scene.add(newobj);
                    }
                }
            }
        );
    }

    // DrawAvatars();

    function DrawAvatars() {
        for(var i = 0; i < 5; i++) {
            // if(i == 0 || i == 3) {
            //     DualObject(
            //         podURL + "pod-01.obj",
            //         podURL + "pod-01.mtl",
            //         new THREE.Vector3(10.5 + 2 * i, 0.1, -3.5)
            //     );
            // }

            // if(i == 0) {
            //     DualObject(
            //         flexoAvatarURL + "s-series-m01_flexo_02.obj",
            //         flexoAvatarURL + "s-series-m01_flexo_02.mtl",
            //         // flexoAvatarURL + "s-series-m01_flexo_01.obj",
            //         // flexoAvatarURL + "s-series-m01_flexo_01.mtl",
            //         // flexoAvatarURL + "s-series-m01_flexo_01_lights-out.mtl",
            //         // new THREE.Vector3(
            //         //     avatarPos.x + 7 + 2 * i, 
            //         //     avatarPos.y + 0.1, 
            //         //     avatarPos.z + -3.5
            //         // )
            //         new THREE.Vector3(0, -1600, -250),
            //         1000
            //     );
            // }
            if(i == 1) {
                DualObject(
                    nicole2AvatarURL + "pod-classic_nicole_big-head.obj",
                    nicole2AvatarURL + "pod-classic_nicole_big-head.mtl",
                    // nicole1AvatarURL + "pod-classic_nicole.obj",
                    // nicole1AvatarURL + "pod-classic_nicole.mtl",
                    new THREE.Vector3(
                        avatarPos.x + 7.5 + 2 * i, 
                        avatarPos.y + 0.1, 
                        avatarPos.z + -3.5
                    )
                );
            }
            if(i == 2) {
                DualObject(
                    // nicole2AvatarURL + "pod-classic_nicole_big-head.obj",
                    nicole1AvatarURL + "pod-classic_nicole.obj",
                    donAvatarURL + "pod-classic_don.mtl",
                    new THREE.Vector3(
                        avatarPos.x + 6.5 + 2 * i, 
                        avatarPos.y + 0.1, 
                        avatarPos.z + -3.5
                    )
                );
            }
            if(i == 3) {
                DualObject(
                    chaysAvatarURL + "rubenoid-male-01_chays.obj",
                    chaysAvatarURL + "rubenoid-male-01_chays.mtl",
                    new THREE.Vector3(
                        avatarPos.x + 7 + 2 * i, 
                        avatarPos.y + 0.1, 
                        avatarPos.z + -3.5
                    )
                );
            }
            if(i == 4) {
                DualObject(
                    jaywAvatarURL + "robothead-roundguy-01_jayw/robothead-roundguy-01_jayw.obj",
                    // jaywAvatarURL + "robothead-roundguy-01_jayw/robothead-roundguy-01_jayw.mtl",
                    jaywAvatarURL + "robothead-roundguy-01.mtl",
                    new THREE.Vector3(
                        avatarPos.x + 7 + 2 * i, 
                        avatarPos.y + 0.1, 
                        avatarPos.z + -3.5
                    )
                );
                // DualObject(
                //     mrHandyURL + "mr_handy-altvr-01.obj",
                //     mrHandyURL + "mr_handy-altvr-01.mtl",
                //     new THREE.Vector3(
                //         avatarPos.x + 7 + 2 * i, 
                //         avatarPos.y + 0.1, 
                //         avatarPos.z + -3.5
                //     )
                // );
            }
        }
    }

    // loadModel(
    //     centralURL + "central_test-ext.obj",
    //     centralURL + "central_test-ext.mtl",
    //     new THREE.Vector3(0, -550, 0),
    //     // new THREE.Vector3(0, 0, -300),
    //     new THREE.Vector3(1, 1, 1),
    //     1,
    //     false,
    //     head
    // );

    // loadModel(
    //     centralURL + "central_test-ext.obj",
    //     centralURL + "central_test-ext.mtl",
    //     new THREE.Vector3(0, 0.7, 10),
    //     // new THREE.Vector3(0, 0, -300),
    //     new THREE.Vector3(-0.002, 0.002, 0.002),
    //     1,
    //     false,
    //     head
    // );

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

    // var obj = loadModel(
    //     centralURL + "central_test-interior.obj",
    //     centralURL + "central_test-interior.mtl",
    //     // new THREE.Vector3(0, 250, -300),
    //     new THREE.Vector3(0, 1.8, 10),
    //     new THREE.Vector3(0.002, 0.002, 0.002),
    //     1,
    //     false,
    //     head,
    //     true
    // );

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
    // for(var i = 0; i < 1; i++) {
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
    //     sim.scene.add(portal);
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

function DualObject(objURL, mtlURL, pos, scale = 1, rotation = 0) {
    var loader = new altspace.utilities.shims.OBJMTLLoader();
    loader.load(
        objURL, mtlURL, 
        function(obj) {
            obj.position.set(pos.x, pos.y, pos.z);
            obj.rotation.y = THREE.Math.degToRad(rotation);
            obj.scale.set(scale, scale, scale);
            sim.scene.add(obj);

            var smallObj = obj.clone();
            smallObj.position.set(
                1 + pos.x * 0.002, 
                0.7 + (pos.y + 550) * 0.002, 
                10 + pos.z * 0.002
            );
            smallObj.scale.set(scale * 0.002, scale * 0.002, scale * 0.002);
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
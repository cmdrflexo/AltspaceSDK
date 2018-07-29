var testing = false;
if(!testing) altspaceutil.getFullspaceEnclosure().then(function(enclosure) { start(); });
else start();

var boxURL = "https://cmdrflexo.github.io/AltspaceSDK-Flexo/examples/flexo/flexorama/models/";
var boxTextureURL = "https://cmdrflexo.github.io/AltspaceSDK-Flexo/examples/flexo/flexorama/textures/16x16_box.png";
var grassTextureURL = "https://cmdrflexo.github.io/AltspaceSDK-Flexo/examples/flexo/flexorama/textures/16x16_grass.png";
var centralURL = "https://cmdrflexo.github.io/AltspaceSDK-Flexo/examples/flexo/flexorama/models/buildings/central-test-01/";

var podURL = "https://cmdrflexo.github.io/AltspaceSDK-Flexo/examples/flexo/flexorama/models/pods/";

var skyDayURL   = "https://cmdrflexo.github.io/AltspaceSDK-Flexo/examples/flexo/images/sky/sky_test3.png";
var skyNightURL = "https://cmdrflexo.github.io/AltspaceSDK-Flexo/examples/flexo/images/sky/purple_galaxy.png";

function start() {
    sim = new altspace.utilities.Simulation();

    CreateSky();
    function CreateSky() {
        var sky = new THREE.Mesh(
            new THREE.SphereGeometry(2500, 32, 16),
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: new THREE.Texture({
                    src: altspaceutil.getAbsoluteURL(skyNightURL)
                })
            })
        );
        sky.rotation.z = THREE.Math.degToRad(5);
        sky.position.y = -250;
        sky.scale.x = -1;
        sky.addBehavior(new RotateY(600));
        sim.scene.add(sky);
    }

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
                new altspaceutil.behaviors.NativeComponent(
                    'n-skeleton-parent', { part: 'hand', side: 'left' }
                )
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
                new altspaceutil.behaviors.NativeComponent(
                    'n-skeleton-parent', { part: 'hand', side: 'right' }
                )
            );
            glowstick2.rotation.x = THREE.Math.degToRad(90);
            glowstick2.scale.set(0.001, 0.001, 0.001);
            sim.scene.add(glowstick2);
        }
    }

    // Meteors();
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
        sim.scene.add(bun);
        var patty = new THREE.Object3D();
        patty.addBehaviors(
            new altspaceutil.behaviors.NativeComponent(
                "n-spawner", 
                { res: 'interactables/burger-patty' }
            ),
            new altspaceutil.behaviors.NativeComponent('n-skeleton-parent', { part: 'hand', side: 'left' })
        );
        sim.scene.add(patty);
    }

    Apache();
    function Apache() {

        var root = new THREE.Object3D();

        root.position.set(3, 2.25, -6);
        root.rotation.x = THREE.Math.degToRad(15);
        root.rotation.y = THREE.Math.degToRad(180 + -25);
        root.rotation.z = THREE.Math.degToRad(-15);

        root.addBehavior(new BasicFloat(0.1));

        sim.scene.add(root);

        var apacheURL = "https://cmdrflexo.github.io/AltspaceSDK-Flexo/examples/flexo/flexorama/models/apache/";
        var loader = new altspace.utilities.shims.OBJMTLLoader();
        loader.load(
            apacheURL + "apache_2018.obj",
            apacheURL + "apache_2018.mtl",
            function(obj) {
                obj.addBehavior(
                    new altspaceutil.behaviors.NativeComponent('n-mesh-collider', { convex: false, type: 'environment' }),
                );
                root.add(obj);
            }
        );
        loader.load(
            apacheURL + "apache_2018-rotors.obj",
            apacheURL + "apache_2018-rotors.mtl",
            function(obj) {
                root.add(obj);
            }
        );
        loader.load(
            apacheURL + "apache_2018-details1.obj",
            apacheURL + "apache_2018-details1.mtl",
            function(obj) {
                root.add(obj);
            }
        );
        loader.load(
            apacheURL + "apache_2018-details2.obj",
            apacheURL + "apache_2018-details2.mtl",
            function(obj) {
                root.add(obj);
            }
        );
        loader.load(
            apacheURL + "apache_2018-side.obj",
            apacheURL + "apache_2018-side.mtl",
            function(obj) {
                obj.addBehavior(
                    new altspaceutil.behaviors.NativeComponent('n-mesh-collider', { convex: false, type: 'environment' }),
                );
                root.add(obj);
            }
        );
        loader.load(
            apacheURL + "apache_2018-side2.obj",
            apacheURL + "apache_2018-side2.mtl",
            function(obj) {
                obj.addBehavior(
                    new altspaceutil.behaviors.NativeComponent('n-mesh-collider', { convex: false, type: 'environment' }),
                );
                root.add(obj);
            }
        );
    }

    Retro();
    function Retro() {
        var retroURL = "https://cmdrflexo.github.io/AltspaceSDK-Flexo/examples/flexo/flexorama/models/retro/";
        var loader = new altspace.utilities.shims.OBJMTLLoader();
        loader.load(
            retroURL + "retro_mountains.obj",
            retroURL + "retro_mountains.mtl",
            function(obj) {
                obj.position.y = 5;
                sim.scene.add(obj);
            }
        );

        loader.load(
            retroURL + "TSR.obj",
            retroURL + "TSR.mtl",
            function(obj) {
                obj.position.set(0, 500, 500);
                obj.rotation.y = THREE.Math.degToRad(180);
                obj.rotation.x = THREE.Math.degToRad(-15);
                obj.scale.set(80, 80, 80);
                sim.scene.add(obj);
            }
        );

        var apo = new THREE.Mesh(
            new THREE.BoxGeometry(10, 30, 0.1),
            new THREE.MeshBasicMaterial({ color: 0xfb05af })
        );
        apo.position.set(-455, 550, 500);
        apo.rotation.z = THREE.Math.degToRad(35);
        sim.scene.add(apo);
    }

    var grid = CreateGrid();
    sim.scene.add(grid);
    function CreateGrid() {
        var plane = new THREE.Mesh(
            new THREE.PlaneGeometry(1000, 1000),
            new THREE.MeshBasicMaterial({ 
                color: 0xffffff,
                map: new THREE.Texture({ 
                    src: altspaceutil.getAbsoluteURL(retroURL + "retro_grid-01.png")
                })
            })
        );
        plane.material.map.repeat.set(100, 100);
        plane.material.map.wrapS = plane.material.map.wrapT = THREE.RepeatWrapping;
        plane.position.set(0, -3.01, 0);
        plane.rotation.x = THREE.Math.degToRad(-90);
        return plane;
    }
    
    // GlowstickCube(new THREE.Vector3(0, 0.1, 0));
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

    Ring();
    function Ring() {
        let gemSpawner = new THREE.Object3D();
        gemSpawner.position.set(0, 0.1, 0);
        gemSpawner.addBehaviors(
            new altspaceutil.behaviors.NativeComponent('n-spawner', { res: 'interactables/gem' })
        );
        let ringSpawner = new THREE.Object3D();
        ringSpawner.position.set(0, 0, -0.1);
        ringSpawner.add(gemSpawner);
        ringSpawner.addBehaviors(
            new altspaceutil.behaviors.NativeComponent('n-spawner', { res: 'interactables/ring' }),
            new altspaceutil.behaviors.NativeComponent('n-skeleton-parent', { part: 'ring', side: 'left' })
        );
        ringSpawner.scale.set(0.15, 0.15, 0.15);
        sim.scene.add(ringSpawner);
    }

    var flexoAvatarURL   = "https://cmdrflexo.github.io/AltspaceSDK-Flexo/examples/flexo/flexorama/models/avatars/s-series-m01/s-series-m01_flexo_01/";
    var nicole1AvatarURL = "https://cmdrflexo.github.io/AltspaceSDK-Flexo/examples/flexo/flexorama/models/avatars/pod-classic/pod-classic_nicole/";
    var nicole2AvatarURL = "https://cmdrflexo.github.io/AltspaceSDK-Flexo/examples/flexo/flexorama/models/avatars/pod-classic/pod-classic_nicole/pod-classic_nicole_big-head/";
    var donAvatarURL     = "https://cmdrflexo.github.io/AltspaceSDK-Flexo/examples/flexo/flexorama/models/avatars/pod-classic/pod-classic_don/";
    var chaysAvatarURL   = "https://cmdrflexo.github.io/AltspaceSDK-Flexo/examples/flexo/flexorama/models/avatars/rubenoid-male-01/rubenoid-male-01_chays/";
    var jaywAvatarURL    = "https://cmdrflexo.github.io/AltspaceSDK-Flexo/examples/flexo/flexorama/models/avatars/robothead-roundguy-01/";
    var mrHandyURL       = "https://cmdrflexo.github.io/AltspaceSDK-Flexo/examples/flexo/flexorama/models/mr_handy/";
    
    var avatarPos = new THREE.Vector3(-20, 0, -14);
    
    // FlexoArmy();
    function FlexoArmy() {
        var armyPos = new THREE.Vector3(0, 0, 0);
        var w = 15;
        var d = 15;
        var loader = new altspace.utilities.shims.OBJMTLLoader();
        loader.load(
            flexoAvatarURL + "s-series-m01_flexo_02.obj",
            flexoAvatarURL + "s-series-m01_flexo_02.mtl",
            function(obj) {
                for(var z = 0; z < d; z++) {
                    for(var x = 0; x < w; x++) {
                        var newobj = obj.clone();
                        newobj.addBehavior(new Floaty(x, z));
                        newobj.position.set(
                            armyPos.clone().x - (w/2) + x*2, 
                            armyPos.clone().y,
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
}

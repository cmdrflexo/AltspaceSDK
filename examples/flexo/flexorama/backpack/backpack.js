// flexorama\models\exosuit
var mainURL = "https://cmdrflexo.github.io/AltspaceSDK-Flexo/examples/flexo/flexorama/";
var partsURL = mainURL + "models/exosuit/";

sim = new altspace.utilities.Simulation();

LoadParts();
function LoadParts() {
    var backpack = {
        root  : new THREE.Object3D(),
        base  : null,
        arm01 : null,
        arm02 : null,
        eye   : null
    };    
    var loader = new altspace.utilities.shims.OBJMTLLoader();
    loader.load(
        partsURL + "backpack.obj",
        partsURL + "backpack.mtl",
        function(base) {
            backpack.base = base;
            backpack.root.add(base);
            loader.load(
                partsURL + "backpack_arm01.obj",
                partsURL + "backpack_arm01.mtl",
                function(arm01) {
                    backpack.arm01 = arm01;
                    backpack.arm01.position.set(0.1585, 0.2772, 0.0035);
                    backpack.base.add(backpack.arm01);
                    loader.load(
                        partsURL + "backpack_arm02.obj",
                        partsURL + "backpack_arm02.mtl",
                        function(arm02) {
                            backpack.arm02 = arm02;
                            backpack.arm02.position.set(0.0725, 0, 0.0033);
                            backpack.arm01.add(backpack.arm02);
                            loader.load(
                                partsURL + "backpack_eye.obj",
                                partsURL + "backpack_eye.mtl",
                                function(eye) {
                                    backpack.eye = eye;
                                    backpack.eye.position.set(0, 0.1, 0);
                                    backpack.arm02.add(backpack.eye);
                                    PartsLoaded(backpack);
                                }
                            );
                        }
                    );
                }
            );
        }
    );
}

function PartsLoaded(backpack) {
    console.log("PARTS LOADED");

    backpack.root.position.set(0, 0.3562375, 0.2598);
    // move up
    backpack.root.position.y += 1;
    backpack.root.addBehavior(new EyeIdle(backpack));
    sim.scene.add(backpack.root);

    // GetAvatar();
}
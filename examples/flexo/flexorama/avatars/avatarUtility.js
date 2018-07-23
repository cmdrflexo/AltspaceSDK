
var modelsURL = "https://cmdrflexo.github.io/AltspaceSDK-Flexo/examples/flexo/flexorama/models/avatars/";

var avatarSIDs = [
    "a-series-m01",               // 0
    "pod-classic",                // 1
    "robothead-propellerhead-01", // 2
    "robothead-roundguy-01",      // 3
    "rubenoid-female-01",         // 4
    "rubenoid-male-01",           // 5
    "s-series-f01",               // 6
    "s-series-m01",               // 7
    "x-series-m02"                // 8
];

var avatarClassification = {
    "a-series-m01" : 0,
    "s-series-f01" : 0,
    "s-series-m01" : 0,
    "x-series-m02" : 0,
    "pod-classic"  : 0,
    "rubenoid-female-01" : 1,
    "rubenoid-male-01"   : 1,
    "robothead-propellerhead-01" : 2,
    "robothead-roundguy-01" : 3
};

var modelNames = {
    seriesHead        : "head",
    seriesHeadHL      : "head_highlight",
    seriesBody        : "body",
    seriesBodyHL      : "body_highlight",
    roundguyHead      : "head",
    roundguyBody      : "body",
    propellerheadHead : "head",
    propellerheadSpin : "spin-01",
    rubenoidHead      : "head",
    rubenoidBody      : "body"
};

var avatar = {
    sid      : null,
    type     : null,
    head     : null,
    body     : null,
    pColor   : null,
    hColor   : null
};

var scene;

function GetAvatar(avatarInfo, _scene) {
    scene = _scene;
    avatar.sid = avatarSIDs[2];
    // avatar.sid = avatarInfo.sid;    
    avatar.type = avatarClassification[avatar.sid];
    // wait for models
    GetAvatarModels(avatarInfo);
};

function GetAvatarModels(avatarInfo) {
    var loader = new altspace.utilities.shims.OBJMTLLoader();
    var modelLocation = modelsURL + avatar.sid + "/";
    switch(avatar.type) {
        case 0: // custom color
            GetColors(avatarInfo);
            loader.load(
                modelLocation + modelNames.seriesHead + ".obj", 
                modelLocation + modelNames.seriesHead + ".mtl",
                function(head) {
                    loader.load(
                        modelLocation + modelNames.seriesHeadHL + ".obj", 
                        modelLocation + modelNames.seriesHeadHL + ".mtl",
                        function(headHL) { 
                            SetMaterialColor(head.children[0].material, avatar.pColor);
                            SetMaterialColor(headHL.children[0].material, avatar.hColor);
                            head.add(headHL); 
                        }
                    );
                    loader.load(
                        modelLocation + modelNames.seriesBody + ".obj", 
                        modelLocation + modelNames.seriesBody + ".mtl",
                        function(body) { 
                            loader.load(
                                modelLocation + modelNames.seriesBodyHL + ".obj", 
                                modelLocation + modelNames.seriesBodyHL + ".mtl",
                                function(bodyHL) {
                                    SetMaterialColor(body.children[0].material, avatar.pColor);
                                    SetMaterialColor(bodyHL.children[0].material, avatar.hColor);
                                    body.add(bodyHL); 
                                    AvatarModelLoaded(head, body);
                                }
                            ); 
                        }
                    );
                }
            );
            break;
        case 1: case 3: // roundguy, rubenoid
            var locHead = modelLocation + (
                avatar.type == 1 ?
                    modelNames.roundguyHead :
                    modelNames.rubenoidHead
            );
            var locBody = modelLocation + (
                avatar.type == 1 ?
                    modelNames.roundguyBody :
                    modelNames.rubenoidBody
            );
            loader.load(
                locHead + ".obj", locHead + ".mtl",
                function(head) {
                    loader.load(
                        locBody + ".obj", locBody + ".mtl",
                        function(body) { AvatarModelLoaded(head, body); }
                    );
                }
            );
            break;
        case 2: // propellerhead
            var locHead = modelLocation + modelNames.propellerheadHead;
            var locSpin = modelLocation + modelNames.propellerheadSpin;
            loader.load(
                locHead + ".obj", locHead + ".mtl",
                function(head) { 
                    loader.load(
                        locSpin + ".obj", locSpin + ".mtl",
                        function(spin) {
                            spin.addBehavior(new Spin(new THREE.Vector3(0, 1, 0), 20));
                            head.add(spin);
                        }
                    );
                    AvatarModelLoaded(head);
                }
            );
            break;
    }
}

function GetColors(avatarInfo) {
    avatar.hColor = ReduceColor(avatarInfo.highlightColor.match(/\d+/g).map(Number));
    switch(avatarInfo.primaryColor) {
        case "white": case "lightgrey": avatar.pColor = [255, 255, 255]; return;
        case "grey":     avatar.pColor = [191, 191, 191]; return;
        case "darkgrey": avatar.pColor = [ 77,  77,  77]; return;
        case "black":    avatar.pColor = [ 26,  26,  26]; return;
    }
    avatar.pColor = ReduceColor(avatarInfo.primaryColor.match(/\d+/g).map(Number));
}

function ReduceColor(color) {
    var max = Math.max(color[0], color[1], color[2]);
    if(max > 255)
        for(var i = 0; i < 3; i++)
            color[i] = Math.floor(color[i] / max * 255);
    return color;
}

function SetMaterialColor(material, color) {
    material.color.r = 1 / 256 * color[0];
    material.color.g = 1 / 256 * color[1];
    material.color.b = 1 / 256 * color[2];
}

function AvatarModelLoaded(head, body = null) {
    avatar.head = head;
    avatar.head.position.set(-11, 1.73, -8.98);
    scene.add(avatar.head);

    head.addBehavior(new BasicFloat(0.1));

    if(body != null) {
        avatar.body = body;
        avatar.body.position.set(-11, 1, -9);
        scene.add(avatar.body);
    }
}

// BEHAVIORS
Spin = function(axis, speed) {
    this.axis = axis;
    this.speed = speed;
    this.awake = function(parent) { this.object3d = parent; }
    this.update = function(deltaTime) {
        this.object3d.rotateOnAxis(axis, THREE.Math.degToRad(this.speed * deltaTime));
    }
}
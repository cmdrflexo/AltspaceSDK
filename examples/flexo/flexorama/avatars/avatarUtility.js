
var avatarSIDs = [
    "a-series-m01", // 0
    "pod-classic",  // 1
    "robothead-propellerhead-01", // 2
    "robothead-roundguy-01",      // 3
    "rubenoid-female-01", // 4
    "rubenoid-male-01",   // 5
    "s-series-f01", // 6
    "s-series-m01", // 7
    "x-series-m02"  // 8
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
    "robothead-roundguy-01"      : 3
};

var avatar = {
    sid : null,
    type : null,
    headObj : [],
    headMtl : [],
    head : null,
    bodyObj : [],
    bodyMtl : [],
    body : null,
    object3D : null,
    pColor : null,
    hColor : null
};

var modelNames = {
    seriesHead          : "head",
    seriesHeadHighlight : "head_highlight",
    seriesBody          : "body",
    seriesBodyHighlight : "body_hightlight",
    roundguyHead        : "head",
    roundguyBody        : "body",
    propellerheadHead   : "head",
    rubenoidHead        : "head",
    rubenoidBody        : "body"
};

var scene;

function GetAvatar(avatarInfo) {
    // / TEST AVATAR
    scene = avatarInfo;
    avatar.type = 3;
    avatar.sid = avatarSIDs[3];
    GetAvatarModel();
    // /
};

var modelsURL = "https://cmdrflexo.github.io/AltspaceSDK-Flexo/examples/flexo/flexorama/models/avatars/";

function GetAvatarModel() {
    var loader = new altspace.utilities.shims.OBJMTLLoader();
    var modelLocation = modelsURL + avatar.sid + "/";
    switch(avatar.type) {
        case 0: // series
            var loc = [
                modelLocation + modelNames.seriesHead + ".", 
                modelLocation + modelNames.seriesHeadHighlight + ".",
                modelLocation + modelNames.seriesBody + ".", 
                modelLocation + modelNames.seriesBodyHighlight + "."
            ];
            for(var i = 0; i < 2; i++) {
                avatar.headObj[i] = loc[i] + "obj";
                avatar.headMtl[i] = loc[i] + "mtl";
                avatar.bodyObj[i] = loc[i + 2] + "obj";
                avatar.bodyMtl[i] = loc[i + 2] + "mtl";
            }
            loader.load(
                avatar.headObj[0], avatar.headMtl[0],
                function(head) { 
                    avatar.head = head;
                    loader.load(
                        avatar.bodyObj[0], avatar.bodyMtl[0],
                        function(body) { avatar.body = body;; AvatarModelLoaded(); }
                    );
                }
            );
            break;
        case 1: case 3: // roundguy, rubenoid
            var loc = [
                modelLocation + (
                    avatar.type == 1 ?
                        modelNames.roundguyHead :
                        modelNames.rubenoidHead + "."
                ),
                modelLocation + (
                    avatar.type == 1 ?
                        modelNames.roundguyBody :
                        modelNames.rubenoidBody + "."
                )
            ];
            avatar.headObj = loc[0] + "obj";
            avatar.headMtl = loc[0] + "mtl";
            avatar.bodyObj = loc[1] + "obj";
            avatar.bodyMtl = loc[1] + "mtl";
            loader.load(
                avatar.headObj, avatar.headMtl,
                function(head) { 
                    avatar.head = head
                    loader.load(
                        avatar.bodyObj, avatar.bodyMtl,
                        function(body) { avatar.body = body; AvatarModelLoaded(); }
                    );
                }
            );
            break;
        case 2: // propellerhead
            var loc = modelLocation + modelNames.propellerhead + ".";
            avatar.headObj = [loc + "obj"];
            avatar.headMtl = [loc + "mtl"];
            loader.load(
                avatar.headObj[0], avatar.headMtl[0],
                function(head) { avatar.head = head; AvatarModelLoaded(); }
            );
            break;
    }
}

function AvatarModelLoaded() {
    avatar.body.position.set(0, 2.6, -3);
    avatar.body.rotation.y = THREE.Math.degToRad(180);
    altspace.getThreeJSTrackingSkeleton().then(function(_skeleton) {
        var skeleton = _skeleton;
        scene.add(skeleton);
        head = skeleton.getJoint("Head");
        avatar.body.add(avatar.head);
        avatar.body.addBehavior(new LookAtUser(head));
        scene.add(avatar.body);
    });
}

Demo = (
    function() {
        var sim;
        var connection;
        var sceneSync;
        var item;
        var itemModel;
        
        var xPos = 5;
        var yPos = 0;
        var zPos = -8;

        var userHead;
        
        function main(_connection) {
            altspace.getThreeJSTrackingSkeleton().then(function(_skeleton) {
                connection = _connection
                sim = new altspace.utilities.Simulation();

                var skeleton = _skeleton;
                sim.scene.add(skeleton);
                userHead = skeleton.getJoint("Head");

                var mrHandyURL = "https://cmdrflexo.github.io/AltspaceSDK-Flexo/examples/flexo/flexorama/models/mr_handy/";
                loadItemModel(
                    // "https://cmdrflexo.github.io/AltspaceSDK-Flexo/examples/flexo/cake/cake.obj",
                    // "https://cmdrflexo.github.io/AltspaceSDK-Flexo/examples/flexo/cake/cake.mtl"
                    mrHandyURL + "mr_handy-altvr-01.obj",
                    mrHandyURL + "mr_handy-altvr-01.mtl"
                );
            });
        }

        function loadItemModel(objFilename, mtlFilename) {
            var loader = new altspace.utilities.shims.OBJMTLLoader();
            loader.load(
                objFilename, 
                mtlFilename, 
                function(obj) {
                    itemModel = obj;
                    onModelReady();
                }
            );
        }
        
        function onModelReady() {
            sceneSync = new altspace.utilities.behaviors.SceneSync(
                connection.instance, 
                {
                    instantiators: { "Item" : createItem },
                    ready : ready
                }
            );
            sim.scene.addBehavior(sceneSync);
        }


        
        function createItem(initData) {
            item = itemModel.clone();
            item.addBehavior(
                new altspace.utilities.behaviors.Object3DSync(
                    { position : true, rotation : true, scale : true }					
                )
            );
            item.name = "ITEM";
            item.position.set(xPos, yPos, zPos);
            item.rotation.y = THREE.Math.degToRad(180);
            item.scale.x = 1;
            item.scale.y = 1;
            item.scale.z = 1;
            item.addBehavior(new Follow123(userHead));
            sim.scene.add(item);
            return item;				
        }
        
        function ready(firstInstance) {
            if(firstInstance) sceneSync.instantiate("Item");
        }
        
        return {
            main : main,
            getItem : function() { return item; }
        };
    }
());

var config = { authorId : "Flexo", appId : "180623-01" };
altspaceutil.getFullspaceEnclosure().then(function(enclosure) {  
    altspace.utilities.sync.connect(config).then(
        function(connection) {
            Demo.main(connection);
        }
    );
});

Follow123 = function(uHead) {
    this.uHead = uHead;

    this.awake = function(parent) {
        this.object3d = parent;
    }

    this.update = function(deltaTime) {
        this.object3d.position.set(
            this.uHead.position.x,
            this.uHead.position.y - 1.7,
            this.uHead.position.z
        );
    }
}
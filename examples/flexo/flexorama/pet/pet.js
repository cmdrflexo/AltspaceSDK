function CreateDogFollower(userHead, scale) {
    var parts = DogParts(scale);
    var dog = new THREE.Object3D();
    dog.add(parts.bodyRoot);
    dog.add(parts.neck);
    dog.add(parts.headRoot);
    dog.add(parts.tailRoot);
    dog.add(parts.legFrontL);
    dog.add(parts.legFrontR);
    dog.add(parts.legBackL);
    dog.add(parts.legBackR);

    // parts.headRoot.addBehavior(new AttentionLook(userHead, 0, 10, 45));
    parts.tailRoot.addBehavior(new TESTTailWag());
    // dog.addBehavior(new Follower(userHead, 2, 4, 0.25, new THREE.Object3D()));
    // dog.addBehavior(new TESTTurning(userHead));

    dog.position.y = 10 * scale;

    sim.scene.add(dog);
    return dog;
}

function DogParts(scale) {
    var parts =  {
        bodyRoot  : new THREE.Object3D(),
        neck      : BoxObject(8, 8, 6, scale, boxTextureURL),
        headRoot: new THREE.Object3D(),
        tailRoot  : new THREE.Object3D(),
        legFrontL : BoxObject(2, 8, 2, scale, boxTextureURL),
        legFrontR : BoxObject(2, 8, 2, scale, boxTextureURL),
        legBackL  : BoxObject(2, 8, 2, scale, boxTextureURL),
        legBackR  : BoxObject(2, 8, 2, scale, boxTextureURL)
    }

    var body = BoxObject(6, 6, 12, scale, boxTextureURL);
    body.position.z = -6 * scale;
    parts.bodyRoot.add(body);

    parts.neck.position.z = 1 * scale;

    var head = DogHead(scale);
    head.position.z = 1.5 * scale;
    parts.headRoot.add(head);
    parts.headRoot.position.z = 4 * scale;

    var tail = BoxObject(2, 2, 10, scale, boxTextureURL);
    tail.position.z = -5 * scale;
    parts.tailRoot.add(tail);
    parts.tailRoot.position.set(0, 2 * scale, -11 * scale);
    parts.tailRoot.rotation.x = THREE.Math.degToRad(15);
    
    parts.legFrontL.position.set(-1.5 * scale, -6 * scale,   2.5 * scale);
    parts.legFrontR.position.set( 1.5 * scale, -6 * scale,   2.5 * scale);
    parts.legBackL.position.set( -1.5 * scale, -6 * scale, -10.5 * scale);
    parts.legBackR.position.set(  1.5 * scale, -6 * scale, -10.5 * scale);

    return parts;
}

function DogHead(scale) {
    var dogHead = BoxObject(6, 6, 3, scale, boxTextureURL);
    var snout = BoxObject(3, 3, 3, scale, boxTextureURL);
    snout.position.set(0, -1.5 * scale, 3 * scale);
    var earL = BoxObject(2, 2, 1, scale, boxTextureURL);
    earL.position.set(-2 * scale, 4 * scale, -1 * scale);
    var earR = BoxObject(2, 2, 1, scale, boxTextureURL);
    earR.position.set(2 * scale, 4 * scale, -1 * scale);
    dogHead.add(snout);
    dogHead.add(earL);
    dogHead.add(earR);
    return dogHead;
}

function BoxObject(width, height, depth, scale, textureURL) {
    return new THREE.Mesh(
        new THREE.BoxGeometry(width * scale, height * scale, depth * scale),
        new THREE.MeshBasicMaterial({
            color : 0xffffff,
            map : new THREE.Texture({ 
                src: altspaceutil.getAbsoluteURL(textureURL)
            })
        })
    );
}

function CreateBBFollower(head) {
    followerHead = new THREE.Mesh(
            new THREE.SphereGeometry(0.15, 32, 16),
            new THREE.MeshBasicMaterial({
                color : 0xffffff,
                map : new THREE.Texture({ 
                    src: altspaceutil.getAbsoluteURL(bbHeadTextureURL)
                })
            })
        );
        followerHead.position.y = 0.24;
        followerHead.rotation.y = THREE.Math.degToRad(-90);
        
        followerHeadRoot = new THREE.Object3D();
        followerHeadRoot.position.y = 0.25;
        followerHeadRoot.add(followerHead);
        followerHeadRoot.addBehavior(new AttentionLook(head, 0, 10, 22.5));
        sim.scene.add(followerHeadRoot);
        
        follower = new THREE.Mesh(
            new THREE.SphereGeometry(0.25, 32, 16),
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: new THREE.Texture({ 
                    src: altspaceutil.getAbsoluteURL(bbBallTextureURL)
                })
            })
        );
        follower.position.y = 0.25;
        follower.addBehavior(new Follower(head, 2, 4, 0.25, followerHeadRoot));
        sim.scene.add(follower);
}

function SetupConsole(maxLines, spacing) {
    var con = new THREE.Object3D();
    con.addBehavior(new altspaceutil.behaviors.Console({ maxlines: maxLines, passive: false, spacing: spacing }));
    sim.scene.add(con);
    sim.scene.updateAllBehaviors();
    return con;
}

function CreateTerrain() {
    var plane = new THREE.Mesh(
        new THREE.PlaneGeometry(1000, 1000),
        new THREE.MeshBasicMaterial({ 
            color: 0xffffff,
            map: new THREE.Texture({ 
                src: altspaceutil.getAbsoluteURL(grassTextureURL)
            })
        })
    )
    plane.material.map.repeat.set(1000, 1000);
    plane.material.map.wrapS = plane.material.map.wrapT = THREE.RepeatWrapping;
    plane.position.y = -0.01;
    plane.rotation.x = THREE.Math.degToRad(-90);
    return plane;
}

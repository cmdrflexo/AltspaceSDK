function CreateTerrain() {
    var groundPlane = new THREE.Mesh(
        new THREE.PlaneGeometry(10000, 10000),
        new THREE.MeshBasicMaterial({ color: 0x062116 })
    )
    groundPlane.position.y = -0.1;
    groundPlane.rotation.x = THREE.Math.degToRad(-90);
    return groundPlane;
}

function CreateSky() {
    sky = {
        root: new THREE.Mesh(new THREE.BoxGeometry(1, 0.1, 0.1)),
        skySpheres: CreateSkySpheres(32, 16),
        sun: new THREE.Object3D(),
        moon: CreateMoon(100, 64, 32, 45)
    }
    
    sky.root.position.set(0, 1, 0);

    sky.skySpheres.night.rotation.x = THREE.Math.degToRad(45);
    sky.moon.position.set(1300, 0, 0);

    sky.root.add(sky.sun);
    sky.root.add(sky.moon);
    sky.root.add(sky.skySpheres.day);
            
    sky.root.addBehavior(new SkyRotateZ(120));
    sky.skySpheres.night.addBehavior(new SkyRotate(-2000));
    // sky.skySpheres.night.addBehavior(new SkyFade(0, 60));
    sky.moon.addBehavior(new MoonPhasesTest(sky.moon.geometry, sky.moon.material));

    return sky;
}

function CreateSkySpheres(longSegs, latSegs) {
    var day = SkySphere(1600, longSegs, latSegs, skyDayURL, false);
    var night = SkySphere(1500, longSegs, latSegs, skyNightURL, true);
    return {day, night};
}

function CreateMoon(radius, longSegs, latSegs, tilt) {
    var moon = new THREE.Mesh(
        new THREE.SphereGeometry(radius, longSegs, latSegs),
        new THREE.MeshBasicMaterial({
            color: 0xffffff,
            map: new THREE.Texture({ 
                src: altspaceutil.getAbsoluteURL(tiledMoonURL)
            })
        })
    );
    moon.material.map.repeat.set(0.5, 0.25);
    moon.material.needsUpdate = moon.geometry.uvsNeedUpdate = true;
    moon.rotation.set(THREE.Math.degToRad(tilt), THREE.Math.degToRad(180), 0);
    return moon;
}
    
function SetupDebugVisuals() {
    var originReference = new THREE.Mesh(
        new THREE.PlaneGeometry(1, 1),
        new THREE.MeshBasicMaterial({ 
            color: 0xffffff,
            map: new THREE.Texture({ src: altspaceutil.getAbsoluteURL(compassURL) })
        })
    )
    originReference.rotation.set(
        THREE.Math.degToRad(90), THREE.Math.degToRad(180), 0
    );
    
    var xPos = new THREE.Mesh(
        new THREE.SphereGeometry(0.1, 16, 8),
        new THREE.MeshBasicMaterial({ color : 0xff0000 })
    );
    xPos.position.set(1, 0.5, 0);
    
    var zPos = new THREE.Mesh(
        new THREE.SphereGeometry(0.1, 16, 8),
        new THREE.MeshBasicMaterial({ color : 0x0000ff })
    );
    zPos.position.set(0, 0.5, 1);
    
    sim.scene.add(originReference, xPos, zPos);
}

function SkySphere(radius, longSegs, latSegs, texURL, isTransparent) {
    var skySphere = new THREE.Mesh(
        new THREE.SphereGeometry(radius, longSegs, latSegs),
        new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent : isTransparent,
            map: new THREE.Texture({ 
                src: altspaceutil.getAbsoluteURL(texURL)
            })
        })
    );
    skySphere.scale.x = -1;
    return skySphere;
}
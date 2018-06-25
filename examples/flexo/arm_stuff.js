
var scene = new THREE.Scene();
var renderer = altspace.getThreeJSRenderer();

var skeleton;

skeleton = altspace.getThreeJSTrackingSkeleton();

var i;
for(i = 0; i < Object.keys(skeleton).length; i++)
    console.log(skeleton[i]);

// altspace.getThreeJSTrackingSkeleton().then(
//     function(_skeleton) {
//         skeleton = _skeleton;
//         scene.add(skeleton);

//         waitForJoint("Index", "Left")
//     }
// );

// function waitForJoint(part, side) {
//     var promise = new Promise(
//         function(resolve) {
//             var waitIntervalID = setInterval(
//                 function() {
//                     if(skeleton.getJoint(part, side)) {
//                         clearInterval(waitIntervalID);
//                         resolve();
//                     }
//                 }, 
//                 10);
//         }
//     );
//     return promise;
// }


// function animate() {
//     requestAnimationFrame(animate);
// }

// animate();



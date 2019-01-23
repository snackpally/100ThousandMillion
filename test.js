var scene, camera, renderer, cube;
// The Scene is the world and the camera is "your" eyes.
// The renderer draws the scene as seen by the camera
var meshFloor;
var ship;
var sun;
var manyCube = [];
var counter = 0;
var h = 3000;
var keyboard = {};
var light;
var sunLight;
var player = { 
	height: 1.8, 
	speed: 1
};
function getRandomInt(max) {
	// return Math.floor(Math.random() * Math.floor(max));
	return Math.random() * max;
}

function init() {

	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 0.1, 1000);

	camera.position.set(0,player.height,-5);
	camera.lookAt(new THREE.Vector3(0,player.height,0));
		
	sun = new THREE.Mesh(
		new THREE.SphereGeometry(20, 100, 100),
		new THREE.MeshPhongMaterial({color: 0xffff00, wireframe: false})
	);
	sun.position.y = 179;
	sun.position.x = 300;
	sun.position.z = -400;
	scene.add(sun);
	

	ship = new THREE.Mesh(
		new THREE.TetrahedronBufferGeometry(2),
		new THREE.MeshPhongMaterial({color: 0xff000, wireframe: false}),
		
		);
	ship.position.y += 1;
	scene.add(ship);
	scene.add(new THREE.AxesHelper(20));

	light = new THREE.PointLight(0xba5656, 8, 10000); // soft white light
	light.position.set(sun.position.x, sun.position.y, sun.position.z);
	console.log("lightPoint", light.position)
	scene.add(light);
	var directionalLight = new THREE.DirectionalLight(0xffffff, .5);
	scene.add(directionalLight);
	directionalLight.position.set(0,2,-1);

	cube = new THREE.Mesh(
		new THREE.BoxGeometry(1,1,1),
		new THREE.MeshPhongMaterial({color: 0xffffff, wireframe: false})
	);
	// cube.position.y += 1;
	// cube.position.x += getRandomInt(1000);
	cube.position.y += getRandomInt(10);
	cube.position.z -= getRandomInt(10);
	// mesh.position.x += getRandomInt(10);

	scene.add(cube);

	while(counter < h) {
		
		manyCube.push(cube.clone());
		counter++; 
	}
	console.log("ManyCubes",manyCube)

	for (let i = 0; i < manyCube.length; i++) {
		scene.add(manyCube[i]);
		manyCube[i].position.x += getRandomInt(1000);
		manyCube[i].position.y += getRandomInt(400);
		manyCube[i].position.z -= getRandomInt(700);

	
		
		// console.log('Added', manyCube[i].position);
	}

	meshFloor = new THREE.Mesh(
		new THREE.PlaneGeometry(50, 50, 30, 30),
		new THREE.MeshPhongMaterial({color: 0xfffff, wireframe: false})
	);
	//Rotate the floor on its x axis to lay flat. Divide PI by 2 because of circles
	meshFloor.rotation.x -= Math.PI / 2;
	scene.add(meshFloor);


	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	animate();
}

function animate() {
	requestAnimationFrame(animate);

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
	
	for (let i = 400; i < manyCube.length; i++) {
		manyCube[i].rotation.x += 0.01;
		manyCube[i].rotation.y += 0.01;
		
	}

	// TODO add speed with +/- and display current speed

	if(keyboard[37]){//left arrow key}
		camera.rotation.y -= Math.PI * 0.01;	
	}
	if (keyboard[39]) {//right arrow key}
		camera.rotation.y += Math.PI * 0.01;
	}
	if (keyboard[40]) {//down arrow key
		camera.position.y -= Math.PI * 0.2;
		// ship.position.y -= Math.PI * 0.2;
		}
	if (keyboard[38]) {
    //up arrow key
		camera.position.y += Math.PI * 0.2;
		// ship.position.y += Math.PI * 0.2;
  }
	if (keyboard[87]) {// W key
		camera.position.x -= Math.sin(camera.rotation.y) * player.speed;
		camera.position.z -= -Math.cos(camera.rotation.y) * player.speed;
		// mesh.position.x -= Math.sin(camera.rotation.y) * player.speed;
		// mesh.position.z -= -Math.cos(camera.rotation.y) * player.speed;
	}
	if (keyboard[83]) {// S Key
    camera.position.x += Math.sin(camera.rotation.y) * player.speed;
		camera.position.z += -Math.cos(camera.rotation.y) * player.speed;
		// mesh.position.x += Math.sin(camera.rotation.y) * player.speed;
    // mesh.position.z += -Math.cos(camera.rotation.y) * player.speed;
	}
	if (keyboard[65]) {
    // A Key
		camera.position.x += Math.sin(camera.rotation.y + Math.PI / 2) * player.speed;
		camera.position.z += -Math.cos(camera.rotation.y + Math.PI / 2) * player.speed;
		// mesh.position.x += Math.sin(camera.rotation.y + Math.PI / 2) * player.speed;
    // mesh.position.z += -Math.cos(camera.rotation.y + Math.PI / 2) * player.speed;
	}
	
	if (keyboard[68]) {
		// D Key
		camera.position.x += Math.sin(camera.rotation.y - Math.PI / 2) * player.speed;
		camera.position.z += -Math.cos(camera.rotation.y - Math.PI / 2) * player.speed;
		// mesh.position.x += Math.sin(camera.rotation.y - Math.PI / 2) * player.speed;
    // mesh.position.z += -Math.cos(camera.rotation.y - Math.PI / 2) * player.speed;
	}
	

	renderer.render(scene, camera);

}

//Keyboard input event listeners

function keyDown(e) {
	keyboard[e.keyCode] = true;
}

function keyUp(e) {
	keyboard[e.keyCode] = false;
}

window.addEventListener('keydown', keyDown);
window.addEventListener("keyup", keyUp);

window.onload = init;
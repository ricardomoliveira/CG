/* Esclarecer a questão do "Far" da camera e da profundidade do cubo */
/* Criar classes */
/* Usar o keyUp /*

/*global THREE*/
var camera, scene, renderer;

var geometry, material, mesh, car;

var clock = new THREE.Clock();
    var moveDistance = 0;

var camfactor = 1.5;

var winWidth, winHeight;

var wrfrm = false;


			var moveForward = false;
			var moveBackward = false;
			var moveLeft = false;
			var moveRight = false;

var move = THREE.Vector3(1, 1, 0);

function init(){
    'use strict';

    renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    createScene();
    createCamera();
    createPattern();
    createOrange(100, -450);
    createOrange(-350, 50);
    createOrange(400, 500);
    createButter(400, 0);
    createButter(250, 600);
    //isto da para fazer ali em cima dos carris?a
    createButter(-100, 450);
    createButter(650, -450);
    createButter(-600, -350);
    createCar(100, 50, 10);

    //render();

    window.addEventListener( 'resize', onResize);
    window.addEventListener( 'keydown', onKeyDown, false );
	window.addEventListener( 'keyup', onKeyUp, false );
}

function animate() {

    updateCar();
	updateWire();
    render();

    requestAnimationFrame(animate);
}

function createScene() {
    'use strict';

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    createFloor(0, 0, 0);
    createCircularTrack(350, 150, 300, 0, 1);
    createCircularTrack(350, 150, -300, 0, -1);

}

function createCamera(){
    'use strict';
    camera = new THREE.OrthographicCamera(-1500, 1500, 1000, -1000, 0.1, 100);

    camera.position.z=50;
    camera.lookAt(scene.position);

    scene.add(camera);
}

function render(){
    'use strict';
    renderer.render(scene, camera);
}


function onKeyDown(e) {

	    var delta = clock.getDelta();

    if (e.keyCode == 65 || e.keyCode == 97) {
		if ( wrfrm == false)
			wrfrm = true;
		else
		wrfrm = false;
	}

    if (e.keyCode == 38) // up arrow
    {
    	moveDistance +=delta;
        moveForward = true;
    }

    if (e.keyCode == 40)//down arrow
    {
        moveBackward = true;
    }

    if (e.keyCode == 37) //left arrow
    {
        moveLeft = true;
    }

    if (e.keyCode == 39) // right arrow
    {
        moveRight = true;
    }
}

function onKeyUp(e) {
    if (e.keyCode == 38) // up arrow
    {
        setTimeout(function()
        {
        moveForward = false;
        }, 500); //delay is in milliseconds

    }

    if (e.keyCode == 40)//down arrow
    {
        setTimeout(function()
        {
        moveBackward = false;
        }, 500); //delay is in milliseconds

    }

    if (e.keyCode == 37) //left arrow
    {
        moveLeft = false;
    }

    if (e.keyCode == 39) // right arrow
    {
        moveRight = false;
    }
}

function updateCar() {
    'use strict';

<<<<<<< HEAD
    //var add = 0;
    //var walking = false;
    clock.starts();
    //var moveDistance = 0;
=======
    var add = 0;
    var walking = false;
>>>>>>> faa1fc1920c6b4a40fb30610c455f45464f9e540

    if (moveForward == true) // up arrow
    {
        car.translateX(moveDistance+delta*100);
    }

    if (moveBackward == true)//down arrow
    {
        setTimeout(function(){
            car.translateX(moveDistance-2)
       }, 750); //delay is in milliseconds
        car.translateX(moveDistance-3);
    }

    if (moveLeft == true) //left arrow
    {
        car.rotation.z += 0.05;
    }

    if (moveRight == true) // right arrow
    {
        car.rotation.z -= 0.05;
    }

    render();
}

function onResize(){
    'use strict';

	renderer.setSize(window.innerWidth, window.innerHeight);

	if ( window.innerWidth != winWidth ){
		camera.right = window.innerWidth / 2;
		camera.left = (window.innerWidth / -2);
		camera.top = (window.innerWidth / 1.5) / 2;
		camera.bottom = - (window.innerWidth / 1.5) / 2;
	}
	else if ( window.innerHeight != winHeight ){
		camera.top = window.innerHeight / 2;
		camera.bottom = - (window.innerHeight / 2);
		camera.right = (window.innerHeight * 1.5) / 2;
		camera.left = -((window.innerHeight * 1.5) / 2);
	}

	winHeight = camera.top - camera.bottom;
	winWidth = camera.right - camera.left;

	camera.updateProjectionMatrix();

}

function createFloor(x, y, z) {
    'use strict';

    var table = new THREE.Object3D();

    material = new THREE.MeshBasicMaterial({ color: 0x009DE0, wireframe: false});

    geometry = new THREE.CubeGeometry(1500, 1500, 1);
    mesh = new THREE.Mesh(geometry, material);

    table.add(mesh);

    table.position.x = x;
    table.position.y = y;
    table.position.z = z;

    scene.add(table);

}

function createPattern() {
  'use strict';

  for (var i = -725; i < 750; i+=100) {
      for (var j = -725; j < 750; j+=50) {
          var cube = new THREE.Object3D();
          var material = new THREE.MeshBasicMaterial({ color: 0xFFFFFF});
          var geometry = new THREE.CubeGeometry(50, 50, 1);
          var mesh = new THREE.Mesh(geometry, material);

          cube.add(mesh);
          cube.position.x = i;
          cube.position.y = j;

          scene.add(cube);
    }
  }
}

function createCheerio(x, y){
    'use strict';

    var geometry = new THREE.TorusBufferGeometry(12, 2.5, 8, 100);
    var material = new THREE.MeshBasicMaterial({color: 0x000000});
    var torus = new THREE.Mesh(geometry, material);
    torus.position.x = x;
    torus.position.y = y;
    torus.position.z = 1;

    scene.add(torus);
}

function createWheel(obj, x, y, z){
    'use strict';

    var geometry = new THREE.TorusBufferGeometry(12, 2.5, 16, 100);
    var material = new THREE.MeshBasicMaterial({color: 0x000000, wireframe: false});
    var torus = new THREE.Mesh(geometry, material);
    torus.position.x = x;
    torus.position.y = y;
    torus.position.z = z;

    torus.rotation.z = Math.PI/2;

    scene.add(torus);
}


function createCircularTrack(r1, r2, x, y, flag){
    'use strict';

    createCheerioCircle(r1, x, y, flag, 2);
    createCheerioCircle(r2, x, y, flag, 1);
}

function createCheerioCircle(radius, x, y, flag1, flag2){
    'use strict';

    if (flag2 == 2){ //circulos de fora
        if (flag1 == 1) // circulo da direita
            for (var i = 0; i<360; i+=6){
                if (i<160 || i>210)
                    createCheerio(Math.cos(i * (Math.PI/180))*radius + x, Math.sin(i* (Math.PI/180))*radius + y);
                }
        else { // circulo da esquerda
            for (var i = 0; i<360; i+=5){
                if (i>30 && i<340)
                    createCheerio(Math.cos(i * (Math.PI/180))*radius + x, Math.sin(i* (Math.PI/180))*radius + y);
            }
        }
    }
    else { // ciculos de dentro
        for (var i = 0; i<360; i+=10){
            createCheerio(Math.cos(i * (Math.PI/180))*radius + x, Math.sin(i* (Math.PI/180))*radius + y);
        }
    }
}

function createOrange(x,y) {

    'use strict';

  var orange = new THREE.Object3D();
  var geometry = new THREE.SphereGeometry(40, 32, 22);
  var material = new THREE.MeshBasicMaterial( { color: 0xFFA500, wireframe: false});
  var mesh = new THREE.Mesh( geometry, material );
  mesh.position.set(x,y,0);

  orange.add(mesh);

  scene.add(orange);
}


function createButter(x,y) {
  'use strict';

  var butter = new THREE.Object3D();
  geometry = new THREE.BoxGeometry(80, 50, 50);
  material = new THREE.MeshBasicMaterial( {color: 0xFFFF80, wireframe: false} );
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x,y,0);

  butter.add(mesh);

  scene.add(butter);
}

function createWheel(obj, x, y, z){
    'use strict';

    geometry = new THREE.TorusBufferGeometry(12, 7, 16, 100);
    material = new THREE.MeshBasicMaterial({color: 0x000000, wireframe: false} );
    var torus = new THREE.Mesh(geometry, material);

    torus.position.x = x;
    torus.position.y = y;
    torus.position.z = z;

    torus.rotation.x = Math.PI/2;

    obj.add(torus);
}

function addTop(car, x, y, z){
    'use strict'

    geometry = new THREE.BoxGeometry(x, y, z);
    material = new THREE.MeshBasicMaterial( {color: 0xff2800, wireframe: false} );
    var top = new THREE.Mesh(geometry, material);
    // adicionar ao chassis um top

    car.add(top);
}

function createCar(x, y, z){
    'use strict'

    var chassis, top;

    chassis = new THREE.Object3D();

    var geometry = new THREE.ConeGeometry( 15, 25, 32 );
    var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    var cone = new THREE.Mesh( geometry, material );

    createWheel(chassis, -x/2 + 10, y/2, 1);
    createWheel(chassis, x/2 - 10, y/2, 1);
    createWheel(chassis, x/2 - 10, -y/2, 1);
    createWheel(chassis, -x/2 + 10, -y/2, 1);

    car = new THREE.Object3D();

    addTop(car, x, y, z);
    cone.position.x=x/20;
    cone.position.y=y/25;
    cone.position.z=15;
    cone.rotation.z+=Math.PI*1.5;
    car.add(cone);

    car.add(chassis);

    car.position.set(100, 200, 2);
    scene.add(car);

}

function updateWire(){
	scene.traverse(function(node) {
		if (node instanceof THREE.Mesh) {
			node.material.wireframe = wrfrm;
		}
	});
}

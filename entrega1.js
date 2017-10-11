/* Esclarecer a questão do "Far" da camera e da profundidade do cubo */
/* Criar classes */
/* Usar o keyUp /*
/*global THREE*/

var camera = {
	left: -1500,
	right: 1500,
	top: 1000,
	bottom: -1000,
	near: 0.1,
	far: 100,
	aspect:1.5
};

var ratioMesa = 3/5;

var scene, renderer, camera;

var geometry, material, mesh, car;

var clock;

var winWidth;

var wrfrm = false;

var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;

var move = THREE.Vector3(1, 1, 0);

function init(){
    'use strict';

	clock =  new THREE.Clock();

    renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);

	//winWidth = window.innerWidth;

    document.body.appendChild(renderer.domElement);

    createScene();
    createCamera();
    createPattern();
    createOrange(100, -450);
    createOrange(-350, 50);
    createOrange(400, 500);

    createButter(400, 0);
    createButter(250, 600);
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
    //camera = new THREE.OrthographicCamera(camera.left, camera.right, camera.top, camera.bottom, camera.near, camera.far);
	camera = new THREE.OrthographicCamera(-window.innerWidth, window.innerWidth, window.innerHeight, -window.innerHeight, 0.1, 100);

    camera.position.z=50;
    camera.lookAt(scene.position);

    scene.add(camera);
}

function render(){
    'use strict';
    renderer.render(scene, camera);
}


function onKeyDown(e) {
	if (e.keyCode == 65 || e.keyCode == 97) {
		if (wrfrm == false)
			wrfrm = true;
		else
			wrfrm = false;
    }

    if (e.keyCode == 38) // up arrow
    {
		car.acceleration = 10;
        moveForward = true;
    }

    if (e.keyCode == 40)//down arrow
    {
		car.acceleration = -10;
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
        moveForward = false;
		car.acceleration = 0;
    }

    if (e.keyCode == 40)//down arrow
    {
        moveBackward = false;
		car.acceleration = 0;
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
	var delta = clock.getDelta();

    if (moveForward == true) // up arrow
    {
        /* atualizacao do vetor velocidade eixo x*/
		car.velocity += (car.acceleration*delta) * Math.cos(car.angle);
        car.velocity *= car.drag * Math.cos(car.angle);
        car.translateX(car.velocity +(0.5)*car.acceleration*delta*delta);

        /* atualizacao do vetor velocidade eixo y*/
        car.xpto += (car.acceleration*delta) * Math.sin(car.angle);
        car.xpto *= car.drag * Math.sin(car.angle);
        car.translateY(car.xpto + (0.5)*car.acceleration*delta*delta);

    }

    if (moveBackward == true)//down arrow
    {
        /* atualizacao do vetor velocidade eixo x*/
		car.velocity += (car.acceleration*delta) * Math.cos(car.angle);
        car.velocity *= car.drag * Math.cos(car.angle);
        car.translateX(car.velocity + (0.5)*car.acceleration*delta*delta);

        /* atualizacao do vetor velocidade eixo y*/
        car.xpto += (car.acceleration*delta) * Math.sin(car.angle);
        car.xpto *= car.drag * Math.sin(car.angle);
        car.translateY(car.xpto + (0.5) * car.acceleration*delta*delta);


    }

    if (moveLeft == true) //left arrow
    {
        /* atualizacao do angulo no sentido positivo*/
        car.angle = 80 * delta * (Math.PI)/80;
        car.rotation.z += car.angle;

    }

    if (moveRight == true) // right arrow
    {
        /* atualizacao do angulo no sentido negativo*/
        car.angle = 80*delta * Math.PI/80;
        car.rotation.z -= car.angle;
    }

	/* To Stop the car */
	car.velocity -= car.velocity*delta * Math.cos(car.angle);
    car.velocity -= car.velocity*delta * Math.sin(car.angle);
	car.translateX(car.velocity);
    car.translateY(car.xpto);

}

function onResize(){
    'use strict';

	renderer.setSize(window.innerWidth, window.innerHeight);

	var ratioJanela = renderer.getSize().height /renderer.getSize().width;

	if (ratioJanela > ratioMesa) { //
		camera.right = 2500 / 2;
		camera.left = -2500 / 2;
		camera.top = (1500 * ratioJanela) / (ratioMesa * 2);
		camera.bottom = (-1500 * ratioJanela) / (ratioMesa * 2);

	}
	else {
        camera.right = (2500 / ratioJanela) / ( (1 / ratioMesa) * 2);
        camera.left = (-2500 / ratioJanela) / ( (1 / ratioMesa) * 2);
		camera.top = 1500 / 2;
		camera.bottom = -1500 / 2;

	}

	camera.updateProjectionMatrix();

}

function createFloor(x, y, z) {
    'use strict';

    var table = new THREE.Object3D();

    material = new THREE.MeshBasicMaterial({ color: 0x009DE0, wireframe: false});

    geometry = new THREE.CubeGeometry(2500, 1500, 1);
    mesh = new THREE.Mesh(geometry, material);

    table.add(mesh);

    table.position.x = x;
    table.position.y = y;
    table.position.z = z;

    scene.add(table);

}

function createPattern() {
  'use strict';

  for (var i = -1225; i < 1225; i+=100) {
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

    geometry = new THREE.TorusBufferGeometry(12, 4, 16, 100);
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

    var chassis, top, acceleration, velocity;

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

		car.velocity = 0; /*velocidade eixo x*/
        car.xpto = 0; /*velocidade eixo x*/
		car.acceleration = 10;
		car.drag = 0.99;
        car.angle = 0;

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

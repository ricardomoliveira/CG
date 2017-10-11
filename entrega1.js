/* Esclarecer a questão do "Far" da camera e da profundidade do cubo */
/* Criar classes */
/* Usar o keyUp /*
/*global THREE*/

var ratioMesa = 1500/2500; // Altura da mesa / Comprimento da mesa : assegura o rácio de aspeto desta

var scene, renderer, camera, geometry, material, mesh, clock;

var wrfrm = false; // Atributo de wireframe dos objetos

var car = {
		acceleration: 0,
		vx: 0,
		angle: 0,
		vy: 0,
		drag: 0
};

var move = {
	forward: false,
	backward: false,
	left: false,
	right: false
};

function init(){
    'use strict';

		clock =  new THREE.Clock();

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
    createButter(-100, 450);
    createButter(650, -450);
    createButter(-600, -350);

    createCar(100, 50, 10);

    window.addEventListener( 'resize', onResize); // Deteta os eventos de alteração de tamanho da janela
    window.addEventListener( 'keydown', onKeyDown, false ); // Deteta os eventos de tecla a ser premida
		window.addEventListener( 'keyup', onKeyUp, false ); // Deteta os eventos de libertacao de teclas
}

function animate() {

    updateCar(); // Atualiza o movimento do carro
		updateWire(); // Caso seja premida a tecla 'a' ou 'A', e atualizada a wireframe de todos os objetos
    render();

    requestAnimationFrame(animate);
}

function createScene() {
    'use strict';

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    createFloor(0, 0, 0);
    createCircularTrack(350, 150, 300, 0, 1); // Cria a pista da esquerda
    createCircularTrack(350, 150, -300, 0, -1); // Cria a pista da direita

}

function createCamera(){
		'use strict';

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

    if (e.keyCode == 38) // Tecla Cima
    {
        move.forward = true;
    }

    if (e.keyCode == 40) // Tecla Baixo
     {
        move.backward = true;
    }

    if (e.keyCode == 37) // Tecla Esquerda
    {
        move.left = true;
    }

    if (e.keyCode == 39) // Tecla Direita
    {
        move.right = true;
    }
}

function onKeyUp(e) {
	if (e.keyCode == 38) // Tecla Cima
    {
        move.forward = false;
    }

    if (e.keyCode == 40) // Tecla Cima
    {
        move.backward = false;
    }

    if (e.keyCode == 37) // Tecla Esquerda
    {
        move.left = false;
    }

    if (e.keyCode == 39) // Tecla Direita
    {
        move.right = false;
    }
}

function updateCar() {
    'use strict';
	var delta = clock.getDelta();

    if (move.forward == true) // Tecla Cima
    {
        /* Atualizacao do vetor velocidade eixo x*/
				car.vx += (car.acceleration*delta) * Math.cos(car.angle);
        car.vx *= car.drag * Math.cos(car.angle);
        car.translateX(car.vx +(0.5)*car.acceleration*delta*delta);

        /* Atualizacao do vetor velocidade eixo y*/
        car.vy += (car.acceleration*delta) * Math.sin(car.angle);
        car.vy *= car.drag * Math.sin(car.angle);
        car.translateY(car.vy + (0.5)*car.acceleration*delta*delta);
    }

    if (move.backward == true) // Tecla Baixo
    {
        /* Atualizacao do vetor velocidade eixo x*/
				car.vx += (-car.acceleration*delta) * Math.cos(car.angle);
        car.vx *= car.drag * Math.cos(car.angle);
        car.translateX(car.vx + (0.5)*car.acceleration*delta*delta);

        /* Atualizacao do vetor velocidade eixo y*/
        car.vy += (-car.acceleration*delta) * Math.sin(car.angle);
        car.vy *= car.drag * Math.sin(car.angle);
        car.translateY(car.vy + (0.5) * car.acceleration*delta*delta);
    }

    if (move.left == true) // Tecla Esquerda
    {
        /* Atualizacao do angulo no sentido positivo*/
        car.angle = 180 * delta * (Math.PI)/180;
        car.rotation.z += car.angle;
    }

    if (move.right == true) // Tecla Direita
    {
        /* Atualizacao do angulo no sentido negativo*/
        car.angle = 180*delta * Math.PI/180;
        car.rotation.z -= car.angle;
    }

	/*  Para parar o carro de acordo com as leis de movimento implementadas */
		car.vx -= car.vx*delta * Math.cos(car.angle);
    car.vx -= car.vx*delta * Math.sin(car.angle);
		car.translateX(car.vx);
    car.translateY(car.vy);

		}

function onResize(){
    'use strict';

	renderer.setSize(window.innerWidth, window.innerHeight);

	var ratioJanela = renderer.getSize().height /renderer.getSize().width; // Altura da janela / Comprimento da janela : assegura o rácio da janela

	if (ratioJanela > ratioMesa) { // Atualizamos as medidas da mesa para o caso de o resize estar a ser vertical
		camera.right = 2500 / 2;
		camera.left = -2500 / 2;
		camera.top = (1500 * ratioJanela) / (ratioMesa * 2); // Assegurar uma altura máxima aceitável
		camera.bottom = (-1500 * ratioJanela) / (ratioMesa * 2); // Assegurar uma altura minima aceitável

	}
	else { // Atualizamos as medidas da mesa para o caso de o resize estar a ser horizontal
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

  for (var i = -1225; i < 1225; i+=100) { // Como o tamanho de cada objeto é 50, o seu centro fica a 25. Como tal, para ter uma mesa coberta totalmente, a primeira e ultima permitem que a fila de objetos não saia do plano da mesa.
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

  geometry = new THREE.SphereGeometry(40, 32, 22);
  material = new THREE.MeshBasicMaterial( { color: 0xFFA500, wireframe: false});
  var orange = new THREE.Mesh( geometry, material );
  orange.position.set(x,y,0);

  scene.add(orange);
}


function createButter(x,y) {
  'use strict';

  geometry = new THREE.BoxGeometry(80, 50, 50);
  material = new THREE.MeshBasicMaterial( {color: 0xFFFF80, wireframe: false} );
  var butter = new THREE.Mesh(geometry, material);

	butter.position.set(x,y,0);

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
    var top = new THREE.Mesh(geometry, material); // Adiciona ao chassis uma parte de cima

    car.add(top);
}

function createCar(x, y, z){
    'use strict'

    var chassis, top, acceleration;

    chassis = new THREE.Object3D();
		car =	new THREE.Object3D();

		car.vx = 0; /* Velocidade eixo x */
		car.vy = 0; /* Velocidade eixo y */
		car.acceleration = 10; /* Aceleração pré-definida do carro */
		car.drag = 0.99; /* Atrito entre o carro e a pista */
		car.angle = 0; /* Ângulo de direção do carro */

    var geometry = new THREE.ConeGeometry( 15, 25, 32 );
    var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    var cone = new THREE.Mesh( geometry, material );

    createWheel(chassis, -x/2 + 10, y/2, 1);
    createWheel(chassis, x/2 - 10, y/2, 1);
    createWheel(chassis, x/2 - 10, -y/2, 1);
    createWheel(chassis, -x/2 + 10, -y/2, 1);

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

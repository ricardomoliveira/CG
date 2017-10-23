/* global THREE */

var scene, renderer, activeCamera, OrthoCamera, ChaseCamera, BackCamera, geometry, material, mesh, clock, table;

var ratioMesa = 1500/2500; // Altura da mesa / Comprimento da mesa : assegura o rácio de aspeto desta

var wrfrm = false; // Atributo de wireframe dos objetos

var car = {
		category: "car",
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

function init() {
    'use strict';

		clock =  new THREE.Clock();
		activeCamera=3;
    renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    createScene();
    createCamera();
//    createPattern();

    createOrange(100, -450);
    createOrange(-350, 50);
    createOrange(400, 500);

    createButter(400, 0);
    createButter(250, 600);
    createButter(-100, 450);
    createButter(650, -450);
    createButter(-600, -350);

    createCar(30, 15, 7);

    window.addEventListener( 'resize', onResize); // Deteta os eventos de alteração de tamanho da janela
    window.addEventListener( 'keydown', onKeyDown, false ); // Deteta os eventos de tecla a ser premida
		window.addEventListener( 'keyup', onKeyUp, false ); // Deteta os eventos de libertacao de teclas
		window.addEventListener("keypress", onKeyPressed);
}

function animate() {

    // updateCar(); // Atualiza o movimento do carro
		update(); // Caso seja premida a tecla 'a' ou 'A', e atualizada a wireframe de todos os objetos
    render(); // Coloca os objetos em cena em exposição

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


		ChaseCamera= new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
		BackCamera= new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
		OrthoCamera = new THREE.OrthographicCamera(-window.innerWidth, window.innerWidth, window.innerHeight, -window.innerHeight, 0.1, 51);

		BackCamera.position.x = 0;
		BackCamera.position.y = -500;
		BackCamera.position.z = 250;
		BackCamera.rotation.x = 0.8;

		ChaseCamera.position.x = -100;
		ChaseCamera.position.y = 0;
		ChaseCamera.position.z = 100;
		ChaseCamera.rotation.y = -1;

		ChaseCamera.rotation.z = -90 * Math.PI / 180;


		OrthoCamera.position.z=30;

}

function render() {
    'use strict';

		if(activeCamera==1){renderer.render(scene,OrthoCamera);}
		if(activeCamera==2){renderer.render(scene,BackCamera);}
		if(activeCamera==3){renderer.render(scene,ChaseCamera);}

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

function onKeyPressed(e) {
	if (e.keyCode == 49) {
			activeCamera = 1;
	}

	if (e.keyCode == 50) {
		activeCamera = 2;
	}

	if (e.keyCode == 51) {
		activeCamera = 3;
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


function onResize(){
  'use strict';

	renderer.setSize(window.innerWidth, window.innerHeight);

	var ratioJanela = renderer.getSize().height /renderer.getSize().width; // Altura da janela / Comprimento da janela : assegura o rácio da janela

	if (ratioJanela > ratioMesa) { // Atualizamos as medidas da mesa para o resize vertical
		camera.right = 2500 / 2;
		camera.left = -2500 / 2;
		camera.top = (1500 * ratioJanela) / (ratioMesa * 2); // Assegurar uma altura máxima aceitável
		camera.bottom = (-1500 * ratioJanela) / (ratioMesa * 2); // Assegurar uma altura minima aceitável

	}
	else { // Atualizamos as medidas da mesa para o resize horizontal
    camera.right = (2500 / ratioJanela) / ( (1 / ratioMesa) * 2);
    camera.left = (-2500 / ratioJanela) / ( (1 / ratioMesa) * 2);
		camera.top = 1500 / 2;
		camera.bottom = -1500 / 2;

	}

	camera.updateProjectionMatrix();

}

function createFloor(x, y, z) {
    'use strict';

    material = new THREE.MeshBasicMaterial({ color: 0x696969, wireframe: false});

    geometry = new THREE.CubeGeometry(2500, 1500, 1);

    table = new THREE.Mesh(geometry, material);

    table.position.x = x;
    table.position.y = y;
    table.position.z = z;

    scene.add(table);

}

/*
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
*/

function createCheerio(x, y){
    'use strict';

    var geometry = new THREE.TorusBufferGeometry(12, 2.5, 8, 100);
    var material = new THREE.MeshBasicMaterial({color: 0x000000});
    var torus = new THREE.Mesh(geometry, material);
    torus.position.x = x;
    torus.position.y = y;
    torus.position.z = 1;

	torus.vx = 0;
	torus.vy = 0;
	torus.acceleration = 3;

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
            for (var i = 0; i<360; i+=6){
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
  	geometry = new THREE.SphereGeometry(30, 32, 22);
  	material = new THREE.MeshBasicMaterial( { color: 0xFFA500, wireframe: false});
  	mesh = new THREE.Mesh( geometry, material );

	orange.add(mesh);

	geometry = new THREE.BoxGeometry(10, 10, 2);
  	material = new THREE.MeshBasicMaterial({ color: 0x008000, wireframe: false});
  	var leaf = new THREE.Mesh( geometry, material );

	leaf.position.z = 30;
	orange.add(leaf);

  	orange.position.set(x,y,0);
	orange.category = "orange";
	orange.acceleration = Math.floor(Math.random() * 3) + 1;
	orange.vx = 0;

  scene.add(orange);
}

function createButter(x,y) {
  'use strict';

  geometry = new THREE.BoxGeometry(80, 50, 50);
  material = new THREE.MeshBasicMaterial( {color: 0xFFFF80, wireframe: false} );
  var butter = new THREE.Mesh(geometry, material);

	butter.position.set(x,y,0);
	butter.category = "butter";

  scene.add(butter);
}

function createWheel(obj, x, y, z){
    'use strict';

    geometry = new THREE.TorusBufferGeometry(2, 2, 8, 100);
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

		top.position.z = 2;
    car.add(top); // Adiciona ao carro uma parte de cima
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
		car.category = "car";

    createWheel(chassis, -x/2 + 5, y/2, 1);
    createWheel(chassis, x/2 - 5, y/2, 1);
    createWheel(chassis, x/2 - 5, -y/2, 1);
    createWheel(chassis, -x/2 + 5, -y/2, 1);

    addTop(car, x, y, z);

		/* To-do
    cone.position.x=x/20;
    cone.position.y=y/25;
    cone.position.z=17;
    cone.rotation.z+=Math.PI*1.5;
    car.add(cone);

		*/

		car.add( ChaseCamera );

    car.add(chassis);

		car.position.z = 7;

		scene.add(car);


}

function update()
{
	var delta = clock.getDelta();

	scene.traverse(function(node) {
		if (node instanceof THREE.Mesh) {
			node.material.wireframe = wrfrm;
		}
		if(node instanceof THREE.Object3D && node!=null){
			position(node);
			movement(node, delta);
			collision(node);
		}
	});

function movement(object,time) {
	'use strict';

	if(object.category == "car")
	{

		if (move.forward == true) // Tecla Cima
		{
			 	object.drag = 1;
			 	/* Atualizacao do vetor velocidade eixo x*/
			 	object.vx += (object.acceleration*time) * Math.cos(object.angle);
				object.vx *= object.drag * Math.cos(object.angle);
				object.translateX(object.vx +(0.5)*object.acceleration*time*time);

				/* Atualizacao do vetor velocidade eixo y*/
				object.vy += (object.acceleration*time) * Math.sin(object.angle);
				object.vy *= object.drag * Math.sin(object.angle);
				object.translateY(object.vy + (0.5)*object.acceleration*time*time);


			}
		if (move.backward == true) // Tecla Baixo
		{
				/* Atualizacao do vetor velocidade eixo x*/
			 	object.vx += (-object.acceleration*time) * Math.cos(object.angle);
			 	object.vx *= object.drag * Math.cos(object.angle);
				object.translateX(object.vx + (0.5)*object.acceleration*time*time);

				/* Atualizacao do vetor velocidade eixo y*/
				object.vy += (-object.acceleration*time) * Math.sin(object.angle);
			 	object.vy *= object.drag * Math.sin(object.angle);
				object.translateY(object.vy + (0.5) * object.acceleration*time*time);

		}

		if (move.left == true) // Tecla Esquerda
		{
				/* Atualizacao do angulo no sentido positivo*/
				object.angle = 180 * time * (Math.PI)/180;
				object.rotation.z += object.angle;
		}

		if (move.right == true) // Tecla Direita
		{
				/* Atualizacao do angulo no sentido negativo*/
				object.angle = 180 * time * Math.PI/180;
				object.rotation.z -= object.angle;
		}

		//ChaseCamera.lookAt(object.position);
		//ChaseCamera.position.y = object.position.y;


 /*  Para parar o carro de acordo com as leis de movimento implementadas */
	 	object.vx -= object.vx*time * Math.cos(object.angle);
		object.vx -= object.vx*time * Math.sin(object.angle);
	 	object.translateX(object.vx);
		object.translateY(object.vy);
	 }

	 if (object.category == "orange") {
		 /* Atualizacao do vetor velocidade eixo x*/
		 object.vx += (object.acceleration*time);
		 object.translateX(object.vx +(0.5)*object.acceleration*time*time);
		 object.rotation.x += 5*time;
		 }
}

function position(object) {
	if (object.category == "orange") {
		if (object.position.x >= 1250) {
			object.visible = false; // Remove laranja de cena
		}
		if (object.position.x >= 2500) {
			object.vx = 0;
			object.position.x = Math.floor(Math.random() * 1200) - 1200 ;
			object.position.y = Math.floor(Math.random() * 700) - 700 ;

			object.visible = true;
		}
	}
}

function collision(object){
	aabb1 = new THREE.Box3().setFromObject(object);
	var difX;
	var difY;
	if (object.category == "car"){
		scene.traverse(function(node) {
			aabb2 = new THREE.Box3().setFromObject(node);
			if (object != node){
				if (node.category == "butter"){
					if (aabb1.intersectsBox(aabb2)){
						move.forward = false;
					}
					aabb2.makeEmpty();
				}
				if (node.category == "orange"){
					if (aabb1.intersectsBox(aabb2)){
						car.position.set(1000, 10, 10);
						move.forward = false;

					}
					aabb2.makeEmpty();
				}
				if (node.category == "cheerio"){
					if (aabb1.intersectsBox(aabb2)){
						difX = (node.x - object.x);
						difY = (node.y - object.y);

					}
					aabb2.makeEmpty();
				}
			}
		});
	}
	// if (object.category == "cheerio"){
	// 	scene.traverse(function(node) {
	// 		aabb2 = new THREE.Box3().setFromObject(node);
	// 		if (object != node && node.category == "cheerio"){
	// 			if (aabb1.intersectsBox(aabb2)){
	// 				if (node.vx == 0 && node.y == 0){ // o node está parado e o object esta a andar
	// 					difX = (node.x - object.x);
	// 					difY = (node.y - object.y);
	//
	// 				}
	// 				else if (object.vx && object.vy == 0){ // o object esta parado e o node esta a andar
	// 					difX = (object.x - node.x);
	// 					difY = (object.y - node.y);
	// 				}
	//
	//
	// 			}
	// 		}
	// 	}
	// });
	aabb1.makeEmpty();

}
}

/* global THREE */

var scene, renderer, activeCamera, OrthoCamera, ChaseCamera, BackCamera, geometry, material, mesh, clock, table;

var ratioMesa = 1500/2500; // Altura da mesa / Comprimento da mesa : assegura o rácio de aspeto desta

var wrfrm = false; // Atributo de wireframe dos objetos

var hasCollision = false;

var disableForward = false;
var disableBackward = false;

function init() {
    'use strict';

		activeCamera = 1;

		clock =  new THREE.Clock();

		renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    createScene();
		createTrack();
		createCamera();


    createCar(30, 15, 7);

    window.addEventListener( 'resize', onResize); // Deteta os eventos de alteração de tamanho da janela
    window.addEventListener( 'keydown', onKeyDown, false ); // Deteta os eventos de tecla a ser premida
		window.addEventListener( 'keyup', onKeyUp, false ); // Deteta os eventos de libertacao de teclas
		window.addEventListener( 'keypress' , onKeyPressed);
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

		var axisHelper = new THREE.AxisHelper( 200 );
		scene.add( axisHelper );

		createFloor(0, 0, 0);
}

function createCamera(){
		'use strict';


		ChaseCamera= new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 3500);
		BackCamera= new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 3500);
		OrthoCamera = new THREE.OrthographicCamera(-window.innerWidth, window.innerWidth, window.innerHeight, -window.innerHeight, 0.1, 150);

		BackCamera.position.y = -1500;
		BackCamera.position.z = 1000;
		BackCamera.rotation.y = -90 * Math.PI / 180;

		BackCamera.lookAt(scene.position);

		ChaseCamera.position.x = -100;
		ChaseCamera.position.y = 0;
		ChaseCamera.position.z = 100;
		ChaseCamera.rotation.y = -1;
		ChaseCamera.rotation.z = -90 * Math.PI / 180;

		OrthoCamera.position.z=100;

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
			collision(node, delta);
		}
	});

function movement(object,time) {
	'use strict';

	if(object.category == "car")
	{

		if (move.forward == true )//&& disableForward == false) // Tecla Cima
		{

			 	object.drag = 1;
			 	/* Atualizacao do vetor velocidade eixo x*/
			 	object.vx += (object.acceleration*time) * Math.cos(object.angle);
				object.vx *= object.drag * Math.cos(object.angle);
				object.translateX(object.vx +(0.5)*object.acceleration*time*time);

				object.previousX = object.position.x - (object.vx +(0.5)*object.acceleration*time*time);

				/* Atualizacao do vetor velocidade eixo y*/
				object.vy += (object.acceleration*time) * Math.sin(object.angle);
				object.vy *= object.drag * Math.sin(object.angle);
				object.translateY(object.vy + (0.5)*object.acceleration*time*time);

				object.previousY = object.position.y - (object.vy +(0.5)*object.acceleration*time*time);

				//if (disableBackward == true && hasCollision == false) {
					//disableBackward = false;
				//}

			}
		if (move.backward == true) //&& disableBackward == false) // Tecla Baixo
		{
			// if (disableForward == true && hasCollision == false) {
			// 	disableForward = false;
			// }
				/* Atualizacao do vetor velocidade eixo x*/

			 	object.vx += (-object.acceleration*time) * Math.cos(object.angle);
			 	object.vx *= object.drag * Math.cos(object.angle);
				object.translateX(object.vx + (0.5)*object.acceleration*time*time);

				object.previousX = object.position.x + (object.vx +(0.5)*object.acceleration*time*time);
				/* Atualizacao do vetor velocidade eixo y*/
				object.vy += (-object.acceleration*time) * Math.sin(object.angle);
			 	object.vy *= object.drag * Math.sin(object.angle);
				object.translateY(object.vy + (0.5) * object.acceleration*time*time);

				object.previousY = object.position.y - (object.vy +(0.5)*object.acceleration*time*time);

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

			setTimeout(function () {
				object.visible = true;
			}, Math.floor(Math.random() * 5000) + 2000);
		}
	}

	if (object.category == "car") {
		if (object.position.x >= 1250) {
			object.visible = false; // Remove laranja de cena
		}
		else {
			object.visible = true;
		}
	}
}

function collision(object, time){
	'use strict'
	var aabb1 = new THREE.Box3().setFromObject(object);
	if (object.category == "car"){
		scene.traverse(function(node) {
			var aabb2 = new THREE.Box3().setFromObject(node);
			if (object != node){
				if (node.category == "butter"){

					if (aabb1.intersectsBox(aabb2)){
						object.vx = 0;
						object.vy = 0;
						object.position.x = object.previousX;
						object.position.y = object.previousY;
						move.forward = 0;
					}


					// 	var d = Math.sqrt((object.position.x - node.position.x)^2 + (object.position.y - node.position.y)^2);
					// 	console.log(d);
					// 	var x = object.position.x - node.position.x;
					// 	var y = object.position.y - node.position.y;
					// 	var angle = Math.atan(y/x);
					// 	var dx = ((object.r + node.r) - d) * Math.cos(angle);
					// 	var dy = ((object.r + node.r) - d) * Math.sin(angle);
					// 	console.log(d);
					// 	console.log(angle);
					// 	console.log(object.r);
					// 	console.log(dx);
					// 	object.position.x += dx;
					// 	object.position.y += dy;
					// 	aabb2.makeEmpty();
					// 	aabb1.makeEmpty();
					// }


					// 	if (move.forward == true) {
					// 		// disableForward = true;
					// 		// hasCollision = true;
					// 		// move.forward = false;
					// 		object.vx = 0;
					// 		object.vy = 0;
					// 	}
					// 	if (move.backward == true) {
					// 		// move.backward = false;
					// 		object.vx = 0;
					// 		object.vy = 0;
					// 		// disableBackward = true;
					// 	}

				}
				else if (node.category == "orange"){
					if (aabb1.intersectsBox(aabb2)){
						object.position.set(0, 0, 7);
						move.forward = false;
						object.vx = 0;
						object.vy = 0;
					}
					aabb2.makeEmpty();
				}
				else if (node.category == "cheerio"){
					if (aabb1.intersectsBox(aabb2)){
						node.vx = object.vx;
						node.vx = object.vx;
					}
					node.vx -= node.vx*time * Math.cos(object.angle);
					node.vx -= node.vx*time * Math.sin(object.angle);
					node.translateX(node.vx);
					node.translateY(node.vy);

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

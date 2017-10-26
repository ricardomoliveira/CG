/* global */

var scene, renderer, activeCamera, OrthoCamera, ChaseCamera, BackCamera, geometry, material, mesh, clock, table;

var ratioMesa = 1500/2500; // Altura da mesa / Comprimento da mesa : assegura o rácio de aspeto desta

var wrfrm = false; // Atributo de wireframe dos objetos

function init() {
    'use strict';

	activeCamera = 1; //Definimos que a camara a utilizar no inicio do jogo é a camara 1, a ortográfica

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
	window.addEventListener( 'keypress' , onKeyPressed); //Deteta se uma tecla foi apenas pressionada
	window.addEventListener('beforeunload', onResize, false); //Não entendi ???????
}

function animate() {
	//Ciclo Update-Display
	update();
    render(); // Coloca os objetos em cena em exposição

    requestAnimationFrame(animate);
}

function createScene() {
    'use strict';

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

	var axisHelper = new THREE.AxisHelper( 200 ); //Para ajudar na orientação e visualização criou-se os eixos x, y e z 
	scene.add( axisHelper );

	createFloor(0, 0, 0);
}

function createCamera(){
	'use strict';

	ChaseCamera= new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 3500);
	BackCamera= new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 3500);
    OrthoCamera = new THREE.OrthographicCamera(-1300, 1300, 790, -790, 0.1, 150);
    // if (window.innerHeight / window.innerWidth  < ratioMesa){
	//       OrthoCamera = new THREE.OrthographicCamera(-window.innerWidth, window.innerWidth, window.innerHeight, -window.innerHeight, 0.1, 150);
    // }
    // else { OrthoCamera = new THREE.OrthographicCamera(-1250, 1250, 750, -750, 0.1, 150); }

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

	//Definição da troca de câmara conforme a tecla premida --> flag ativada
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
	if (activeCamera == 1){

		renderer.setSize(window.innerWidth, window.innerHeight);

		var ratioJanela = renderer.getSize().height /renderer.getSize().width; // Altura da janela / Comprimento da janela : assegura o r·cio da janela

		if (ratioJanela > ratioMesa) { // Atualizamos as medidas da mesa para o resize vertical
			OrthoCamera.right = 2500 / 2;
			OrthoCamera.left = -2500 / 2;
			OrthoCamera.top = (1500 * ratioJanela) / (ratioMesa * 2); // Assegurar uma altura máxima aceitável
			OrthoCamera.bottom = (-1500 * ratioJanela) / (ratioMesa * 2); // Assegurar uma altura minima aceitável

		}
		else { // Atualizamos as medidas da mesa para o resize horizontal
	    	OrthoCamera.right = (2500 / ratioJanela) / ( (1 / ratioMesa) * 2);
	    	OrthoCamera.left = (-2500 / ratioJanela) / ( (1 / ratioMesa) * 2);
			OrthoCamera.top = 1500 / 2;
			OrthoCamera.bottom = -1500 / 2;

		}

		OrthoCamera.updateProjectionMatrix();
	}
	if (activeCamera == 2) {

		renderer.setSize(window.innerWidth, window.innerHeight);


		if (window.innerHeight > window.innerWidth) {
			BackCamera.aspect = window.innerHeight / window.innerWidth; //Atualização do aspect da câmara conforme o valor de height e width
		}
		else {
			BackCamera.aspect = window.innerWidth / window.innerHeight;
		}

		BackCamera.updateProjectionMatrix(); //Tornar efetivas as alterações na câmara
	}


	if (activeCamera == 3) {

		renderer.setSize(window.innerWidth, window.innerHeight);

		if (window.innerHeight > window.innerWidth) {
			ChaseCamera.aspect = window.innerHeight / window.innerWidth;
		}
		else {
			ChaseCamera.aspect = window.innerWidth / window.innerHeight;
		}

		ChaseCamera.updateProjectionMatrix();
	}

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
		if (move.forward == true ) // Tecla Cima
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

		if (object.position.x >= 1250) { //Teste para verificar se sai de cima da mesa
			object.visible = false; // Se sair, remove laranja de cena
			object.collision = false; //Se está fora da mesa não há colisóes
		}

		if (object.position.x >= 2500) { // ???????
			object.vx = 0;
			object.position.x = Math.floor(Math.random() * 1200) - 1200 ; // ????????
			object.position.y = Math.floor(Math.random() * 700) - 700 ; // ????????

			setTimeout(function () { //Ao fim de um tempo aleatorio ela passa a ser visivel
				object.visible = true;
				object.collision = true; // ???????
			}, Math.floor(Math.random() * 5000) + 2000);
		}
	}

	if (object.category == "car") {
		if (object.position.x >= 1250 || object.position.x <= -1250 || object.position.y >= 750 || object.position.y <= -750) {
			object.visible = false; // Remove o carro de cena se sair de cima da mesa
		}
		else {
			object.visible = true;
		}
	}
}


function collision(object, time){
	'use strict'
	if (object.category == "car") { //Se a colisão for provocada pelo carro

		scene.traverse(function(node) {
			var d = Math.sqrt(Math.pow(object.position.x - node.position.x, 2) + Math.pow(object.position.y - node.position.y, 2)); // ??????
			if (object != node){ //Nao queremos que o carro teste se está a colidir consigo mesmo
				
				if (node.category == "butter") { 

					if (move.forward || object.vx > 0) { // Caso o carro tenha colidido de frente ???????
						if (object.r + node.r > d) { //Se a soma dos raios for maior que a distância entre os dois centros, há colisão

							var dx = ((object.r + node.r) - d) * Math.cos(object.angle + Math.PI); //Carro desloca-se em X a diferença entre a soma dos raios e a distância dos centros 
							var dy = ((object.r + node.r) - d) * Math.sin(object.angle + Math.PI); //ou seja desloca-se o quão entrou para dentro da manteiga

							object.vx = 0;
							object.vy = 0;
							move.backward = false;
							move.forward = false; //No instante em que colide não pode ir para a frente nem pode ressaltar para trás
							//Confirmar comentário em cima ????????


							object.translateX(dx); //Deslocação do carro para tratamento da colisão
							object.translateY(dy);
						}
					}

					if (move.backward || object.vx < 0) { //Caso tenha colidido de trás
						if (object.r + node.r > d){

							var dx = ((object.r + node.r) - d) * Math.cos(object.angle); //Nao se soma o PI aqui porquê ???????
							var dy = ((object.r + node.r) - d) * Math.sin(object.angle);


							object.vx = 0;
							object.vy = 0;
							move.forward = false; //Colidindo de trás não pode ressaltar para a frente
							//Se colidiu de trás náo pode ir para a frente????? 
							object.translateX(dx);
							object.translateY(dy);

						}
					}

				}
				else if (node.category == "cheerio"){

					if (object.r + node.r >= d){ //Caso exista colisão

						dx = (node.position.x - object.position.x) / Math.abs(node.position.x - object.position.x); //Deslocação do cheerio em X, que é o quão está a intersetar
						dy = (node.position.y - object.position.y) / Math.abs(node.position.y - object.position.y);
						node.vx = object.vx * 0.4; //Imprimimos velocidade ao cheerio, 0.4x a velocidade do carro
						node.vy = object.vy * 0.4;
						//Porquê dx VEZES (etc) no translateX??????
						node.translateX(dx * (node.vx + 0.5 * node.acceleration)); //Utilizamos a aceleração pré-definida para cada objeto, tempo irrelevante neste caso
						node.translateY(dy * (node.vy + 0.5 * node.acceleration));
					}
				}

				else if (node.category == "orange" && node.collision == true){ //node.collision é usado sequer? ??????

					if (object.r + node.r >= d) { //Caso exista colisão

						object.position.set(0, 0, 7); //O carro volta ao início, no centro da mesa
						move.forward = false; //No momento da colisão o carro não pode avançar mais
						object.vx = 0;
						object.vy = 0;
					}
				}
			}
		});
	}

	if (object.category == "cheerio"){ //Caso seja o cheerio o objeto que colide com outro
	    scene.traverse(function(node) {
	        var d = Math.sqrt(Math.pow(object.position.x - node.position.x, 2) + Math.pow(object.position.y - node.position.y, 2)); //???????

	        if (object != node && node.category == "cheerio"){ //Tem de ser uma colisao entre o próprio e outro cheerio
	            if (object.r + node.r >= d){

	                var dx = (node.position.x - object.position.x) / Math.abs(node.position.x - object.position.x); //O quanto o cheerio (o que estava imóvel antes) se vai mexer em X
	                var dy = (node.position.y - object.position.y) / Math.abs(node.position.y - object.position.y); 
	                node.vx = object.vx * 0.5; //O cheerio que estava imóvel vai ficar com metade da velocidade do outro cheerio
	                node.vy = object.vy * 0.5;
	                node.translateX(dx * (node.vx + 0.5 * node.acceleration)); //Utilizamos a aceleração pré-definida para cada objeto, tempo irrelevante neste caso
	                node.translateY(dy * (node.vy + 0.5 * node.acceleration));

	            }
	        }
	    });
	}

	}
}

var car = {
		category: "car",
		acceleration: 0,
		vx: 0,
		angle: 0,
		vy: 0,
		drag: 0,
		r: 0
};

var move = {
	forward: false,
	backward: false,
	left: false,
	right: false
};


function createWheel(obj, x, y, z){
    'use strict';

    geometry = new THREE.Geometry();
    geometry.vertices.push(
        new THREE.Vector3(1,0,0), //centro da parte da frente

        new THREE.Vector3(1, -1, -1.75), //1
        new THREE.Vector3(1, -2, 0 ), //2
        new THREE.Vector3(1, -1, 1.75), //3
        new THREE.Vector3(1, 1, 1.75), //4
        new THREE.Vector3(1, 2, 0), //5
        new THREE.Vector3(1, 1, -1.75), //6

        new THREE.Vector3(-1, 0, 0), //centro da parte de tras

        new THREE.Vector3(-1, -1, -1.75), //8
        new THREE.Vector3(-1, -2, 0), //9
        new THREE.Vector3(-1, -1, 1.75), //10
        new THREE.Vector3(-1, 1, 1.75), //11
        new THREE.Vector3(-1, 2, 0), //12
        new THREE.Vector3(-1, 1, -1.75) //13

    )

    geometry.faces.push(new THREE.Face3(0,1,2));//parte da frente da roda
    geometry.faces.push(new THREE.Face3(0,2,3));
    geometry.faces.push(new THREE.Face3(0,3,4));
    geometry.faces.push(new THREE.Face3(0,4,5));
    geometry.faces.push(new THREE.Face3(0,5,6));
    geometry.faces.push(new THREE.Face3(0,6,1));

    geometry.faces.push(new THREE.Face3(7,8,9)); // parte de tras da roda
    geometry.faces.push(new THREE.Face3(7,9,10));
    geometry.faces.push(new THREE.Face3(7,10,11));
    geometry.faces.push(new THREE.Face3(7,11,12));
    geometry.faces.push(new THREE.Face3(7,12,13));
    geometry.faces.push(new THREE.Face3(7,13,8));

    //preenchimento da roda
    geometry.faces.push(new THREE.Face3(4,11,10));
    geometry.faces.push(new THREE.Face3(4,10,3));

    geometry.faces.push(new THREE.Face3(2,9,10));
    geometry.faces.push(new THREE.Face3(2,10,3));

    geometry.faces.push(new THREE.Face3(1,8,9));
    geometry.faces.push(new THREE.Face3(1,9,2));

    geometry.faces.push(new THREE.Face3(6,13,8));
    geometry.faces.push(new THREE.Face3(6,8,1));

    geometry.faces.push(new THREE.Face3(6,13,12));
    geometry.faces.push(new THREE.Face3(6,12,5));

    geometry.faces.push(new THREE.Face3(5,12,11));
    geometry.faces.push(new THREE.Face3(5,11,4));

    geometry.computeFaceNormals();


    var wheelmaterial = new THREE.MeshPhongMaterial( { color: 0x000000, wireframe: false});

    var wheelmesh = new THREE.Mesh(geometry, wheelmaterial);

    wheelmesh.position.set(x,y,z);

    wheelmesh.rotation.x = Math.PI/2;

    obj.add(wheelmesh);
}

function createRoofTop(obj){
	'use strict'

	geometry = new THREE.Geometry();

    geometry.vertices.push(
    	new THREE.Vector3(-15, -7.5, 7), //0
    	new THREE.Vector3(15,-7.5, 7), //1
    	new THREE.Vector3(-15, 7.5, 7), //2
    	new THREE.Vector3(15, 7.5, 7), //3

		new THREE.Vector3(12, -4.5, 11), //4
		new THREE.Vector3(12, 4.5, 11), //5
		new THREE.Vector3(-12, 4.5, 11), //6
		new THREE.Vector3(-12, -4.5, 11) //7
    )
	//faces laterais do trapezio solido
	geometry.faces.push(new THREE.Face3(1, 3, 5));
	geometry.faces.push(new THREE.Face3(1, 5, 4));
	geometry.faces.push(new THREE.Face3(3, 2, 6));
	geometry.faces.push(new THREE.Face3(3, 6, 5));
	geometry.faces.push(new THREE.Face3(2, 0, 7));
	geometry.faces.push(new THREE.Face3(2, 7, 6));
	geometry.faces.push(new THREE.Face3(0, 1, 4));
	geometry.faces.push(new THREE.Face3(0, 4, 7));

	//face do topo
	geometry.faces.push(new THREE.Face3(4, 5, 6));
	geometry.faces.push(new THREE.Face3(4, 6, 7));

	//face de baixo
	geometry.faces.push(new THREE.Face3(0, 2, 1));
	geometry.faces.push(new THREE.Face3(1, 2, 3));

	geometry.computeFaceNormals();

	var topmaterial = new THREE.MeshPhongMaterial( { color: 0xff2800, wireframe: false});

	var topmesh = new THREE.Mesh(geometry, topmaterial);

	obj.add(topmesh);

}


function createCar(x, y, z){
    'use strict'

    var acceleration;

	car = new THREE.Object3D();

	car.add( ChaseCamera ); // A camara fa7 parte do grafo de cena do carro, logo sofre todas as transformações deste

	//Criacão dos farois
	var spotLight1 = new THREE.SpotLight( 0xffffff );
	spotLight1.angle = Math.PI / 6;
	spotLight1.distance = 100;
	spotLight1.intensity = 3;
	spotLight1.position.set(15, 7, 3.5);

	var spotLight2 = new THREE.SpotLight( 0xffffff );
	spotLight2.angle = Math.PI / 6;
	spotLight2.distance = 100;
	spotLight2.intensity = 3;
	spotLight2.position.set(15, -7, 3.5);

	var targetObject1 = new THREE.Object3D();
	targetObject1.position.set(16, 7.15, 3.5);
	spotLight1.target = targetObject1;

	var targetObject2 = new THREE.Object3D();
	targetObject2.position.set(16, -7.15, 3.5);
	spotLight2.target = targetObject2;

	car.add(spotLight1);
	car.add(targetObject1);
	car.add(spotLight2);
	car.add(targetObject2);

	car.vx = 0; /* Velocidade eixo x */
	car.vy = 0; /* Velocidade eixo y */
	car.acceleration = 10; /* Aceleração pré-definida do carro */
	car.drag = 0.99; /* Atrito entre o carro e a pista */
	car.angle = 0; /* Ângulo de direção do carro */
	car.category = "car";
	car.r = Math.sqrt(281.25);  //Raio da 'bounding sphere' imaginária, sqrt(15^2 + 7,5^2)


	geometry = new THREE.Geometry();
	geometry.vertices.push(
    	new THREE.Vector3(15, -7.5, 0), //0
    	new THREE.Vector3(-15, -7.5, 0 ), //1
    	new THREE.Vector3(-15, -7.5, 7), //2
    	new THREE.Vector3(15,-7.5, 7), //3

    	new THREE.Vector3(-15, 7.5, 0), //4
    	new THREE.Vector3(-15, 7.5, 7), //5
    	new THREE.Vector3(15, 7.5, 0), //6
    	new THREE.Vector3(15, 7.5, 7) //7
    )

    geometry.faces.push(new THREE.Face3(0,2,1));//face da frente com regra da mao esquerda
    geometry.faces.push(new THREE.Face3(0,3,2));

    geometry.faces.push(new THREE.Face3(4,5,6));//face de tras com regra da mao direita
    geometry.faces.push(new THREE.Face3(6,5,7));

	geometry.faces.push(new THREE.Face3(0,6,7));//face do lado direito
	geometry.faces.push(new THREE.Face3(0,7,3));

    geometry.faces.push(new THREE.Face3(4,1,5));//face do lado esquerdo, normal para dentro (face virada para o user na camera 3)
    geometry.faces.push(new THREE.Face3(1,2,5));

	geometry.faces.push(new THREE.Face3(3,7,5));//face de cima
	geometry.faces.push(new THREE.Face3(3,5,2));

	geometry.faces.push(new THREE.Face3(0,6,4));//face de baixo
	geometry.faces.push(new THREE.Face3(0,4,1));

    geometry.computeFaceNormals();

    var carmaterial = new THREE.MeshPhongMaterial( { color: 0xff2800, wireframe: false});

    var carmesh = new THREE.Mesh(geometry, carmaterial);

	car.add(carmesh);


	createRoofTop(car);
    createWheel(car, 12.5, 7.4, 2);
    createWheel(car, 12.5, -7.4, 2);
    createWheel(car, -12.5, 7.4, 2);
    createWheel(car, -12.5, -7.4, 2);

	car.position.set(x,y,z);

	return car;
}

function createLives(x, y, z) {

car = new THREE.Object3D();

geometry = new THREE.Geometry();
geometry.vertices.push(
		new THREE.Vector3(15, -7.5, 0), //0
		new THREE.Vector3(-15, -7.5, 0 ), //1
		new THREE.Vector3(-15, -7.5, 7), //2
		new THREE.Vector3(15,-7.5, 7), //3

		new THREE.Vector3(-15, 7.5, 0), //4
		new THREE.Vector3(-15, 7.5, 7), //5
		new THREE.Vector3(15, 7.5, 0), //6
		new THREE.Vector3(15, 7.5, 7) //7
	)

	geometry.faces.push(new THREE.Face3(0,2,1));//face da frente com regra da mao esquerda
	geometry.faces.push(new THREE.Face3(0,3,2));

	geometry.faces.push(new THREE.Face3(4,5,6));//face de tras com regra da mao direita
	geometry.faces.push(new THREE.Face3(6,5,7));

geometry.faces.push(new THREE.Face3(0,6,7));//face do lado direito
geometry.faces.push(new THREE.Face3(0,7,3));

	geometry.faces.push(new THREE.Face3(4,1,5));//face do lado esquerdo, normal para dentro (face virada para o user na camera 3)
	geometry.faces.push(new THREE.Face3(1,2,5));

geometry.faces.push(new THREE.Face3(3,7,5));//face de cima
geometry.faces.push(new THREE.Face3(3,5,2));

geometry.faces.push(new THREE.Face3(0,6,4));//face de baixo
geometry.faces.push(new THREE.Face3(0,4,1));

	geometry.computeFaceNormals();

	var carmaterial = new THREE.MeshPhongMaterial( { color: 0xff2800, wireframe: false});

	var carmesh = new THREE.Mesh(geometry, carmaterial);

car.add(carmesh);


createRoofTop(car);
	createWheel(car, 12.5, 7.4, 2);
	createWheel(car, 12.5, -7.4, 2);
	createWheel(car, -12.5, 7.4, 2);
	createWheel(car, -12.5, -7.4, 2);

car.position.set(x,y,z);

return car;
}

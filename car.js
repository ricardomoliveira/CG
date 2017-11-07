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


/*function createWheel(obj, x, y, z){
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

    material = new THREE.MeshBasicMaterial( {color: 0xff2800, wireframe: false} );
    var top = new THREE.Mesh(geometry, material);

	top.position.z = 2;
    car.add(top); // Adiciona ao carro uma parte de cima


    geometry.faces.push(new THREE.Face3(0,1,2));		//Front Face
	    geometry.faces.push(new THREE.Face3(0,2,3));

	    geometry.faces.push(new THREE.Face3(4,6,5));		//Back Face
	    geometry.faces.push(new THREE.Face3(7,6,4));

	    geometry.faces.push(new THREE.Face3(3,2,6));//Top Face
    	geometry.faces.push(new THREE.Face3(3,6,7));

    	geometry.faces.push(new THREE.Face3(0,4,5));//Bottom Face
    	geometry.faces.push(new THREE.Face3(0,5,1));

    	geometry.faces.push(new THREE.Face3(1,5,6));//Right Face
    	geometry.faces.push(new THREE.Face3(1,6,2));

    	geometry.faces.push(new THREE.Face3(0,3,7));//left Face
    	geometry.faces.push(new THREE.Face3(0,7,4));

}*/


function createCar(x, y, z){
    'use strict'

    var acceleration;

	car = new THREE.Object3D();

	car.add( ChaseCamera ); // A camara fa7 parte do grafo de cena do carro, logo sofre todas as transformações deste

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

	geometry.faces.push(new THREE.Face3(0,1,2));//face da frente
    geometry.faces.push(new THREE.Face3(0,2,3));

    geometry.faces.push(new THREE.Face3(4,6,5));//face de tras caso regra da mao direita
    geometry.faces.push(new THREE.Face3(6,5,7));

    /*geometry.faces.push(new THREE.Face3(6,5,4)); //face de tras caso regra da mao esquerda (de nao estar visivel, idk)
    geometry.faces.push(new THREE.Face3(6,7,5));*/

	geometry.faces.push(new THREE.Face3(0,6,7));//face do lado direito
	geometry.faces.push(new THREE.Face3(0,7,3));

	geometry.faces.push(new THREE.Face3(1,4,5));//face do lado esquerdo
	geometry.faces.push(new THREE.Face3(1,5,2));

	geometry.faces.push(new THREE.Face3(3,7,5));//face de cima
	geometry.faces.push(new THREE.Face3(3,5,2));

	geometry.faces.push(new THREE.Face3(0,6,4));//face de baixo
	geometry.faces.push(new THREE.Face3(0,4,1));

    /*geometry.faces.push(new THREE.Face3(6,0,4)); //face de baixo caso regra da mao esquerda (de nao estar visivel, idk)
    geometry.faces.push(new THREE.Face3(0,1,4));*/	


    geometry.computeFaceNormals();
    
    var basicmat = new THREE.MeshBasicMaterial( { color: 0xff2800, wireframe: false});
    var lambertmat = new THREE.MeshLambertMaterial( { color: 0xff2800, wireframe: false});
    var phongmat = new THREE.MeshPhongMaterial( { color: 0xff2800, wireframe: false});
    var carmaterial = lambertmat;

    var carmesh = new THREE.Mesh(geometry, carmaterial);

	car.add(carmesh);

	car.position.set(x,y,z);

	scene.add(car);

}

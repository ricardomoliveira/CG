var car = {
		category: "car",
		acceleration: 0,
		vx: 0,
		angle: 0,
		vy: 0,
		drag: 0,
		previousX: 0,
		previousY: 0,
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
	  car = new THREE.Object3D();

	  car.vx = 0; /* Velocidade eixo x */
	  car.vy = 0; /* Velocidade eixo y */
	  car.acceleration = 10; /* Aceleração pré-definida do carro */
	  car.drag = 0.99; /* Atrito entre o carro e a pista */
	  car.angle = 0; /* Ângulo de direção do carro */
	  car.category = "car";
	  car.r = Math.sqrt((15^2) + (7.5^2));

    createWheel(chassis, -x/2 + 5, y/2, 1);
    createWheel(chassis, x/2 - 5, y/2, 1);
    createWheel(chassis, x/2 - 5, -y/2, 1);
    createWheel(chassis, -x/2 + 5, -y/2, 1);

    addTop(car, x, y, z);

	  car.add( ChaseCamera );

    car.add(chassis);

	  car.position.z = 7;

	  scene.add(car);

}

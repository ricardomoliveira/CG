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

function createStart() {
  material = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, wireframe: false});

  geometry = new THREE.CubeGeometry(15, 15, 1);

  start = new THREE.Mesh(geometry, material);

  start.position.x = 0;
  start.position.y = 0;
  start.position.z = 5;

  scene.add(start);

}
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
	     torus.acceleration = 7;

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
                if (i<155 || i>210)
                    createCheerio(Math.cos(i * (Math.PI/180))*radius + x, Math.sin(i* (Math.PI/180))*radius + y);
                }
        else { // circulo da esquerda
            for (var i = 0; i<360; i+=6){
                if (i>30 && i<335)
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
	geometry = new THREE.SphereGeometry(30, 20, 20);
	material = new THREE.MeshBasicMaterial( { color: 0xFFA500, wireframe: false});
	mesh = new THREE.Mesh( geometry, material );
	orange.add(mesh);

	geometry = new THREE.BoxGeometry(10, 10, 2);
  	material = new THREE.MeshBasicMaterial({ color: 0x008000, wireframe: false});
  	var leaf = new THREE.Mesh( geometry, material );
	leaf.translateZ(30);
	leaf.rotation.x += 10;

	orange.add(leaf);

	orange.translateX(x);
	orange.translateY(y);
	orange.translateZ(25);

	orange.category = "orange";
	orange.acceleration = Math.floor(Math.random() * 3) + 1;
	orange.vx = 0;
	orange.r = 30;


  scene.add(orange);
}

function createButter(x,y) {
  'use strict';

  geometry = new THREE.BoxGeometry(80, 50, 50);
  material = new THREE.MeshBasicMaterial( {color: 0xFFFF80, wireframe: false} );
  var butter = new THREE.Mesh(geometry, material);

	butter.position.set(x,y,0);
	butter.category = "butter";
	butter.r = Math.sqrt((40^2) + (25^2));

  scene.add(butter);
}

function createTrack() {

  createStart();
  createCircularTrack(350, 150, 300, 0, 1); // Cria a pista da esquerda
  createCircularTrack(350, 150, -300, 0, -1); // Cria a pista da direita

  for (var i = 1; i <= 3; i++) {
    createOrange(Math.floor(Math.random() * 500) - 500, Math.floor(Math.random() * 500) - 500);
  }

  for (var i = 1; i <= 5; i++) {
    if (i % 2 == 0) {
      createButter(Math.floor(Math.random() * -50) - 750, Math.floor(Math.random() * 700) - 700);
    }
    else
      createButter(Math.floor(Math.random() * 50) + 750, Math.floor(Math.random() * 700) - 700);
  }
}

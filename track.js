function createFloor(x, y, z) {
    'use strict';

    var table = new THREE.Object3D();

    var texture = new THREE.TextureLoader().load('./textures/floortexture.jpg');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 1, 1 );

    material = new THREE.MeshPhongMaterial({ map: texture, transparent: true});

    geometry = new THREE.BoxGeometry(2500, 1500, 5);

    mesh = new THREE.Mesh(geometry, material);
    table.add(mesh);
    table.position.x = x;
    table.position.y = y;
    table.position.z = z;
    table.r1 = 1250;
    table.r2 = 2500;
    scene.add(table);

}

function createStart() {


  material = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, wireframe: false});

  geometry = new THREE.CubeGeometry(15, 15, 1);

  start = new THREE.Mesh(geometry, material);

  start.position.x = 0;
  start.position.y = 0;
  start.position.z = 1;

  scene.add(start);

}

function createCheerio(x, y){
    'use strict';

	var cheerio = new THREE.Object3D();
    var geometry = new THREE.TorusBufferGeometry(12, 2.5, 8, 10);
    var material = new THREE.MeshBasicMaterial({color: 0xFFFFFF});
    var torus = new THREE.Mesh(geometry, material);
	cheerio.add(torus);

    cheerio.position.x = x;
    cheerio.position.y = y;
    cheerio.position.z = 1;

	cheerio.vx = 0;
	cheerio.vy = 0;
	cheerio.acceleration = 5;
	cheerio.category = "cheerio";
	cheerio.mass = 10;
	cheerio.r = 15;

    scene.add(cheerio);
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

	//Criação da laranja
	var orange = new THREE.Object3D();
	geometry = new THREE.SphereGeometry(30, 20, 20);
	material = new THREE.MeshBasicMaterial( { color: 0xFFA500, wireframe: false});
	mesh = new THREE.Mesh( geometry, material );
	orange.add(mesh);

	//Criação da folha
	geometry = new THREE.BoxGeometry(10, 10, 2);
	material = new THREE.MeshBasicMaterial({ color: 0x008000, wireframe: false});
	var leaf = new THREE.Mesh( geometry, material );
	leaf.translateZ(30);
	leaf.rotation.x += 10;

	//var axisHelper = new THREE.AxisHelper( 200 );
	//orange.add( axisHelper );

	orange.leaf = leaf;
	orange.add(leaf);

	orange.translateX(x);
	orange.translateY(y);
	orange.translateZ(25);

	orange.category = "orange";
	orange.acceleration = Math.floor(Math.random() * 3) + 1; //Não entendi ??????
	orange.vx = 0;
	orange.r = 30;  //Raio da 'bounding sphere' imaginária, neste caso a própria laranja

	orange.collision = true; //Não entendi ???????

	scene.add(orange);
}

function createButter(x,y) {
  'use strict';

	var butter = new THREE.Object3D();
  	geometry = new THREE.BoxGeometry(80, 80, 20);
  	material = new THREE.MeshBasicMaterial( {color: 0xFFD700, wireframe: false} );
  	mesh = new THREE.Mesh(geometry, material);

	butter.add(mesh);

    butter.position.set(x,y,0);
	butter.category = "butter";
	butter.r = Math.sqrt(2400); //Raio da 'bounding sphere' imaginária

    butter.translateZ(10);

  	scene.add(butter);
}

function createCandle(x,y) {
  'use strict';

	var candle = new THREE.Object3D();
  	geometry = new THREE.BoxGeometry(10, 10, 10);
  	material = new THREE.MeshBasicMaterial( {color: 0xFFDEAD, wireframe: false} );
  	mesh = new THREE.Mesh(geometry, material);

	  candle.add(mesh);

    candle.position.set(x,y,0);
	  candle.category = "candle";

    candle.translateZ(5);

  	scene.add(candle);


}

function createTrack() {

  createStart();
  createCircularTrack(350, 150, 300, 0, 1); // Cria a pista da esquerda
  createCircularTrack(350, 150, -300, 0, -1); // Cria a pista da direita
  createCandle(0, 300);
  createCandle(0, -300);
  createCandle(650, -250);
  createCandle(650, 250);
  createCandle(-650, 250);
  createCandle(-650, -250);

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

/* Esclarecer a questão do "Far" da camera e da profundidade do cubo */
/* Criar classes */
/* Usar o keyUp /*

/*global THREE*/
var camera, scene, renderer;

var geometry, material, mesh;

function init(){
    'use strict';

    renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    createScene();
    createCamera();
    createPattern();
    createOrange(50, 450);
    createOrange(-350, 50);
    createBox(400, 0);

    render();

    window.addEventListener("resize", onResize);

    window.addEventListener("keydown", onKeyDown);
}

function createScene(){
    'use strict';

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    createFloor(0, 0, 0);
    createCircularTrack(350, 200, 300, 0, 1);
    createCircularTrack(350, 200, -300, 0, -1);

}

function createCamera(){
    'use strict';
    camera = new THREE.OrthographicCamera(-1000, 1000, 1000, -1000, 0.1, 100);
    camera.position.z=50;
    camera.lookAt(scene.position);

    scene.add(camera);
}

function render(){
    'use strict';
    renderer.render(scene, camera);
}

function onKeyDown(e){
    'use strict';

    switch (e.keyCode) {
        case 65:
        case 97:
            scene.traverse(function (node){
                if (node instanceof THREE.Mesh) {
                    node.material.wireframe = !node.material.wireframe;
                }
            });
            break;
    }

    render();
}

function onResize(){
    'use strict';

    renderer.setSize(window.innerWidth, window.innerHeight);

    if (window.innerHeight > 0 && window.innerWidth > 0){
        camera.aspect = renderer.getSize().width / renderer.getSize().height;
        camera.updateProjectionMatrix();
    }

    render();

}

function createFloor(x, y, z) {
    'use strict';

    var table = new THREE.Object3D();

    material = new THREE.MeshBasicMaterial({ color: 0xED113D, wireframe: false});

    geometry = new THREE.CubeGeometry(1500, 1500, 1);
    mesh = new THREE.Mesh(geometry, material);

    table.add(mesh);

    table.position.x = x;
    table.position.y = y;
    table.position.z = z;

    scene.add(table);

}

function createPattern() {
  'use strict';

  for (var i = -725; i < 750; i+=100) {
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

    var geometry = new THREE.TorusBufferGeometry(12, 2.5, 16, 100);
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
            for (var i = 0; i<360; i+=10){
                if (i<160 || i>210)
                    createCheerio(Math.cos(i * (Math.PI/180))*radius + x, Math.sin(i* (Math.PI/180))*radius + y);
                }
        else { // circulo da esquerda
            for (var i = 0; i<360; i+=10){
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

function createOrange(x, y) {
    'use strict';

    var geometry = new THREE.SphereGeometry(50, 20, 10);
    var material = new THREE.MeshBasicMaterial({color: 0xFFA500, wireframe: false});
    var orange = new THREE.Mesh(geometry, material);

    orange.position.x = x;
    orange.position.y = y;
    orange.position.z = 1;

    scene.add(orange);
}

function createBox(x,y) {
    'use strict';

    var geometry = new THREE.CubeGeometry(120, 50, 10);
    var material = new THREE.MeshBasicMaterial({color: 0xFFA500, wireframe: false});
    var box = new THREE.Mesh(geometry, material);

    box.position.x = x;
    box.position.y = y;
    box.position.z = 1;

    scene.add(box);
    }

function createCar(){
    'use strict'

    var w1, w2, w3, w4, chassis, top, car;
    w1 = new THREE.Mesh(new THREE.TorusBufferGeometry(12, 2.5, 16, 100));
    w1.postion.set(-20, 10, 2);

    w2 = new THREE.Mesh(new THREE.TorusBufferGeometry(12, 2.5, 16, 100));
    w2.postion.set(20, 10, 2);

    w3 = new THREE.Mesh(new THREE.TorusBufferGeometry(12, 2.5, 16, 100));
    w3.postion.set(20, -10, 2);

    w4 = new THREE.Mesh(new THREE.TorusBufferGeometry(12, 2.5, 16, 100));
    w4.postion.set(-20, -10, 2);

    chassis = new THREE.Object3D();
    chassis.add(w1);
    chassis.add(w2);
    chassis.add(w3);
    chassis.add(w4);

    top = new THREE.Mesh(new THREE.CubeGeometry(40, 20, 10));
    top.position.set(0, 0, 5);

    car = new THREE.Object3D();

    car.add(chassis);
    car.add(top);
    car.position.set(0, 0, 0);

    scene.add(car);


}

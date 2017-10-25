if (object.category == "cheerio"){
    scene.traverse(function(node) {
        var d = Math.sqrt(Math.pow(object.position.x - node.position.x, 2) + Math.pow(object.position.y - node.position.y, 2));

        if (object != node && node.category == "cheerio"){
            if (object.r + node.r >= d){
                var dx = (node.position.x - object.position.x) / Math.abs(node.position.x - object.position.x);
                var dy = (node.position.y - object.position.y) / Math.abs(node.position.y - object.position.y);
                node.vx = object.vx * 0.7;
                node.vy = object.vy * 0.7;
                node.translateX(dx * (node.vx + 0.5 * node.acceleration));
                node.translateY(dy * (node.vy + 0.5 * node.acceleration));

            }
        }
    });
}

function onResize(){
  'use strict';
	if (activeCamera == 1){
		renderer.setSize(window.innerWidth, window.innerHeight);

		var ratioJanela = renderer.getSize().height /renderer.getSize().width; // Altura da janela / Comprimento da janela : assegura o rácio da janela

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
	else if (activeCamera == 2){
		'use strict'
		renderer.setSize(window.innerWidth, window.innerHeight);

		if (window.innerHeight > 0 && window.innerWidth > 0) {
			BackCamera.aspect = renderer.getsize().width / renderer.getSize().height;
			BackCamera.updateProjectionMatrix();
		}
	}
	else {

	}
}

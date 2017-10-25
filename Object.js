Class Object {
    constructor(category, vx, vy, x, y, z){
        this.category = category;
        this.vx = vx;
        this.vy = vy;
        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
    }
    getCollisionResult(object);

    setPosition(x, y, z){
        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
    }
}

Class Car extends Object(){
    this.category = "car";

    getCollisionResult(object){
        var aabb1 = new THREE.Box3().setFromObject(self);
        var aabb2 = new THREE.Box3().setFromObject(object);

        if (object.category == "cheerio"){
            if (aabb1.intersectsBox(aabb2)){

                // node.angle = Math.tan((node.y - object.y)/(node.x - object.x))

                node.vx = object.vx;
                node.vy = object.vy;
                node.translateX(node.vx + 0.5*node.acceleration * time * time);
                node.translateY(node.vy + 0.5*node.acceleration * time * time);
            }
            aabb2.makeEmpty();

        }
        else if (object.category == "butter") {

            if (aabb1.intersectsBox(aabb2)){
                move.forward = false;
                car.vx = 0;
                car.vy = 0;
            }
            aabb2.makeEmpty();


        }
        else if (object.category == "orange"){
            if (aabb1.intersectsBox(aabb2)){
                car.position.set(1000, 10, 10);
                move.forward = false;
                car.vx = 0;
                car.vy = 0;

            }
            aabb2.makeEmpty();
        }
    }
}

Class Orange extends Object(){
    this.category = "orange"

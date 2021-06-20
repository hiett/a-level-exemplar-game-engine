import PhysicsSprite from "./physicsSprite";

class Player extends PhysicsSprite{
    init (x:any, y:any, width:any, height:any, texture:any, type: any){
        super.init(x, y, width, height, texture, type)
    }

    spawn (){}
}

export default Player
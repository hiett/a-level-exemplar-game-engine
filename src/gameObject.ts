import * as PIXI from "pixi.js";
import * as Matter from "matter-js"; 


export class GameObject{ 
    pixiData: any
    matterData: any
    constructor(pixiData: any, matterData: any){
        this.pixiData = pixiData
        this.matterData = matterData
    }
}


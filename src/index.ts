import * as _ from 'lodash'; 
import { Application, Loader, LoaderResource, Sprite } from 'pixi.js';
import * as PIXI from "pixi.js";

import './style.css'; 


function component(){
    const element = document.createElement('div'); 

    element.innerHTML = _.join('Hello this is a test')


    let app = new Application({width: 265, height: 256});
    app.renderer.backgroundColor= 0x061639;
    
    app.renderer.view.style.position = 'absolute';
    app.renderer.view.style.display = "block";

    app.renderer.resize(window.innerWidth, window.innerHeight);

    document.body.appendChild(app.view);
    return element;

    app.loader.load(setup)

    let rect: Sprite

    function setup(){
        rect = new PIXI.Rectangle(100, 150, 50, 50);

        rect.position.set(50, 60);
        rect.rotation = Math.PI / 3;
        rect.anchor.set(0.5, 0.5);

        //Add the cat to the stage
        app.stage.addChild(rect);

        app.ticker.add(d => gameLoop(d))
    }

    function gameLoop(delta: number) {
        rect.rotation += 0.01;
    }  
}

    


document.body.appendChild(component());



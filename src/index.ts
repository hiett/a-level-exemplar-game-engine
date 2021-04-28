import * as _ from 'lodash'; 
import { Application, Loader, LoaderResource, Sprite } from 'pixi.js';
;

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
}

document.body.appendChild(component());



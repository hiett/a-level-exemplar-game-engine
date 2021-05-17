import * as _ from 'lodash';
import { Application, Loader, LoaderResource, PlaneGeometry, Rectangle, Sprite } from 'pixi.js';
import * as PIXI from "pixi.js";

let keys:any = {};

import './style.css';


function component() {
  const element = document.createElement('div');

//Creating the application/stage in PIXI
  let app = new Application({ width: 512, height: 512 });
  app.renderer.backgroundColor = 0x061639;

  app.renderer.view.style.position = 'absolute';
  app.renderer.view.style.display = "block";

  document.body.appendChild(app.view);

  //Introduces simple cube sprite from file. 

  let player: Sprite = PIXI.Sprite.from("./images/square.png")
  player.anchor.set(0.5);
  player.x = app.view.width /2;
  player.y = app.view.height /2;

  app.stage.addChild(player); //adds sprite to the application

  window.addEventListener("keydown",keysDown)
  window.addEventListener("keyup", keysUp)

  app.ticker.add(gameloop); 

  return element;
}

function keysDown(e:any){
  console.log(e.keyCode)
  keys[e.keyCode] = true;
}

function keysUp(e:any){
  console.log(e.keyCode)
  keys[e.keyCode] = false;
}

function gameloop(){
  
}



document.body.appendChild(component());
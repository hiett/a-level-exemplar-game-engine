
import { Application, Loader, LoaderResource, PlaneGeometry, Rectangle, Sprite } from 'pixi.js';
import * as PIXI from "pixi.js";

let keys: any = {};
let player: Sprite;
let bgBack
let bgBuildingsFar
let bgBuildings
let bgForeground
let bgX: Number = 0;
let bgSpeed: Number = 1;

import './style.css';


function component() {
  const element = document.createElement('div');

  //Creating the application/stage in PIXI
  let app = new Application({ width: 512, height: 512 }); 

  app.renderer.view.style.position = 'absolute';
  app.renderer.view.style.display = "block";

  document.body.appendChild(app.view);

  //Introduces simple cube sprite from file. 

  player = PIXI.Sprite.from("./assets/square.png")
  player.anchor.set(0.5);
  player.x = app.view.width / 2;
  player.y = app.view.height / 2;

  app.stage.addChild(player); //adds sprite to the application

  window.addEventListener("keydown", keysDown)
  window.addEventListener("keyup", keysUp)
  
  return element
}

//Key handlers
function keysDown(e: any) {
  console.log(e.keyCode)
  keys[e.keyCode] = true;
}

function keysUp(e: any) {
  console.log(e.keyCode)
  keys[e.keyCode] = false;
}

function gameloop() {
  //Left arrow
  if (keys["38"]) {
    player.y -= 5;
  }
  //Right arrow
  if (keys["40"]) {
    player.y += 5;
  }
}

document.body.appendChild(component());
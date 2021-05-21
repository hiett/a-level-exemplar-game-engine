
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

  app.loader
    .add("bgback", "./assets/background-shite/bg.png")
    .add("bgBuildingsFar", "./assets/background-shite/far-buldings.png")
    .add("bgBuildings", "./assets/background-shite/buildings.png")
    .add("bgForeground", "./assets/background-shite/skill-foreground.png")
  app.loader.onComplete(initLevel)
  app.loader.load()

  function initLevel() {
    bgBack = createBg(app.loader.resources["bgback"].texture)
    bgBuildingsFar = createBg(app.loader.resources["bgBuildingsFar"].texture)
    bgBuildings = createBg(app.loader.resources["bgBuildings"].texture)
    bgForeground = createBg(app.loader.resources["bgForeground"].texture)
    
    //adds key handling function to game.
    app.ticker.add(gameloop);
  }

  function createBg(texture: any) {
    let tiling = new PIXI.TilingSprite(texture, 800, 600)
    tiling.position.set(0,0);
    app.stage.addChild(tiling)

    return tiling;
  }
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
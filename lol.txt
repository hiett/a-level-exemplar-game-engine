import {
  Application,
  Loader,
  LoaderResource,
  PlaneGeometry,
  Rectangle,
  Sprite,
} from "pixi.js";
import * as PIXI from "pixi.js";

let keys: any = {};
let player: Sprite;

import "./style.css";
const element = document.createElement("div");

function component() {
  let app = new PIXI.Application({
    width: 800,
    height: 600,
    backgroundColor: 0x808080,
  });
  document.body.appendChild(app.view);

  //creating an avatar for the player
  player = PIXI.Sprite.from("./assets/sqaure.png");
  player.anchor.set(0.5);
  player.x = 0;
  player.y = 0;

  app.stage.addChild(player);

  //keyboard event handlers
  window.addEventListener("keydown", keysDown);
  window.addEventListener("keyup", keysUp);

  //game updates every tick
  app.ticker.add(gameLoop);
  //detects when key is pressed
  function keysDown(e: any) {
    keys[e.keyCode] = true;
  }

  function keysUp(e: any) {
    keys[e.keyCode] = false;
  }

  let gravity = 0.9;
  let isJumping = false; //prevents double jump
  function jump() {
    if (isJumping) return;
    let timerUpID = setInterval(function () {
      //the setInterval method allows me to create a function that runs every certain interval of time
      if (player.y < 450) {
        clearInterval(timerUpID); // stops permanent jumping
        let timerDownID = setInterval(function () {
          if (player.y > 570) {
            clearInterval(timerDownID); //stops permanent fall
            isJumping = false;
          }
          player.y += 4;
        }, 20);
      }
      isJumping = true;
      player.y -= 5;
      player.y = player.y * gravity;
    }, 20);
  }

  function gameLoop() {
    //Left arrow
    if (keys["37"]) {
      player.x -= 5;
    }
    //Right arrow
    if (keys["39"]) {
      player.x += 5;
    }
  }

  return element;
}
document.body.appendChild(component());

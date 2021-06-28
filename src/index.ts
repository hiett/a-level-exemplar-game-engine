import {
  Application,
  Loader,
  LoaderResource,
  PlaneGeometry,
  Rectangle,
  Sprite,
  Texture,
} from "pixi.js";
import * as PIXI from "pixi.js";
import * as Matter from "matter-js";
import "./style.css";
import { addGameObject, updateAllPixiData } from "./gameObjectManager";
import { loadGameAssets } from "./loader/gameAsset";
import { TestGameObject } from "./gameObjects/testGameObject";

let keys: any = {};
let Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Body = Matter.Body;
let engine = Engine.create();

export let PixiAppInstance: Application;

async function startGame() {
  const element = document.createElement("div");

  //Creating the application/stage in PIXI
  let app;
  PixiAppInstance = app = new Application({ width: 800, height: 600 });

  // Our loader. The code will not continue until all assets are loaded.
  await loadGameAssets();

  app.renderer.view.style.position = "absolute";
  app.renderer.view.style.display = "block";
  document.body.appendChild(app.view);

  window.addEventListener("keydown", keysDown);
  window.addEventListener("keyup", keysUp);

  function keysDown(e: any) {
    keys[e.keyCode] = true;
  }

  function keysUp(e: any) {
    keys[e.keyCode] = false;
  }

  const testObject = new TestGameObject();
  addGameObject(testObject);

  testObject.pixiData.position.x = 20;
  testObject.pixiData.position.y = 50;

  function gameLoop() {
    // Down arrow
    if (keys["40"]) {
      testObject.pixiData.position.x += 1;
    }

    updateAllPixiData();
  }
  app.ticker.add(gameLoop);

  //Key handlers

  // End - return the created div element
  return element;
}

startGame().then((elem) => {
  document.body.appendChild(elem);
});

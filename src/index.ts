import * as _ from 'lodash';
import { Application, Loader, LoaderResource, PlaneGeometry, Rectangle, Sprite, } from 'pixi.js';
import * as PIXI from "pixi.js";
import 'pixi-keyboard';


function component() {

  let app: Application;
  let player: Sprite;

  const element = document.createElement('div');

  element.innerHTML = _.join('Hello this is a test')


  app = new Application({
    width: 512,
    height: 512,
    backgroundColor: 0xAAAAAA,
  });

  app.renderer.view.style.position = 'absolute';
  app.renderer.view.style.display = "block";
  document.body.appendChild(app.view);

  //Introduces cube sprite

  player = PIXI.Sprite.from("./images/square.png");
  player.anchor.set(0.5);
  player.x = app.view.width / 2;
  player.y = app.view.height / 2;

  app.stage.addChild(player);

  




    return element;
}
document.body.appendChild(component());

import * as _ from 'lodash';
import { Application, Loader, LoaderResource, Rectangle, Sprite } from 'pixi.js';
import * as PIXI from "pixi.js";


import './style.css';

function component() {
  const element = document.createElement('div');

  element.innerHTML = _.join('Hello this is a test')


  let app = new Application({ width: 512, height: 512 });
  app.renderer.backgroundColor = 0x061639;

  app.renderer.view.style.position = 'absolute';
  app.renderer.view.style.display = "block";

  document.body.appendChild(app.view);


  let rect: Sprite;

  var graphics = new PIXI.Graphics();

  graphics.beginFill(0xFF0000);

  // set the line style to have a width of 5 and set the color to red
  graphics.lineStyle(5, 0xFF0000);

  // draw a rectangle
  graphics.drawRect(0, 0, 100, 100);

  app.stage.addChild(graphics);
  return element;


}
document.body.appendChild(component());



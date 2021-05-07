import * as _ from 'lodash';
import { Application, Loader, LoaderResource, PlaneGeometry, Rectangle, Sprite } from 'pixi.js';
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

  //Introduces cube sprite

  let player: Sprite = PIXI.Sprite.from("./images/square.png")
  player.anchor.set(0.5);
  player.x = app.view.width /2;
  player.y = app.view.height /2;

  app.stage.addChild(player);

  //key event handleres
  function keyboard(value: any) {
    let key: any = {};
    key.value = value;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    //The `downHandler`
    key.downHandler = (event: { key: any; preventDefault: () => void; }) => {
      if (event.key === key.value) {
        if (key.isUp && key.press) key.press();
        key.isDown = true;
        key.isUp = false;
        event.preventDefault();
      }
    };
  
    //The `upHandler`
    key.upHandler = (event: { key: any; preventDefault: () => void; }) => {
      if (event.key === key.value) {
        if (key.isDown && key.release) key.release();
        key.isDown = false;
        key.isUp = true;
        event.preventDefault();
      }
    };
  
    //Attach event listeners
    const downListener = key.downHandler.bind(key);
    const upListener = key.upHandler.bind(key);
    
    window.addEventListener(
      "keydown", downListener, false
    );
    window.addEventListener(
      "keyup", upListener, false
    );
    
    // Detach event listeners
    key.unsubscribe = () => {
      window.removeEventListener("keydown", downListener);
      window.removeEventListener("keyup", upListener);
    };
    
    return key;
  }


  return element;


}
document.body.appendChild(component());



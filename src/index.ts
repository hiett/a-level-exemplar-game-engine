import { Application, Loader, LoaderResource, PlaneGeometry, Rectangle, Sprite } from 'pixi.js';
  import * as PIXI from "pixi.js";
  
  let keys: any = {};
  let player: Sprite;
  let bgBack: any
  let bgBuildingsFar:any
  let bgBuildings: any
  let bgForeground: any
  let bgX = 0;
  let bgSpeed= 1;
  
  import './style.css';
  import { update } from 'lodash';
  
  
  function component() {
    const element = document.createElement('div');
  
    //Creating the application/stage in PIXI
    let app = new Application({ width: 800, height: 600}); 
  
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
    
    app.ticker.add(gameloop)
    return element
  }
  
  //Key handlers
  
  
  document.body.appendChild(component());
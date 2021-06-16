import { Application, Loader, LoaderResource, PlaneGeometry, Rectangle, Sprite } from 'pixi.js';
  import * as PIXI from "pixi.js";
  import * as Matter from "matter-js"; 
  import './style.css';
  import { update } from 'lodash';
import { GameObject } from './gameObject';

  let keys: any = {};
  let player: Sprite;
  let engine = Matter.Engine;
  let body = Matter.Body;
  
  
  
  function component() {
    const element = document.createElement('div');
  
    //Creating the application/stage in PIXI
    let app = new Application({ width: 800, height: 600}); 
  
    app.renderer.view.style.position = 'absolute';
    app.renderer.view.style.display = "block";
  
    document.body.appendChild(app.view);
  
    //Introduces simple cube sprite from file. 

    let player = new GameObject(PIXI.Sprite.from("assets/square.png"),  Matter.Bodies.rectangle(0,0,128, 128))  
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
        Matter.Body.setVelocity(player, {x: 0, y: 10})
      }
      
    
    app.ticker.add(gameloop)

    return element
  }
  
  //Key handlers
  
  
  document.body.appendChild(component());
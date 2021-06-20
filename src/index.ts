import { Application, Loader, LoaderResource, PlaneGeometry, Rectangle, Sprite, Texture } from 'pixi.js';
  import * as PIXI from "pixi.js";
  import * as Matter from "matter-js"; 
  import './style.css';
  import { update } from 'lodash';
import { GameObject } from './gameObject';

  let keys: any = {};
  var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body= Matter.Body;
  let engine = Engine.create()
 
  const loader = PIXI.Loader
  
  
  
  function component() {
    const element = document.createElement('div');
  
    //Creating the application/stage in PIXI
    let app = new Application({ width: 800, height: 600}); 
  
    app.renderer.view.style.position = 'absolute';
    app.renderer.view.style.display = "block";
  
    document.body.appendChild(app.view);
  
    //Introduces simple cube sprite from file. 

    let texture = new loader.resources[]


    
    //adds sprite to the application
  
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
      //Right arrow
      if (keys["40"]) {
      }
      
    
    app.ticker.add(gameloop)

    return element
  }
  
  //Key handlers
  
  
  document.body.appendChild(component());
import * as PIXI from "pixi.js";
import * as Matter from "matter-js";

class PhysicsSprite {
  engine: any;
  category: any;
  isAlive: any;
  x: any;
  y: any;
  width: any;
  height: any;
  texture: any;

  type: any;

  constructor(id: any, engine: any, category: any) {
    this.id = id;
    this.engine = engine;
    this.category = category;
    this.isAlive = true;
  }
  init(x: any, y: any, width: any, height: any, texture: any, type: any) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.texture = texture;
    this.type = type;
    this.createPhysics();
    this.createSprite();
  }
  createPhysics() {
    let options = {
      frictionAir: 0.2,
      friction: 1,
      inertia: Infinity,
      isSensor: true,
      label: this.id,
      mass: 1,
      restitution: 0,
      collisionFilter: {
        mask: this.category,
      },
    };
    if (this.type === "circle") {
      this.body = Matter.Bodies.circle(this.x, this.y, this.width, options);
    } else {
      this.body = Matter.Bodies.rectangle(
        this.x,
        this.y,
        this.width,
        this.height,
        options
      );
    }
  }
  createSprite() {
    this.sprite = new PIXI.Sprite(this.texture);
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;
  }
  get body(): any {
    return this.body;
  }
  set body(newBody) {
    this.body = newBody;
  }
  get sprite(): any {
    return this.sprite;
  }
  set sprite(newSprite) {
    this.sprite = newSprite;
  }
  get id(): any {
    return this.id;
  }
  set id(id) {
    this.id = id;
  }
  update() {
    if (this.body) {
      this.sprite.position = this.body.position;
      this.sprite.rotation = this.body.angle;
    }
  }
  destroy() {
    this.isAlive = false;
    Matter.World.remove(this.engine.world, this.body);
  }
}
export default PhysicsSprite;

import { GameObject } from "../gameObject";
import { GameAssetIdentifier, getTexture } from "../../loader/gameAsset";
import { Sprite } from "pixi.js";
import { Bodies } from "matter-js";

export class TestGameObject extends GameObject {
  constructor() {
    const sprite = new Sprite(getTexture(GameAssetIdentifier.BACKGROUND_1));
    super(sprite, Bodies.rectangle(25, 25, 100, 100));
  }

  spawn() {
    console.log("I'm alive!");
  }
}

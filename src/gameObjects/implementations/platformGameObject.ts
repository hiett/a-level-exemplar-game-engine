import { GameObject } from "../gameObject";
import { GameAssetIdentifier, getTexture } from "../../loader/gameAsset";
import { Sprite } from "pixi.js";
import { Bodies } from "matter-js";

export class PlatformGameObject extends GameObject {
  constructor(x: number, y: number) {
    const sprite = new Sprite(getTexture(GameAssetIdentifier.BUILDINGS_1));
    super(sprite, Bodies.rectangle(x, y, 100, 20, { isStatic: true }));
  }

  spawn() {}
}

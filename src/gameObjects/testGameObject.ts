import { GameObject } from "../gameObject";
import { GameAssetIdentifier, getTexture } from "../loader/gameAsset";
import { Sprite } from "pixi.js";

export class TestGameObject extends GameObject {
  constructor() {
    const sprite = new Sprite(getTexture(GameAssetIdentifier.BACKGROUND_1));
    super(sprite, null);
  }

  spawn() {
    console.log("I'm alive!");
  }
}

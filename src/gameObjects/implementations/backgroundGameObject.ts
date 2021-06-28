import { GameObject } from "../gameObject";
import { GameAssetIdentifier, getTexture } from "../../loader/gameAsset";
import { Sprite } from "pixi.js";
import { GameManagerInstance } from "../../index";

export class BackgroundGameObject extends GameObject {
  private calculatedRenderWidth: number;
  private backgroundIndex: number;

  constructor(backgroundIndex: number) {
    const sprite = new Sprite(getTexture(GameAssetIdentifier.BACKGROUND_1));
    super(sprite, null);

    this.backgroundIndex = backgroundIndex;
    this.calculatedRenderWidth = 0;
  }

  spawn() {
    const texture = getTexture(GameAssetIdentifier.BACKGROUND_1);

    const scale = GameManagerInstance.pixiInstance.view.height / texture.height;
    this.calculatedRenderWidth = scale * texture.width;

    this.pixiData.scale.x = scale;
    this.pixiData.scale.y = scale;

    this.pixiData.position.x =
      this.backgroundIndex * this.calculatedRenderWidth;
    this.pixiData.position.y = 0;
  }

  gameLoop(delta: number) {}
}

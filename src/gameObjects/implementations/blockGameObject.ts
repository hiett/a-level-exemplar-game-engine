import { GameObject } from "../gameObject";
import { PopulatedTile } from "../../map/gameMap";
import { Sprite } from "pixi.js";
import { Bodies } from "matter-js";
import { getTexture } from "../../loader/gameAsset";

export class BlockGameObject extends GameObject {
  tile: PopulatedTile;

  constructor(tile: PopulatedTile) {
    const { displayData } = tile;

    const sprite = new Sprite(getTexture(tile.data.textureUrl as any));
    const bounds = Bodies.rectangle(
      displayData.x,
      displayData.y,
      displayData.width,
      displayData.height,
      {
        isStatic: true,
      }
    );

    super(sprite, bounds);
    this.tile = tile;
  }

  gameLoop(delta: number): void {}

  spawn(): void {
    // Scale the sprite to fit
    const texture = this.pixiData.texture;

    this.pixiData.scale.x = this.tile.displayData.width / texture.width;
    this.pixiData.scale.y = this.tile.displayData.height / texture.height;

    this.updatePixiPosition(); // Cause an initial update on spawn to get it into the right place.
  }
}

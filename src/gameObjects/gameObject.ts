import { Sprite } from "pixi.js";
import { Body, Composite } from "matter-js";
import * as uuid from "uuid";
import { GameManagerInstance } from "../index";

export abstract class GameObject {
  pixiData: Sprite;
  matterData: Body;

  uuid: string; // To differenciate every single GameObject instance

  constructor(pixiData: Sprite, matterData: any) {
    this.pixiData = pixiData;
    this.matterData = matterData;

    this.uuid = uuid.v4(); // V4 is random generated.
  }

  public addToGameLibraries() {
    if (this.pixiData) {
      GameManagerInstance.pixiInstance.stage.addChild(this.pixiData);
    }
    if (this.matterData) {
      Composite.add(GameManagerInstance.matterEngine.world, this.matterData);
    }
  }

  abstract spawn(): void;

  abstract gameLoop(delta: number): void;

  /**
   * Update the PixiJS render position from the Matter physics position.
   * In our game, Matter is representing the position and physics. However, this is not automatically
   * translated into our Pixi setup - which is rendering our game.
   *
   * This is called every single frame, for all game objects.
   */
  public updatePixiPosition() {
    if (!this.pixiData || !this.matterData) {
      return; // We don't want to update either if they're missing. This would error out anyway.
    }

    this.pixiData.position.x = this.matterData.position.x;
    this.pixiData.position.y = this.matterData.position.y;
    this.pixiData.rotation = this.matterData.angle;
  }
}

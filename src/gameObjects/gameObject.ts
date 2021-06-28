import { Sprite } from "pixi.js";
import * as Matter from "matter-js";
import * as uuid from "uuid";
import { GameManagerInstance } from "../index";

export abstract class GameObject {
  pixiData: Sprite;
  matterData: any;

  uuid: string; // To differenciate every single GameObject instance

  constructor(pixiData: Sprite, matterData: any) {
    this.pixiData = pixiData;
    this.matterData = matterData;

    this.uuid = uuid.v4(); // V4 is random generated.
  }

  public addToGameLibraries() {
    GameManagerInstance.pixiInstance.stage.addChild(this.pixiData);
  }

  abstract spawn(): void;

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

    this.pixiData.position = this.matterData.position;
    this.pixiData.rotation = this.matterData.rotation;
  }
}

import { Application } from "pixi.js";
import { loadGameAssets } from "./loader/gameAsset";
import { GameObjectManager } from "./gameObjects/gameObjectManager";
import { TestGameObject } from "./gameObjects/implementations/testGameObject";

export class GameManager {
  // Pixi
  pixiInstance: Application;

  // Internal Managers
  gameObjectManager: GameObjectManager;

  constructor() {
    this.pixiInstance = new Application({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    this.gameObjectManager = new GameObjectManager();

    // JavaScript has this weird quirk with what `this` is defined as, if the function is called from outside scope.
    // By binding this function, we're saying that `this` really is this current class instance rather than what
    // it's inheriting from it's calling position (in our case, pixi)
    this.gameLoop = this.gameLoop.bind(this);
  }

  async startGame() {
    // Load in everything we need before we continue
    await this.loadGame();

    // Prepare our Pixi renderer element styling
    this.applyPixiStyling();

    // We want to now register the pixi instance (and related events) to our dom
    this.registerToDom();

    // Register our game loop into pixi that will be called once a frame.
    this.pixiInstance.ticker.add(this.gameLoop);

    // Some tests:
    const testObject = new TestGameObject();
    this.gameObjectManager.addGameObject(testObject);

    testObject.pixiData.x = 25;
    testObject.pixiData.y = 30;
  }

  gameLoop() {
    // Copy the Matter data to Pixi for all game objects registered.
    this.gameObjectManager.updateAllPixiData();
  }

  /**
   * This is split into its own method so we can later add more loading steps if needed,
   * or infact, show a loading display on the screen.
   * @private
   */
  private async loadGame() {
    await loadGameAssets(); // Load in our textures for Pixi
  }

  private applyPixiStyling() {
    const { style } = this.pixiInstance.renderer.view;

    style.position = "absolute";
    style.display = "block";
    style.top = "0";
    style.left = "0";
    style.bottom = "0";
    style.right = "0";
  }

  private registerToDom() {
    document.body.appendChild(this.pixiInstance.view);
  }
}

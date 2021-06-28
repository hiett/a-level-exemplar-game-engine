import { Application } from "pixi.js";
import { loadGameAssets } from "./loader/gameAsset";
import { GameObjectManager } from "./gameObjects/gameObjectManager";
import { TestGameObject } from "./gameObjects/implementations/testGameObject";
import { Engine } from "matter-js";
import { PlatformGameObject } from "./gameObjects/implementations/platformGameObject";

export class GameManager {
  // Pixi
  pixiInstance: Application;

  // Matter
  matterEngine: Engine;

  // Internal Managers
  gameObjectManager: GameObjectManager;

  // Rendering stats
  lastFrameTimeMs: number;

  constructor() {
    this.pixiInstance = new Application({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    this.matterEngine = Engine.create();
    this.gameObjectManager = new GameObjectManager();
    this.lastFrameTimeMs = 0;

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

    const testPlatform = new PlatformGameObject(25, 600);
    this.gameObjectManager.addGameObject(testPlatform);
  }

  gameLoop() {
    // Calculating our frameDeltaMs allows us to calculate the frame rate, but also calculate physics at the correct speed.
    // Imagine if one monitor or phone ran at 144Hz while the other ran at only 60Hz... if our game loop is linked to the speed
    // of the monitor, then we want to have consistent physics speeds! In the former case we'd be calling the physics calculations
    // 144 times per frame rather than 60... so we want to introduce a constant to multiply all of our calculations by.
    // This way, no matter the rate that this method is being called at, the output numbers will be the same over time.
    // Note: Performance.now is better at providing time faster than Date.now
    const time = performance.now();
    const frameDeltaMs = time - this.lastFrameTimeMs;
    this.lastFrameTimeMs = time;

    // Update Matter. In Matter, we can either use a runner, or call Engine#update. Since we already have a
    // game loop that Pixi is using, we might as well just use the same one to avoid having different timers
    // running at different times, and a whole new layer of pointless complexity!
    Engine.update(this.matterEngine, frameDeltaMs);

    // Copy the Matter data to Pixi for all game objects registered.
    this.gameObjectManager.updateAllPixiData();
  }

  /**
   * This is split into its own method so we can later add more loading steps if needed,
   * or in fact, show a loading display on the screen.
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

import { GameObject } from "./gameObject";

export class GameObjectManager {
  gameObjects: GameObject[] = [];

  updateAllPixiData() {
    this.gameObjects.forEach((gameObject) => gameObject.updatePixiPosition());
  }

  /**
   * This delta is the calculation of how much needs to be elapsed since the last frame.
   * @param delta a constant of how much has changed since the last frame to multiply calculations by
   */
  loopGameObjects(delta: number) {
    this.gameObjects.forEach((gameObject) => gameObject.gameLoop(delta));
  }

  addGameObject(gameObject: GameObject, addToLibraries = true) {
    this.gameObjects.push(gameObject);

    if (addToLibraries) {
      gameObject.addToGameLibraries();
    }

    gameObject.spawn();
  }

  removeGameObject(gameObject: GameObject) {
    const gameObjectIndex = this.gameObjects.indexOf(gameObject);

    if (gameObjectIndex === -1) {
      return; // We don't want to remove the item from the array if it isn't in there.
    }

    this.gameObjects.splice(gameObjectIndex, 1);
  }
}

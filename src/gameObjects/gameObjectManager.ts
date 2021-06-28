import { GameObject } from "./gameObject";

export class GameObjectManager {
  gameObjects: GameObject[] = [];

  updateAllPixiData() {
    this.gameObjects.forEach((gameObject) => gameObject.updatePixiPosition());
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

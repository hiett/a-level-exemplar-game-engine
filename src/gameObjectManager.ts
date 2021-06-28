import { GameObject } from "./gameObject";
import { PixiAppInstance } from "./index";

export const GameObjects: GameObject[] = [];

export function updateAllPixiData() {
  GameObjects.forEach((gameObject) => gameObject.updatePixiPosition());
}

export function addGameObject(gameObject: GameObject, addToLibraries = true) {
  GameObjects.push(gameObject);

  if (addToLibraries) {
    gameObject.addToGameLibraries();
  }

  gameObject.spawn();
}

export function removeGameObject(gameObject: GameObject) {
  const gameObjectIndex = GameObjects.indexOf(gameObject);

  if (gameObjectIndex === -1) {
    return; // We don't want to remove the item from the array if it isn't in there.
  }

  GameObjects.splice(gameObjectIndex, 1);
}

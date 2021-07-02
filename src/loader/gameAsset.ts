import { Texture, Loader } from "pixi.js";
import { GameManagerInstance } from "../index";

let gameAssetStorage: GameAsset[] = [];

/**
 * This is where we centrally register all of our game assets. They will be loaded in before
 * the GameManager#startGame is called.
 */
export enum GameAssetIdentifier {
  BACKGROUND_1 = "assets/background-shite/bg.png",
  BUILDINGS_1 = "assets/background-shite/buildings.png",

  SQUARE = "assets/square.png",
}

export class GameAsset {
  assetIdentifier: GameAssetIdentifier;
  loaded: boolean;
  path: string;
  texture: Texture;

  private loadingCallbacks: (() => void)[] = [];

  constructor(assetIdentifier: GameAssetIdentifier) {
    this.assetIdentifier = assetIdentifier;
    this.loaded = false;
    this.path = (GameAssetIdentifier as any)[assetIdentifier as any];

    GameManagerInstance.pixiInstance.loader
      .add(assetIdentifier, this.path)
      .load((loader: Loader, resources: any) => {
        // TODO: Find resources type
        this.texture = resources[assetIdentifier].texture;

        this.loadingCallbacks.forEach((callback) => callback());
        this.loadingCallbacks = []; // Clear the array
      });
  }

  async addLoadingPromise(): Promise<void> {
    if (this.loaded) {
      return;
    }

    return new Promise((res) => this.loadingCallbacks.push(res));
  }
}

// TODO: Refactor to be a class based loader
export async function loadGameAssets() {
  const assetList: GameAsset[] = [];

  for (let item in GameAssetIdentifier) {
    if (isNaN(Number(item))) {
      const asset = new GameAsset(item as GameAssetIdentifier);
      assetList.push(asset);

      await asset.addLoadingPromise();
    }
  }

  gameAssetStorage = assetList;
}

export function getGameAsset(identifier: GameAssetIdentifier): GameAsset {
  return gameAssetStorage.find((item) => {
    return item.assetIdentifier === identifier || item.path === identifier;
  })!;
}

export function getTexture(identifier: GameAssetIdentifier): Texture {
  return getGameAsset(identifier).texture;
}

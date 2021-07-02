import { GameManagerInstance } from "../index";
import { BlockGameObject } from "../gameObjects/implementations/blockGameObject";

const DEFAULT_TILE_WIDTH = 1;
const DEFAULT_TILE_HEIGHT = 1;

const DISPLAY_TILE_WIDTH = 100;
const DISPLAY_TILE_HEIGHT = 100;

interface SingletonTileData {
  id: string;
  textureUrl: string;
  width: number;
  height: number;
}

interface Tile {
  dataId: string;
  x: number;
  y: number;
}

export type PopulatedTile = Tile & {
  data: SingletonTileData;
  displayData: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
};

export class GameMap {
  private tileData: SingletonTileData[];
  private tiles: Tile[];

  constructor(tileData: SingletonTileData[], tiles: Tile[]) {
    this.tileData = tileData;
    this.tiles = tiles;
  }

  getPopulatedTileAt(x: number, y: number): PopulatedTile | undefined {
    const rawTile = this.getRawTileAt(x, y);
    if (!rawTile) {
      throw new Error(
        "Unable to find tile at that position, most likely out of bounds."
      );
    }
    return this.populateTile(rawTile);
  }

  createGameObjects() {
    this.tiles.forEach((tile) => {
      const gameObject = new BlockGameObject(this.populateTile(tile));
      GameManagerInstance.gameObjectManager.addGameObject(gameObject);
    });
  }

  private populateTile(tile: Tile): PopulatedTile {
    const data = this.tileData.find((td) => td.id === tile.dataId)!;

    return {
      ...tile,
      data,
      displayData: {
        x: tile.x * DISPLAY_TILE_WIDTH,
        y: tile.y * DISPLAY_TILE_HEIGHT,
        width: data.width * DISPLAY_TILE_WIDTH,
        height: data.height * DISPLAY_TILE_HEIGHT,
      },
    };
  }

  private getRawTileAt(x: number, y: number): Tile | undefined {
    return this.tiles.find((t) => t.x === x && t.y === y);
  }

  // static methods //

  static createFrom(gameMapData: GameMapData) {
    const tileData: SingletonTileData[] = [];
    const tiles: Tile[] = [];

    for (const tileDataEntry of gameMapData.tileData) {
      tileData.push({
        width: DEFAULT_TILE_WIDTH,
        height: DEFAULT_TILE_HEIGHT,
        ...tileDataEntry,
      });
    }

    for (let y = 0; y < gameMapData.tiles.length / gameMapData.mapWidth; y++) {
      for (let x = 0; x < gameMapData.mapWidth; x++) {
        const tile = gameMapData.tiles[y * gameMapData.mapWidth + x];
        if (!tile) {
          continue; // This will be air
        }

        // Validate that the tile data exists
        if (!tileData.find((tileData) => tileData.id === tile)) {
          throw new Error(
            `Tile data does not exist for this tile! Unable to create GameMap instance! Failing tile: ${tile}`
          );
        }

        tiles.push({
          dataId: tile,
          x,
          y,
        });
      }
    }

    return new GameMap(tileData, tiles);
  }
}

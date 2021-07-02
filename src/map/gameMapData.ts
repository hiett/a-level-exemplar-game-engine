interface GameMapData {
  tileData: {
    id: string;
    textureUrl: string;
    width?: number;
    height?: number;
  }[];
  tiles: (string | null)[];
  mapWidth: number;
}

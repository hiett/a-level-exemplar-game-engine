import { GameManager } from "./gameManager";

// Our singleton GameManager instance.
export const GameManagerInstance = new GameManager();
GameManagerInstance.startGame().then(() => console.log("Started game."));

import { Category } from "./category";
import { GameProfile } from "./game-profile";

export class GamePlayed {

  constructor(
    public categoryId: number, 
    public gameId: number, 
    public date: Date = new Date(), 
    public points: number,
    public secondsLeftInGame: number, 
    public secondsPlayed: number 
   ){}
}

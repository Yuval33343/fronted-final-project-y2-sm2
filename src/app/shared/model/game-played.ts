import { Category } from "./category";
import { GameProfile } from "./game-profile";

export class GamePlayed {

  constructor(
    public category: Category, 
    public game: GameProfile, 
    public date: Date = new Date(), 
    public points: number ){}
}

import { Injectable } from '@angular/core';
import { GameProfile } from '../shared/model/game-profile';
import { GameDifficulty } from '../shared/model/game-difficulty';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private allGames : GameProfile[] = [
    new GameProfile(1, "Matching Game", "Match the word with its translation.", GameDifficulty.EASY, "matching-game"),
    new GameProfile(2, "Mixed Letters", "Arrange the letters of the word in the right order.", GameDifficulty.HARD, "mixed-letters"),
    new GameProfile(3, "Sorting Game", "Sort the word to it's right category.", GameDifficulty.MEDIUM, "sorting-game"),
  ];

  constructor() { }
  list() : GameProfile[] {
    return this.allGames;
  }
}
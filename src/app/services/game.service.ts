import { Injectable } from '@angular/core';
import { GameProfile } from '../shared/model/game-profile';
import { GameDifficulty } from '../shared/model/game-difficulty';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private allGames : GameProfile[] = [
    new GameProfile(1, "Matching Game", "Match the word with its translation.", GameDifficulty.EASY, "https://example.com/game1"),
    new GameProfile(2, "Trivia", "Choose every word's translation from a list of 4 options.", GameDifficulty.HARD, "https://example.com/game2"),

  ];

  constructor() { }
  list() : GameProfile[] {
    return this.allGames;
  }
}
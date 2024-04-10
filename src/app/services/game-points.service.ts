import { Injectable } from '@angular/core';
import { GamePlayed } from '../shared/model/game-played';

@Injectable({
  providedIn: 'root'
})
export class GamePointsService {
  private readonly storageKey = 'gamePlayed';

  constructor() {}

  private get gamesPlayedFromLocalStorage(): GamePlayed[] {
    const storedGamesPlayed = localStorage.getItem(this.storageKey);
    return storedGamesPlayed ? JSON.parse(storedGamesPlayed) : [];
  }

  private set gamesPlayedToLocalStorage(gamesPlayed: GamePlayed[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(gamesPlayed));
  }

  list(): GamePlayed[] {
    return this.gamesPlayedFromLocalStorage;
  }

  addGamePlayed(gamePlayed: GamePlayed): void {
    const gamesPlayed = this.gamesPlayedFromLocalStorage;
    gamesPlayed.push(gamePlayed);
    this.gamesPlayedToLocalStorage = gamesPlayed;
  }
}

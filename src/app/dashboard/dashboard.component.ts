import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { GamePointsService } from '../services/game-points.service';
import { GamePlayed } from '../shared/model/game-played';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  MaintotalPoints: number = 0;
  gamesPlayed: GamePlayed[] = [];
  averagePointsPerGame: number = 0;
  totalGamesWon: number = 0;
  averageGameDuration: number = 0;
  totalTimePlayed: number = 0;
  gamesEndedOnTime: number = 0;
  percentageGamesEndedOnTime: number = 0;

  constructor(private gamePointsService: GamePointsService) {}

  ngOnInit(): void {
    this.gamesPlayed = this.gamePointsService.list();
    console.log('Games Played:', this.gamesPlayed);

    this.calculateTotalPoints();
    this.calculateAveragePointsPerGame();
    this.calculateTotalGamesWon();
    this.calculateAverageGameDuration();
    this.calculateTotalTimePlayed();
    this.calculatePercentageGamesEndedOnTime();
  }

  calculateTotalPoints(): void {
    this.MaintotalPoints = this.gamesPlayed.reduce((sum, game) => sum + game.points, 0);
  }

  calculateAveragePointsPerGame(): void {
    const average = this.gamesPlayed.length > 0 ? this.MaintotalPoints / this.gamesPlayed.length : 0;
    this.averagePointsPerGame = parseFloat(average.toFixed(2));
  }

  calculateTotalGamesWon(): void {
    this.totalGamesWon = this.gamesPlayed.filter(game => game.points > 90).length;
  }

  calculateAverageGameDuration(): void {
    if (this.gamesPlayed.length > 0) {
      const totalDuration = this.gamesPlayed.reduce((sum, game) => sum + game.secondsPlayed, 0);
      this.averageGameDuration = parseFloat((totalDuration / this.gamesPlayed.length).toFixed(2));
    } else {
      this.averageGameDuration = 0;
    }
  }

  calculateTotalTimePlayed(): void {
    this.totalTimePlayed = this.gamesPlayed.reduce((sum, game) => sum + (game.secondsPlayed + game.secondsLeftInGame), 0);
  }
  

  calculatePercentageGamesEndedOnTime(): void {
    if (this.gamesPlayed.length > 0) {
      this.gamesEndedOnTime = this.gamesPlayed.filter(game => game.secondsLeftInGame > 0).length;
      this.percentageGamesEndedOnTime = parseFloat(((this.gamesEndedOnTime / this.gamesPlayed.length) * 100).toFixed(2));
    } else {
      this.percentageGamesEndedOnTime = 0;
    }
  }
}
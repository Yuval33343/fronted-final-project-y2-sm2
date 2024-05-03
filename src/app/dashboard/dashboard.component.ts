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

  constructor(private gamePointsService: GamePointsService) {}

  ngOnInit(): void {
    this.gamesPlayed = this.gamePointsService.list();
    this.calculateTotalPoints();
    this.calculateAveragePointsPerGame();
    this.calculateTotalGamesWon();
  }

  calculateTotalPoints(): void {
    const arrPoints = this.gamePointsService.list();
    for (const game of arrPoints) {
      this.MaintotalPoints += game.points;
    }
  }

  calculateAveragePointsPerGame(): void {
    const average = this.gamesPlayed.length > 0 ? this.MaintotalPoints / this.gamesPlayed.length : 0;
    this.averagePointsPerGame = parseFloat(average.toFixed(2));
  }

  calculateTotalGamesWon(): void {
    this.totalGamesWon = this.gamesPlayed.filter(game => game.points > 90).length;
  }
}
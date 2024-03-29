import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { GamePointsService } from '../services/game-points.service';
import { GamePlayed } from '../shared/model/game-played';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  MaintotalPoints: number = 0;
  gamesPlayed: GamePlayed[] = [];


  constructor(private gamePointsService: GamePointsService) {}

  ngOnInit(): void {
    this.gamesPlayed = this.gamePointsService.list();

    this.calculateTotalPoints();
  }

  calculateTotalPoints(): void {
    const arrPoints = this.gamePointsService.list();
    for (const game of arrPoints) {
      this.MaintotalPoints += game.points;
    }
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../shared/model/category';
import { Router, RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { GameProfile } from '../shared/model/game-profile';
import { GameSelectionDialogComponent } from '../game-selection-dialog/game-selection-dialog.component';
import { GameService } from '../services/game.service';
import { PointsDisplayComponent } from "../points-display/points-display.component";
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-category-selection',
    templateUrl: './category-selection.component.html',
    styleUrls: ['./category-selection.component.css'],
    standalone: true,
    imports: [ MatIconModule, MatInputModule, MatButtonModule, RouterLink, MatSelectModule, CommonModule, MatCardModule, PointsDisplayComponent]
})
export class CategorySelectionComponent implements OnInit {
  @Input() category?: Category;
  categories: Category[] = [];
  games: GameProfile[] = [];
  totalPoints: number = 0; // Declare totalPoints property



  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private dialog: MatDialog,
    private gameService: GameService // Inject GameService
  ) { }

  ngOnInit(): void {
    this.categories = this.categoryService.list();
    this.games = this.gameService.list(); // Fetch games from GameService
  }

  startGame(categoryId: number): void {
    this.router.navigate(['/translate', categoryId]);
  }  

  openGameSelectionDialog(categoryId: number): void {
    const dialogRef = this.dialog.open(GameSelectionDialogComponent, {
      data: { categoryId, games: this.games } // Pass categoryId along with games
    });
    dialogRef.afterClosed().subscribe((selectedGame: GameProfile | undefined) => {
      if (selectedGame) {
        this.router.navigate(['/matching-game'], {
          queryParams: { categoryId, gameId: selectedGame.id } // Pass both categoryId and gameId
        });
      }
    });
  }

  isUpdatedLastWeek(lastModifiedDate: Date): boolean {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7); // Subtract 7 days
    
    return lastModifiedDate > oneWeekAgo;
    
  }
}


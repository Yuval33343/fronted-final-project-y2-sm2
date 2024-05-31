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
import { GamePointsService } from '../services/game-points.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
    selector: 'app-category-selection',
    templateUrl: './category-selection.component.html',
    styleUrls: ['./category-selection.component.css'],
    standalone: true,
    imports: [ MatIconModule, MatInputModule, MatButtonModule, RouterLink, MatSelectModule, CommonModule, MatCardModule, PointsDisplayComponent, MatProgressBarModule]
})
export class CategorySelectionComponent implements OnInit {
  @Input() category?: Category;
  categories: Category[] = [];
  games: GameProfile[] = [];
  MaintotalPoints: number = 0; // Declare totalPoints property
  isLoadingDone = false;



  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private dialog: MatDialog,
    private gameService: GameService,
    private gamePointsService: GamePointsService,
    ) { }

    ngOnInit(): void {
      this.loadCategories();
  }

  loadCategories(): void {
      this.categoryService.list().then((result: Category[]) => {
        this.categories = result
        this.isLoadingDone = true
      })
      this.games = this.gameService.list(); // Fetch games from GameService
      this.gamePointsService.list().then((
        arrPoints
      )=>{
          for (const i of arrPoints) {
            this.MaintotalPoints += i.points;
        }
      })

      

      // Sort categories by last updated date
      this.categories.sort((a, b) => {
          return new Date(b.lastModifiedDate).getTime() - new Date(a.lastModifiedDate).getTime();
      });
  }

  // startGame(categoryId: number): void {
  //   this.router.navigate(['/translate', categoryId]);
  // }  

  openGameSelectionDialog(categoryId: string): void {
    const dialogRef = this.dialog.open(GameSelectionDialogComponent, {
      data: { categoryId, games: this.games } // Pass categoryId along with games
    });
  
  }

  isUpdatedLastWeek(date: Date): boolean {
    const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000; // One week in milliseconds
    const currentDate = new Date();
    const difference = currentDate.getTime() - new Date(date).getTime();

    return difference < oneWeekInMilliseconds;
  }

  
}


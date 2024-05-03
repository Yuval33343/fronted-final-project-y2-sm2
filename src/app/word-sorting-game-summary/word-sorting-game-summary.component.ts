import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { TranslatedWord } from '../shared/model/translatword';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Category } from '../shared/model/category';


@Component({
  selector: 'app-word-sorting-game-summary',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, MatButtonModule, CommonModule],
  templateUrl: './word-sorting-game-summary.component.html',
  styleUrl: './word-sorting-game-summary.component.css'
})
export class WordSortingGameSummaryComponent implements OnInit {
    @Input() totalPoints: number = 0;
    @Input() selectedWords: TranslatedWord[] = [];
    category?: Category;
belongsToCategory: boolean | undefined;

  
    constructor(private categoryService: CategoryService) {}
  
    ngOnInit(): void {}
  
    playAgain(): void {
      window.location.reload();
    }
  
    correctAnswersCount(): number {
      let correctCount = 0;
      for (const word of this.selectedWords) {
          if (word.belongsToCategory) {
              correctCount++;
          }
      }
      return correctCount;
    }
  
    getCategoryName(categoryId: number): string {
      const category = this.categoryService.get(categoryId);
      return category ? category.categoryName : '';
    }
}

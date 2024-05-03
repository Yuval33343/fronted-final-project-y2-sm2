import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../shared/model/category';
import { TranslatedWord } from '../shared/model/translatword';
import { MatDialog } from '@angular/material/dialog';
import { CategoryService } from '../services/category.service';
import { GamePointsService } from '../services/game-points.service';
import { GameExitButtonComponent } from "../game-exit-button/game-exit-button.component";
import { PointsDisplayComponent } from "../points-display/points-display.component";
import { CommonModule, NgIf } from '@angular/common';
import { SuccessDialogComponent } from '../../matching-game-module/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from '../../matching-game-module/error-dialog/error-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { WordSortingGameSummaryComponent } from "../word-sorting-game-summary/word-sorting-game-summary.component";
import { GamePlayed } from '../shared/model/game-played';
import { MatProgressBar, MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCommonModule } from '@angular/material/core';

@Component({
    selector: 'app-word-sorting-game',
    standalone: true,
    templateUrl: './word-sorting-game.component.html',
    styleUrl: './word-sorting-game.component.css',
    imports: [GameExitButtonComponent, PointsDisplayComponent, NgIf, CommonModule, MatButtonModule, RouterLink, WordSortingGameSummaryComponent, MatProgressBarModule]
})

export class WordSortingGameComponent implements OnInit {

  @Input() selectedCategoryId?: string;
  category?: Category;
  totalPoints: number = 0;
  selectedWords: TranslatedWord[] = [];
  currentQuestionIndex: number = 0;
  message: string = '';


  constructor(
      private categoryService: CategoryService,
      private dialog: MatDialog,
      private gamePointsService: GamePointsService,
    ) {}

  ngOnInit(): void {
        if (this.selectedCategoryId) {
            this.category = this.categoryService.get(parseInt(this.selectedCategoryId));
            if (this.category && this.category.words.length < 3) {
                this.message = "To play this game, a category must contain at least 3 words.";
            } else {
                this.selectedWords = this.getSelectedWords();
            }
        } 
    }


  
    getSelectedWords(): TranslatedWord[] {
        let selectedWords: TranslatedWord[] = [];
        if (this.category) {
            selectedWords.push(...this.getRandomWordsFromCategory(this.category, 3).map(word => {
                word.categoryId = this.category!.id; 
                return word;
            }));
            // Get 3 words from another random category
            const otherCategory = this.getRandomOtherCategory();
            selectedWords.push(...this.getRandomWordsFromCategory(otherCategory, 3).map(word => {
                word.categoryId = otherCategory.id; // Assign categoryId here
                return word;
            }));
            // Shuffle the words
            selectedWords = this.shuffleArray(selectedWords);
        }
        return selectedWords;
    }
    

  getRandomWordsFromCategory(category: Category, count: number): TranslatedWord[] {
      const words = category.words;
      const shuffledWords = this.shuffleArray(words);
      return shuffledWords.slice(0, count);
    }

  getRandomOtherCategory(): Category {
      const categories = this.categoryService.list().filter(cat => cat.id !== this.category!.id);
      const randomIndex = Math.floor(Math.random() * categories.length);
      return categories[randomIndex];
    }

  shuffleArray(array: any[]): any[] {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

  checkAnswer(belongsToCategory: boolean): void {
        const word = this.selectedWords[this.currentQuestionIndex];
        const isCorrectAnswer = belongsToCategory === (word.categoryId === this.category?.id);
        word.userChoise = belongsToCategory; // Record the user's choice


        if (isCorrectAnswer) {
            word.belongsToCategory = true; // Set the belongsToCategory property
            this.totalPoints += 20;

            // Show success dialog
            this.dialog.open(SuccessDialogComponent, {
                width: '250px',
                data: { message: 'Success! correct sorting.' }
            });
        } else {
            word.belongsToCategory = false; // Set the belongsToCategory property
            // Show error dialog
            this.dialog.open(ErrorDialogComponent, {
                width: '250px',
                data: { message: 'Oops! wrong sort.' }
            });
        }
        this.currentQuestionIndex++;

        if (this.isGameFinished()) {
            this.gamePointsService.addGamePlayed(new GamePlayed(this.category!.id, 3, new Date(), this.totalPoints));
        }
    }


  isGameFinished(): boolean {
        return this.currentQuestionIndex == this.selectedWords.length;
    }


    shouldShowWords(): boolean{
        return this.currentQuestionIndex < this.selectedWords.length
    }

    
    calculateProgress(): number {
        return ((this.currentQuestionIndex) / this.selectedWords.length) * 100;
    }
    
    

}
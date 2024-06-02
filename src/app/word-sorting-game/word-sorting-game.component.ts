import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
import { TimerComponent } from "../timer/timer.component";

@Component({
    selector: 'app-word-sorting-game',
    standalone: true,
    templateUrl: './word-sorting-game.component.html',
    styleUrl: './word-sorting-game.component.css',
    imports: [GameExitButtonComponent, PointsDisplayComponent, NgIf, CommonModule, MatButtonModule, RouterLink, WordSortingGameSummaryComponent, MatProgressBarModule, TimerComponent]
})

export class WordSortingGameComponent implements OnInit {

    @Input() selectedCategoryId?: string;
    @Output() reportTimeLeft = new EventEmitter<number>();
  
    category?: Category;
    totalPoints: number = 0;
    selectedWords: TranslatedWord[] = [];
    currentQuestionIndex: number = 0;
    message: string = '';
    timeLeft: number = 0;
    initialDuration = 60; 
    isLoadingDone = false
  
    constructor(
      private categoryService: CategoryService,
      private dialog: MatDialog,
      private gamePointsService: GamePointsService
    ) {}
  
    async ngOnInit(): Promise<void> {
        if (this.selectedCategoryId ) {
            this.categoryService.get(this.selectedCategoryId).then(
              (categoryFromService) => {
                if (categoryFromService) {
                  this.category = categoryFromService;
                }
                if (this.category && this.category.words.length < 3) {
                  this.message = "To play this game, a category must contain at least 3 words.";
                  this.isLoadingDone = true
                } else {
                  this.getSelectedWords().then((result: TranslatedWord[])=>{
                    this.selectedWords = result
                    this.isLoadingDone = true
                  }); 
                }
              }
            );
          }
        this.timeLeft = this.initialDuration;
      }

  
    async getSelectedWords(): Promise<TranslatedWord[]> {
        let selectedWords: TranslatedWord[] = [];
        if (this.category) {
          selectedWords.push(
            ...this.getRandomWordsFromCategory(this.category, 3).map(word => {
              word.categoryId = this.category!.id;
              word.categoryName = this.category?.categoryName
              return word;
            })
          );
      
          // Get 3 words from another random category
          const otherCategory = await this.getRandomOtherCategory(); // Use await here
          selectedWords.push(
            ...this.getRandomWordsFromCategory(otherCategory, 3).map(word => {
              word.categoryId = otherCategory.id; // Assign categoryId here
              word.categoryName = otherCategory.categoryName
              return word;
            })
          );
      
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

    async getRandomOtherCategory(): Promise<Category> {
        const categories = await this.categoryService.list();
        const filteredCategories = categories.filter((cat: Category) => cat.id !== this.category!.id);
        const randomIndex = Math.floor(Math.random() * filteredCategories.length);
        return filteredCategories[randomIndex];
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
            this.gamePointsService.addGamePlayed(new GamePlayed(this.category!.id, 3, new Date(), this.totalPoints,this.timeLeft,this.initialDuration-this.timeLeft));
        }
    }


  isGameFinished(): boolean {
        return this.currentQuestionIndex == this.selectedWords.length || this.timeLeft == 0 
    }


    shouldShowWords(): boolean{
        return this.currentQuestionIndex < this.selectedWords.length
    }

    
    calculateProgress(): number {
        return ((this.currentQuestionIndex) / this.selectedWords.length) * 100;
    }
    
    handleTimeLeft(timeLeft: number): void {
        this.timeLeft = timeLeft;
        this.reportTimeLeft.emit(timeLeft); // Emit the time left to the parent component
        if (timeLeft === 0) {
            // Display game summary screen and report to the games played service
            if (!this.message) {
                this.gamePointsService.addGamePlayed(new GamePlayed(
                    this.category!.id,
                    3,
                    new Date(),
                    this.totalPoints,
                    this.timeLeft,
                    this.initialDuration - this.timeLeft
                ));
                
            }
        }
    }
    
}    
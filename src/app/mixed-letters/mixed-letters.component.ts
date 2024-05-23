import { Component, Input, NgModule, OnInit } from '@angular/core';
import { GameExitButtonComponent } from "../game-exit-button/game-exit-button.component";
import { PointsDisplayComponent } from "../points-display/points-display.component";
import { CommonModule } from '@angular/common';
import { Category } from '../shared/model/category';
import { CategoryService } from '../services/category.service';
import { TranslatedWord } from '../shared/model/translatword';
import { SuccessDialogComponent } from '../../matching-game-module/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from '../../matching-game-module/error-dialog/error-dialog.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { GameSummaryComponent } from "../matching-game-summary/game-summary.component";
import { MixedLettersSummaryComponent } from "../mixed-letters-summary/mixed-letters-summary.component";
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { GamePlayed } from '../shared/model/game-played';
import { GamePointsService } from '../services/game-points.service';
import { TimerComponent } from "../timer/timer.component";


@Component({
    selector: 'app-mixed-letters',
    standalone: true,
    templateUrl: './mixed-letters.component.html',
    styleUrl: './mixed-letters.component.css',
    imports: [GameExitButtonComponent, PointsDisplayComponent, CommonModule, FormsModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatInputModule, GameSummaryComponent, MixedLettersSummaryComponent, MatProgressBarModule, TimerComponent]
})
export class MixedLettersComponent implements OnInit {
    @Input() selectedCategoryId?: string;
    category?: Category;
    totalPoints: number = 0;
    currentWordIndex: number = 0;
    shuffleWord: string = "";
    selectedWords: TranslatedWord[] = [];
    timeLeft: number = 0;
    
    initialDuration = 5; // Initial duration in seconds
    gameFinished: boolean = false;
  
    constructor(
      private categoryService: CategoryService,
      private dialog: MatDialog,
      private gamePointsService: GamePointsService
    ) {}
  
    handleTimeLeft(timeLeft: number): void {
      this.timeLeft = timeLeft;
      if (timeLeft === 0) {
        for(let i = this.currentWordIndex; i< this.category!.words.length; i++){
          this.selectedWords.push(this.category!.words[i]);
        }

        this.endGame();
      }
    }
  
    ngOnInit(): void {
      if (this.selectedCategoryId) {
        this.category = this.categoryService.get(parseInt(this.selectedCategoryId));
        this.shuffleWord = this.shuffleWorddd(this.category?.words[0].origin!.toLowerCase()!);
      }
      this.timeLeft = this.initialDuration;
    }
  
    shuffleWorddd(word: string): string {
      let x = word.split('').sort(() => Math.random() - 0.5).join('');
      return x;
    }
  
    checkWord(word: TranslatedWord): void {
      this.selectedWords.push(word);
  
      if (word.userInput?.toLowerCase() === word.origin.toLowerCase()) {
        this.dialog.open(SuccessDialogComponent, {
          width: '250px',
          data: { message: 'Congratulations! You spelled the word correctly!' }
        });
        this.totalPoints += Math.floor(100 / this.category?.words.length!);
      } else {
        this.dialog.open(ErrorDialogComponent, {
          width: '250px',
          data: { message: 'Oops, You did not spell the word correctly.' }
        });
      }
  
      this.moveToNextWord();
    }
  
    moveToNextWord(): void {
      if (this.currentWordIndex < this.category!.words.length) {
        this.currentWordIndex++;
        const currentWord = this.category?.words[this.currentWordIndex];
        if (currentWord) {
          this.shuffleWord = this.shuffleWorddd(currentWord.origin!.toLowerCase()!);
        }
      }
  
      if (this.isGameFinished()) {
        this.endGame();
      }
    }
  
    endGame(): void {
      this.gameFinished = true;
      // Report to the games played service
      this.gamePointsService.addGamePlayed(new GamePlayed(
        this.category!.id,
        this.category!.words.length, // Report all words for this game
        new Date(),
        this.totalPoints,
        this.timeLeft,
        this.initialDuration - this.timeLeft
      ));
    }
  
    isGameFinished(): boolean {
      return this.currentWordIndex === this.category!.words.length || this.timeLeft === 0;
    }
  
    calculateProgress(): number {
      return (this.currentWordIndex + 1) / this.category!.words.length * 100;
    }
  
    resetInput(): void {
      this.category!.words[this.currentWordIndex].userInput = '';
    }
  }
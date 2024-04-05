import { Component, Input, OnInit } from '@angular/core';
import { CategorySelectionComponent } from '../../app/category-selection/category-selection.component';
import { Category } from '../../app/shared/model/category';
import { CategoryService } from '../../app/services/category.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { GameExitButtonComponent } from "../../app/game-exit-button/game-exit-button.component";
import { WordDisplayComponent } from "../word-display/word-display.component";
import { WordStatus } from '../matching-game-module/model/word-status';
import { TranslatedWord } from '../../app/shared/model/translatword';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { ExitButtonDialogComponent } from '../../app/exit-button-dialog/exit-button-dialog.component'; 
import { MatButtonModule } from '@angular/material/button';
import { PointsDisplayComponent } from "../../app/points-display/points-display.component";
import { GameSummaryComponent } from "../../app/matching-game-summary/game-summary.component";
import { GamePointsService } from '../../app/services/game-points.service';
import { GamePlayed } from '../../app/shared/model/game-played';

@Component({
    selector: 'app-matching-game',
    standalone: true,
    templateUrl: './matching-game.component.html',
    styleUrl: './matching-game.component.css',
    imports: [CategorySelectionComponent, CommonModule, GameExitButtonComponent, WordDisplayComponent, MatCardModule, ExitButtonDialogComponent, MatButtonModule, RouterLink, PointsDisplayComponent, GameSummaryComponent]
})
export class MatchingGameComponent implements OnInit {
  @Input() selectedCategoryId?: string;
  category?: Category;
  selectedWords: TranslatedWord[] = [];
  interpretations: string[] = [];
  sourceWordStatuses: WordStatus[] = [];
  targetWordStatuses: WordStatus[] = [];
  message: string | undefined;
  attempts: number = 0;
  successes: number = 0;
  totalPoints: number = 0;
  roundPoints: number = 20;
  disableWords: boolean = false;


  constructor(
      private categoryService: CategoryService,
      private dialog: MatDialog,
      private gamePointsService: GamePointsService
  ) {}

  ngOnInit(): void {
            // Fetch the selected category based on categoryId
            this.category = this.categoryService.get(parseInt(this.selectedCategoryId!));
            if (this.category) {
                this.selectRandomWords();
                this.shuffleInterpretations();
                this.initializeWordStatuses();
            } else {
                this.message = 'Category not found. Please select another category.';
            }
  }

    

  selectRandomWords(): void {
        const words = this.category?.words;
        if (words && words.length >= 5) {
            const shuffledWords = words.sort(() => Math.random() - 0.5).slice(0, 5);
            this.selectedWords = shuffledWords;
            // Assuming 'origin' represents the English word and 'hebrewTranslation' represents the Hebrew word
            this.interpretations = shuffledWords.map(word => word['target']);
        } else {
            this.message = 'To play this game, a category must contain at least 5 words.';
        }
  }


  shuffleInterpretations(): void {
      this.interpretations.sort(() => Math.random() - 0.5);
  }

  initializeWordStatuses(): void {
      this.sourceWordStatuses = Array(this.selectedWords.length).fill(WordStatus.NORMAL);
      this.targetWordStatuses = Array(this.interpretations.length).fill(WordStatus.NORMAL);
  }

  onWordClick(index: number): void {
      let prevIndex = this.sourceWordStatuses.findIndex((st) => st == WordStatus.SELECTED);
      let hebIndex = this.targetWordStatuses.findIndex((st) => st == WordStatus.SELECTED);
      if (this.sourceWordStatuses[index] === WordStatus.DISABLED) {
        // Word is already disabled, do nothing
        return;
      }
      // Reset previously selected Hebrew word status to NORMAL
      if (hebIndex > -1) {
        this.targetWordStatuses[hebIndex] = WordStatus.NORMAL;
      }
    
      if (prevIndex > -1) {
        this.sourceWordStatuses[prevIndex] = WordStatus.NORMAL;
      }
      this.sourceWordStatuses[index] = WordStatus.SELECTED;
    
      if (hebIndex  == -1) {
        return;
      }
    
      let selectedEnglishWord = this.selectedWords[index].target;
      let selectedHebrewWord = this.interpretations[hebIndex];
      
      if (selectedEnglishWord !== selectedHebrewWord) {
        // Words do not match
        this.attempts++;
        this.totalPoints -= 2 ; // Deduct 2 points for each mistake
        this.openErrorDialog();
      } else {
        // Words match
        this.sourceWordStatuses[index] = WordStatus.DISABLED;
        this.targetWordStatuses[hebIndex] = WordStatus.DISABLED;
        this.totalPoints += this.roundPoints; // Add 20 points for each correct match
        this.successes++;
        this.openSuccessDialog();
        if(this.isGameFinished()){
          this.gamePointsService.addGamePlayed(new GamePlayed(this.category!.id, 1, new Date(), this.totalPoints ))
        }
      }
  }
    
  onInterpretationClick(index: number): void {
      let prevIndex = this.targetWordStatuses.findIndex((st) => st == WordStatus.SELECTED);
      let engIndex = this.sourceWordStatuses.findIndex((st) => st == WordStatus.SELECTED);
      if (this.targetWordStatuses[index] === WordStatus.DISABLED) {
        // Word is already disabled, do nothing
        return;
      }
      if (engIndex > -1) {
        this.sourceWordStatuses[engIndex] = WordStatus.NORMAL;
      }
    
      if (prevIndex > -1) {
        this.targetWordStatuses[prevIndex] = WordStatus.NORMAL;
      }
      this.targetWordStatuses[index] = WordStatus.SELECTED;
    
      if (engIndex == -1) {
        return;
      }
    
      let selectedHebrewWord = this.interpretations[index];
      let selectedEnglishWord = this.selectedWords[engIndex].target;

      if (selectedHebrewWord !== selectedEnglishWord) {
        // Words do not match
        this.attempts++;
        this.totalPoints -= 2; // Deduct 2 points for each mistake
        this.openErrorDialog();
      } else {
        // Words match
        this.targetWordStatuses[index] = WordStatus.DISABLED;
        this.sourceWordStatuses[engIndex] = WordStatus.DISABLED;
        this.totalPoints += this.roundPoints; // Add 20 points for each correct match
        this.successes++;
        this.openSuccessDialog();
        if(this.isGameFinished()){
          this.gamePointsService.addGamePlayed(new GamePlayed(this.category!.id, 1, new Date(), this.totalPoints )) 
        }
      }
      
  }
    
    
  openSuccessDialog(): void {
        const dialogRef = this.dialog.open(SuccessDialogComponent, {
          width: '250px',
        });
      
        dialogRef.afterClosed().subscribe(() => {
          // Continue with game
        });
  }
      
  openErrorDialog(): void {
        const dialogRef = this.dialog.open(ErrorDialogComponent, {
          width: '250px',
        });
      
        dialogRef.afterClosed().subscribe(() => {
          // Continue with game
        });
  }
      



  isGameFinished(): boolean {
      return this.areAllWordsDisabled();
  }
  
  
  
  areAllWordsDisabled(): boolean {
      // Logic to check if all words are disabled
      // Here, we check if all words are in DISABLED state
      return this.sourceWordStatuses.every(status => status === WordStatus.DISABLED) &&
             this.targetWordStatuses.every(status => status === WordStatus.DISABLED) &&
             (this.category?.words.length ?? 0) >= 5;
  }
}
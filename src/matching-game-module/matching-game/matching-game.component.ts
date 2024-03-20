import { Component, Input, OnInit } from '@angular/core';
import { CategorySelectionComponent } from '../../app/category-selection/category-selection.component';
import { Category } from '../../app/shared/model/category';
import { CategoryService } from '../../app/services/category.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { GameExitButtonComponent } from "../../app/game-exit-button/game-exit-button.component";
import { WordDisplayComponent } from "../word-display/word-display.component";
import { WordStatus } from '../matching-game-module/model/word-status';
import { TranslatedWord } from '../../app/shared/model/translatword';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';

@Component({
    selector: 'app-matching-game',
    standalone: true,
    templateUrl: './matching-game.component.html',
    styleUrl: './matching-game.component.css',
    imports: [CategorySelectionComponent, CommonModule, GameExitButtonComponent, WordDisplayComponent, MatCardModule]
})
export class MatchingGameComponent implements OnInit {
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
      private route: ActivatedRoute,
      private categoryService: CategoryService,
      private router: Router,
      private dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            const categoryId = params['categoryId'];
            const gameId = params['gameId'];
            // Fetch the selected category based on categoryId
            this.category = this.categoryService.get(parseInt(categoryId));
            if (this.category) {
                this.selectRandomWords();
                this.shuffleInterpretations();
                this.initializeWordStatuses();
            } else {
                this.message = 'Category not found. Please select another category.';
            }
        });
    }

    selectRandomWords(): void {
        const words = this.category?.words;
        if (words && words.length >= 5) {
            const shuffledWords = words.sort(() => Math.random() - 0.5).slice(0, 5);
            this.selectedWords = shuffledWords;
            // Assuming 'origin' represents the English word and 'hebrewTranslation' represents the Hebrew word
            this.interpretations = shuffledWords.map(word => word['target']);
        } else {
            this.message = 'Not enough words in the category.';
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
        if (!this.disableWords) {
          if (this.sourceWordStatuses[index] === WordStatus.NORMAL) {
          //  this.sourceWordStatuses.fill(WordStatus.NORMAL);
            this.sourceWordStatuses[index] = WordStatus.SELECTED;
            const selectedWord = this.selectedWords[index].origin;
            let XXX= this.targetWordStatuses.findIndex(status => status == WordStatus.SELECTED)
            const selectedInterpretationIndex = this.interpretations.findIndex(word => word === selectedWord);
            if (selectedInterpretationIndex !== -1) {
              this.checkMatch(index, selectedInterpretationIndex);
            }
          } else {
            this.sourceWordStatuses[index] = WordStatus.NORMAL;
          }
        }
      }
    
    onInterpretationClick(index: number): void {
        if (!this.disableWords) {
          if (this.targetWordStatuses[index] === WordStatus.NORMAL) {
            this.targetWordStatuses.fill(WordStatus.NORMAL);
            this.targetWordStatuses[index] = WordStatus.SELECTED;
            const selectedInterpretation = this.interpretations[index];
            const selectedInterpretationIndex = this.interpretations.findIndex(word => word === selectedInterpretation);
            if (selectedInterpretationIndex !== -1) {
                this.checkMatch(selectedInterpretationIndex, index);
            }
        } else {
                this.targetWordStatuses[index] = WordStatus.NORMAL;
            }
        }
    }
    
    checkMatch(sourceIndex: number, targetIndex: number): void {
        if (this.selectedWords[sourceIndex].origin === this.interpretations[targetIndex]) {
          // Correct match
          this.sourceWordStatuses[sourceIndex] = WordStatus.DISABLED;
          this.targetWordStatuses[targetIndex] = WordStatus.DISABLED;
          this.totalPoints += this.roundPoints;
          this.openSuccessDialog();
        } else {
          // Incorrect match
          this.attempts++;
          this.openErrorDialog();
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
      
    returnToCategorySelection(): void {
        this.router.navigate(['/category-selection']);
      }
    }
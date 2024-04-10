import { Component, Input, OnInit } from '@angular/core';
import { TranslatedWord } from '../shared/model/translatword';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCommonModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-mixed-letters-summary',
  standalone: true,
  imports: [MatFormFieldModule,NgFor, RouterModule, MatCommonModule, MatButtonModule, MatInputModule, NgIf],
  templateUrl: './mixed-letters-summary.component.html',
  styleUrl: './mixed-letters-summary.component.css'
})
export class MixedLettersSummaryComponent implements OnInit  {
  @Input() totalPoints: number = 0;
  @Input() attempts: number = 0;
  @Input() selectedWords: TranslatedWord[] = [];

  constructor() {}

  ngOnInit(): void {}

  playAgain(): void {
    window.location.reload();
  }

  correctTranslationsCount(): number {
    let correctCount = 0;
    for (const word of this.selectedWords) {
        if (word.userInput?.toLowerCase() === word.origin.toLowerCase()) {
            correctCount++;
        }
    }
    return correctCount;
  }

}
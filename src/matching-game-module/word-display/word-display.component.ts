import { Component, Input } from '@angular/core';
import { WordStatus } from '../matching-game-module/model/word-status';
import { MatCardModule } from '@angular/material/card';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-word-display',
  standalone: true,
  imports: [MatCardModule,NgClass],
  templateUrl: './word-display.component.html',
  styleUrl: './word-display.component.css'
})
export class WordDisplayComponent {
  @Input() word: string | undefined;
  @Input() status: WordStatus | undefined;
  WordStatus = WordStatus;
}
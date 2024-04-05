import { NgFor } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { TranslatedWord } from '../shared/model/translatword';

@Component({
  selector: 'app-game-summary',
  standalone: true,
  imports: [MatFormFieldModule, NgFor, MatInputModule, MatButtonModule, RouterLink],
  templateUrl: './game-summary.component.html',
  styleUrl: './game-summary.component.css'
})
export class GameSummaryComponent implements OnInit  {
categoryId: any;
gameId: any;
  ngOnInit(): void {
  }
  @Input() totalPoints: number = 0;
  @Input() attempts: number = 0;
  @Input() selectedWords: TranslatedWord[] = [];
}
 
  


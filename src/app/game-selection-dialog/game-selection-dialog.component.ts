import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { GameProfile } from '../shared/model/game-profile';
import { NgFor, NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-game-selection-dialog',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
    RouterModule,
    MatDialogModule,
  ],
  templateUrl: './game-selection-dialog.component.html',
  styleUrl: './game-selection-dialog.component.css'
})
export class GameSelectionDialogComponent implements OnInit {
  selectedGame: GameProfile | null = null;
  games: GameProfile[];
  categoryId: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { categoryId: number, games: GameProfile[] },
  ) {
    this.categoryId = data.categoryId;
    this.games = data.games;
  }
  ngOnInit(): void {
  }
  
    
}  
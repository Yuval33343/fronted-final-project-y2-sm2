import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-match-dialog',
  standalone: true,
  imports: [MatDialogActions,MatDialogContent, MatDialogTitle, MatButtonModule],
  templateUrl: './match-dialog.component.html',
  styleUrl: './match-dialog.component.css'
})
export class MatchDialogComponent {
  constructor(private dialogRef: MatDialogRef<MatchDialogComponent>) {}

  confirmExit(choice: string): void {
    this.dialogRef.close(choice);
  }
}


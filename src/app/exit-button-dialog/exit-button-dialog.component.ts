import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-exit-button-dialog',
  standalone: true,
  imports: [MatDialogActions,MatDialogContent, MatDialogTitle, MatButtonModule],
  templateUrl: './exit-button-dialog.component.html',
  styleUrl: './exit-button-dialog.component.css'
})
export class ExitButtonDialogComponent {
  constructor(private dialogRef: MatDialogRef<ExitButtonDialogComponent>) {}

  confirmExit(choice: string): void {
    this.dialogRef.close(choice);
  }
}




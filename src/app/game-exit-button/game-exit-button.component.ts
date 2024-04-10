import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ExitButtonDialogComponent } from '../exit-button-dialog/exit-button-dialog.component';

@Component({
  selector: 'app-game-exit-button',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './game-exit-button.component.html',
  styleUrl: './game-exit-button.component.css'
})
export class GameExitButtonComponent {

  constructor(private dialog: MatDialog, private router: Router) {}

  openExitDialog(): void {
    const dialogRef = this.dialog.open(ExitButtonDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'Yes') {
        this.router.navigate(['/category-selection']); 
      }
    });
  }
}
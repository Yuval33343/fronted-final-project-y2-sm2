
import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA,MatDialogRef,MatDialogTitle,
MatDialogContent,MatDialogActions,MatDialogClose} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-delete-category-dialog',
  standalone: true,
  imports: [MatButtonModule,MatDialogTitle,MatDialogContent,MatDialogActions,MatDialogClose],
  templateUrl: './delete-category-dialog.component.html',
  styleUrl: './delete-category-dialog.component.css'
})
export class DeleteCategoryDialogComponent {
words: any;
  constructor(
    public dialogRef: MatDialogRef<DeleteCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public name: string,) {}
}

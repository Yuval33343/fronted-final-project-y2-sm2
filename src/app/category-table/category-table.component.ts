import { Component, OnInit,ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { Category } from '../shared/model/category';
import { CategoryService } from '../services/category.service';
import { RouterModule,Router } from '@angular/router';
import { DeleteCategoryDialogComponent } from '../delete-category-dialog/delete-category-dialog.component';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-category-table',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatMenuModule, MatButtonModule,MatTableModule,CommonModule,RouterModule,DatePipe],
  templateUrl: './category-table.component.html',
  styleUrl: './category-table.component.css'
})

export class CategoryTableComponent implements OnInit {
  
  categories: Category[] = [];
 

  constructor(private categoryService: CategoryService,private router: Router,private dialogService : MatDialog) {}

 

  ngOnInit(): void {
    this.categories = this.categoryService.list();
  }
  deleteCategory(id: number, categoryName: string): void {
    const dialogRef = this.dialogService.open(DeleteCategoryDialogComponent,{data: categoryName,});
   
   dialogRef.afterClosed().subscribe((deletionConfirmed: boolean) => {
    if(deletionConfirmed==true){
    this.categoryService.delete(id)
    this.categories=this.categoryService.list()
    }
    });
    }

  dataSource = this.categories;


  editCategory(category: any): void {

    this.router.navigate(['/category-form', { id: category.id }]);
  }

  newCategory(): void {
    
    this.router.navigate(['/category-form']);
  }

 


 

}
import { Component, OnInit,ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { Category } from '../shared/model/category';
import { CategoryService } from '../services/category.service';
import { RouterModule,Router } from '@angular/router';
import { DeleteCategoryDialogComponent } from '../delete-category-dialog/delete-category-dialog.component';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import {Sort, MatSortModule} from '@angular/material/sort';


@Component({
  selector: 'app-category-table',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatMenuModule, MatButtonModule,MatTableModule,CommonModule,RouterModule,DatePipe,MatSortModule],
  templateUrl: './category-table.component.html',
  styleUrl: './category-table.component.css'
})

export class CategoryTableComponent implements OnInit {
 
  categories: Category[] = [];
  displayedColumns: string[] = ['name', 'words', 'lastModified', 'actions'];
  dataSource: MatTableDataSource<Category>;
  router: any;

  constructor(private categoryService: CategoryService, private dialogService: MatDialog) {
    this.dataSource = new MatTableDataSource<Category>(this.categories);
  }

  ngOnInit(): void {
    this.categories = this.categoryService.list();
    
  }

  deleteCategory(id: number, categoryName: string): void {
    const dialogRef = this.dialogService.open(DeleteCategoryDialogComponent, { data: categoryName });
  
    dialogRef.afterClosed().subscribe((deletionConfirmed: boolean) => {
      if (deletionConfirmed) {
        this.categoryService.delete(id);
        this.categories = this.categoryService.list();
        this.dataSource.data = this.categories;
      }
    });
  }
  


  editCategory(category: any): void {

    this.router.navigate(['/category-form', { id: category.id }]);
  }

  newCategory(): void {

    this.router.navigate(['/category-form']);
  }

 
  sortData(sort: Sort) {
    const data = this.categories.slice();
    if (!sort.active || sort.direction === '') {
      this.categories = data;
      return;
    }
    

    this.categories = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'Cname':
          return compare(a.categoryName.toLowerCase(), b.categoryName.toLowerCase(), isAsc);
        case 'numWords':
          return compare(a.words.length, b.words.length, isAsc);
        case 'Cdate':
          return compare(a.lastModifiedDate, b.lastModifiedDate, isAsc);
        default:
          return 0;
      }
    });
  }

}

function compare(a: any, b: any, isAsc: boolean) {
  if (typeof a === 'string' && typeof b === 'string') {
    const dateA = new Date(a);
    const dateB = new Date(b);
    if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
      return (dateA < dateB ? -1 : 1) * (isAsc ? 1 : -1);
    }
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

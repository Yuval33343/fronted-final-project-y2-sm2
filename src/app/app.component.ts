import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CategoryTableComponent } from './category-table/category-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';
import { CategoryFormComponent } from './category-form/category-form.component';
import { MatSortModule } from '@angular/material/sort';

const routes: Routes = [
  { path: '', component: CategoryTableComponent }, 
  { path: 'category-form', component: CategoryFormComponent }, 
];

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, CategoryTableComponent,MatTableModule, MatButtonModule,MatIconModule,RouterModule,MatSortModule]
    
})

export class AppComponent {
  title = 'Little-Linguis';
}
export class YourModule {}

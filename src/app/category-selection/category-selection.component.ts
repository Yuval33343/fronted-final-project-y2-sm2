import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../shared/model/category';
import { Router, RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelect, MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-category-selection',
  templateUrl: './category-selection.component.html',
  styleUrls: ['./category-selection.component.css'],
  standalone: true,
  imports: [MatInputModule, MatButtonModule, RouterLink, MatSelectModule,],
})
export class CategorySelectionComponent implements OnInit {
  categories: Category[] = [];
  selectedCategory: Category | undefined;

  constructor(private categoryService: CategoryService, private router: Router) { }

  ngOnInit(): void {
    this.categories = this.categoryService.list();
  }

  startGame(category: Category): void {
    if (category) {
      this.router.navigate(['/game', { categoryId: category.id }]);
    }
  }
}
import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../shared/model/category';
import { Router, RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {  MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-category-selection',
  templateUrl: './category-selection.component.html',
  styleUrls: ['./category-selection.component.css'],
  standalone: true,
  imports: [MatInputModule, MatButtonModule, RouterLink, MatSelectModule,CommonModule,MatCardModule,],
})
export class CategorySelectionComponent implements OnInit {
  @Input()
  category?: Category
  categories: Category[] = [];


  constructor(private categoryService: CategoryService, private router: Router) { }

  ngOnInit(): void {
    this.categories = this.categoryService.list();
  }

  startGame(categoryId: number): void {
    this.router.navigate(['/translate', categoryId]);
  }  
    
  }
  

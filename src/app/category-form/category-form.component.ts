

import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../shared/model/category';
import { CategoryService } from '../services/category.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [FormsModule, MatButtonModule, CommonModule, MatInputModule, MatFormFieldModule],
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})

export class CategoryFormComponent implements OnInit {
  @Input() idString?: string;
  currentcategory: Category = new Category('', new Date(), 0); 

  constructor(private categoryService: CategoryService, private router: Router) {}

  ngOnInit(): void {
    if (this.idString) {
      let id: number = parseInt(this.idString);
      const category = this.categoryService.getCategoryById(id);

      if (category !== undefined) {
        this.currentcategory = category;
      }
    }
  }

  onSubmitRegistration() {
    console.log('Form submitted!');
    if (this.currentcategory.words.length === 0) {
      console.error('Please add at least one pair of words.');
      return;
    }
    if (this.idString) {
      this.categoryService.updateCategory(this.currentcategory);
    } else {
      this.categoryService.addCategory(this.currentcategory);
    }
    this.router.navigate(['/']);
  }
}

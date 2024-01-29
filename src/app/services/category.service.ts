
import { Injectable } from '@angular/core';
import { Category } from '../shared/model/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
 
  
  private categories: Map<number, Category> = new Map<number, Category>();
  private nextCategoryId: number = 1;


  add(category: Category): void {
    category.id = this.nextCategoryId;
    category.lastModifiedDate = new Date();
    this.categories.set(category.id, category);
    this.nextCategoryId++;
  }

  delete(categoryId: number): void {
    if (this.categories.has(categoryId)) {
      this.categories.delete(categoryId);
    }
  }

  update(category: Category): void {
    if (this.categories.has(category.id)) {
      category.lastModifiedDate = new Date();
      this.categories.set(category.id, category);
    }
  }

  list(): Category[] {
    return Array.from(this.categories.values());
  }

  get(categoryId: number): Category | undefined {
    return this.categories.get(categoryId);
  }
}

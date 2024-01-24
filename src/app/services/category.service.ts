
import { Injectable } from '@angular/core';
import { Category } from '../shared/model/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  list(): Category[] {
    throw new Error('Method not implemented.');
  }
  delete(id: number) {
    throw new Error('Method not implemented.');
  }
  private categories: Map<number, Category> = new Map<number, Category>();
  private nextCategoryId: number = 1;


  addCategory(category: Category): void {
    category.id = this.nextCategoryId++;
    category.lastModifiedDate = new Date();
    this.categories.set(category.id, category);
  }

  deleteCategory(categoryId: number): void {
    if (this.categories.has(categoryId)) {
      this.categories.delete(categoryId);
    }
  }

  updateCategory(category: Category): void {
    if (this.categories.has(category.id)) {
      category.lastModifiedDate = new Date();
      this.categories.set(category.id, category);
    }
  }

  listCategories(): Category[] {
    return Array.from(this.categories.values());
  }

  getCategoryById(categoryId: number): Category | undefined {
    return this.categories.get(categoryId);
  }
}

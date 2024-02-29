import { Injectable } from '@angular/core';
import { Category } from '../shared/model/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly storageKey = 'categories';

  private get categoriesFromLocalStorage(): Map<number, Category> {
    const storedCategories = localStorage.getItem(this.storageKey);
    return storedCategories ? new Map<number, Category>(JSON.parse(storedCategories)) : new Map<number, Category>();
  }

  private set categoriesToLocalStorage(categories: Map<number, Category>) {
    localStorage.setItem(this.storageKey, JSON.stringify(Array.from(categories.entries())));
  }

  private get nextCategoryId(): number {
    const nextId = localStorage.getItem('nextCategoryId');
    return nextId ? +nextId : 1;
  }

  private set nextCategoryId(nextId: number) {
    localStorage.setItem('nextCategoryId', nextId.toString());
  }

  constructor() {} // Add constructor to ensure service is provided correctly

  add(category: Category): void {
    category.id = this.nextCategoryId;
    category.lastModifiedDate = new Date();
    const categories = this.categoriesFromLocalStorage;
    categories.set(category.id, category);
    this.categoriesToLocalStorage = categories;
    this.nextCategoryId++;
  }

  delete(categoryId: number): void {
    const categories = this.categoriesFromLocalStorage;
    if (!categories.has(categoryId)) {
      throw new Error(`Category with ID ${categoryId} does not exist.`);
    }
    categories.delete(categoryId);
    this.categoriesToLocalStorage = categories;
  }

  update(category: Category): void {
    const categories = this.categoriesFromLocalStorage;
    if (!categories.has(category.id)) {
      throw new Error(`Category with ID ${category.id} does not exist.`);
    }
    category.lastModifiedDate = new Date();
    categories.set(category.id, category);
    this.categoriesToLocalStorage = categories;
  }

  list(): Category[] {
    return Array.from(this.categoriesFromLocalStorage.values());
  }

  get(categoryId: number): Category | undefined {
    const category = this.categoriesFromLocalStorage.get(categoryId);
    if (!category) {
      throw new Error(`Category with ID ${categoryId} does not exist.`);
    }
    return category;
  }
}

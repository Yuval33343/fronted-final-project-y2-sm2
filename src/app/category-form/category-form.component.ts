import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Category } from '../shared/model/category';
import { CategoryService } from '../services/category.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslatedWord } from '../shared/model/translatword';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [FormsModule, MatButtonModule, CommonModule, MatInputModule, MatFormFieldModule, MatIconModule],
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})

export class CategoryFormComponent implements OnInit {
  
  
  currentcategory: Category = new Category('', new Date(), "");
  @Input() idString?: string;
  
  constructor(private categoryService: CategoryService, private router: Router) {}

  ngOnInit(): void {
    if (this.idString) {
      this.categoryService.get(this.idString).then(
        (categoryFromService) => {
          if (categoryFromService) {
            this.currentcategory = categoryFromService;
          }
        }
      );
    }
  }


  onSubmitRegistration(): void {
    alert("The category has been added to the site!");

    if (this.idString) {
      this.categoryService.update(this.currentcategory).then(
        () => this.navigateToCCategoryTable()
      );
    } else {
      this.categoryService.add(this.currentcategory).then(
        () => this.navigateToCCategoryTable()
      );
    } 
  }

  addNewWord(): void {
    this.currentcategory.words.push(new TranslatedWord("", ""));
  }

  deleteWord(index: number): void {
    this.currentcategory.words.splice(index, 1);
  }

  navigateToCCategoryTable(): void {
    this.router.navigate(['app-category-table']);
  }

  isOriginValid(i: number): boolean {
    const originValue = this.currentcategory.words[i].origin;
    return /^[A-Za-z]+$/.test(originValue);
  }

  isTargetValid(i: number): boolean {
    const targetValue = this.currentcategory.words[i].target;
    return /^[א-ת]+$/.test(targetValue);
  }
  
  isCategoryValid(): boolean {
    // Check if the categoryName field is valid
    const categoryName = this.currentcategory.categoryName.trim(); 
    const isValid = /^[A-Za-zא-ת]+$/.test(categoryName); 

    return isValid;
  }

}

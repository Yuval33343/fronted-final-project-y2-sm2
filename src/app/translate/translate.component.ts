import { Component, Input,OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CategoryService } from '../services/category.service';
import { TranslatedWord } from '../shared/model/translatword';
import { Category } from '../shared/model/category';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-translate',
  standalone: true,
  imports: [MatButtonModule,FormsModule,CommonModule],
  templateUrl: './translate.component.html',
  styleUrl: './translate.component.css'
})
export class TranslateComponent implements OnInit {
  @Input() selectedCategoryId?: string;
  category?: Category;
  translations: TranslatedWord[] = [];
  showResults: boolean = false;
  translationResults: boolean[] = [];
  resultMessage: string = '';
  


  constructor(private categoryService: CategoryService,){}
  ngOnInit(): void {
    console.log(this.selectedCategoryId)

    if (this.selectedCategoryId ) {
      this.category = this.categoryService.get(parseInt(this.selectedCategoryId));
      }
   }
  
  checkTranslations(): void {
    if (this.category) {
      this.translationResults = this.translations.map((translation, index) => {
        return translation.hebrewTranslation === (this.category?.words[index]?.target || '');
      });
      const allCorrect = this.translationResults.every(result => result);
      this.resultMessage = allCorrect ? 'All translations are correct!' : 'Some translations are incorrect.';
      this.showResults = true;
}}}
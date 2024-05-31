import { Component, Input,OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CategoryService } from '../services/category.service';
import { TranslatedWord } from '../shared/model/translatword';
import { Category } from '../shared/model/category';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-translate',
  standalone: true,
  imports: [MatButtonModule,FormsModule,CommonModule, MatFormFieldModule,MatInputModule,MatIconModule,RouterLink],
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
  seeResultMessage: string = '';
  translateButtonClicked: boolean = false;
  isLoadingDone = false;


  constructor(private categoryService: CategoryService,){}

  ngOnInit(): void {
    console.log(this.selectedCategoryId)

    if (this.selectedCategoryId ) {
      this.categoryService.get(this.selectedCategoryId).then(
        (categoryFromService) => {
          if (categoryFromService) {
            this.category = categoryFromService;
          }
          this.isLoadingDone = true
        }
      );
    }
  }
  
  checkTranslations(): void {
    this.translationResults = []; 
    let count = 0;
  
    for(let i = 0; i < this.category!.words.length; i++){
      if(this.category!.words[i].target == this.category!.words[i].hebrewTranslation){
        count++;
      }
      this.translationResults.push(this.category!.words[i].target == this.category!.words[i].hebrewTranslation);
    }
  
    if(count == this.translationResults.length){
      this.resultMessage = "!כל הכבוד!!! תרגמת נכון את כל המילים";
    } else {
      this.resultMessage = "תרגמת- " + count + " מילים נכונות " + " מתוך " + this.category!.words.length +" מילים, " + " אנא נסה שוב ";
    }
    
    this.showResults = true;
  }

  revealTranslations(): void {
    if (this.category) {
      this.category.words.forEach(word => {
        word.hebrewTranslation = word.target; 
        this.seeResultMessage = "...חבל, פעם הבאה נסה לבד";
      });
    }
  }
  
  disableCheckButton(): boolean {
    return this.translateButtonClicked;
  }

  translateButtonClick(): void {
    this.translateButtonClicked = true;
  }

}


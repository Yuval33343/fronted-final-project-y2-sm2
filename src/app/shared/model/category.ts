import { Language } from './language-enum';
import { TranslatedWord } from './translatword';



export class Category {

  public sourceLanguage: Language = Language.ENGLISH;
  public targetLanguage: Language = Language.HEBREW;
  public lastModifiedDate: Date;
  public id: string;
  public categoryName: string;
  public words: TranslatedWord[] = [];

  constructor(categoryName: string, lastModifiedDate: Date, id: string) {
    this.categoryName = categoryName;
    this.lastModifiedDate = lastModifiedDate;
    this.id = id;
  }

}

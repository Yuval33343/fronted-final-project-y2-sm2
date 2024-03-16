import { Language } from './language-enum';
import { TranslatedWord } from './translatword';



export class Category {

  public sourceLanguage: Language = Language.ENGLISH;
  public targetLanguage: Language = Language.HEBREW;
  public lastModifiedDate: Date;
  public id: number;
  public categoryName: string;
  public lastUpdateDate: Date = new Date();
  public words: TranslatedWord[] = [];
  static id: string;
  static categoryName: string;
  identifier: any;

  constructor(categoryName: string, lastModifiedDate: Date, id: number) {
    this.categoryName = categoryName;
    this.lastModifiedDate = lastModifiedDate;
    this.id = id;
  }

}

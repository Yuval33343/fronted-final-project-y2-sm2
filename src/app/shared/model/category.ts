import { Language } from './language-enum';

export class TranslatedWord {
 
}

export class Category {
  [x: string]: any;
  wordPairs: Map<string, string> = new Map<string, string>();
  public sourceLanguage: Language = Language.HEBREW;
  public targetLanguage: Language = Language.ENGLISH;
  public lastModifiedDate: Date;
  public id: number;
  public categoryName: string;
  public lastUpdateDate: Date = new Date();
  public words: TranslatedWord[] = [];

  constructor(categoryName: string, lastModifiedDate: Date, id: number) {
    this.categoryName = categoryName;
    this.lastModifiedDate = lastModifiedDate;
    this.id = id;
  }

  addPair(key: string, value: string): void {
    this.wordPairs.set(key, value);
  }
}

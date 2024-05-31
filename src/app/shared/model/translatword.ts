export class TranslatedWord {
    origin: string;
    target: string;
    hebrewTranslation: string;
    userInput: string | undefined;
    categoryId: string | undefined;
    categoryName: string | undefined;
    belongsToCategory: any;
    userChoise: boolean | undefined;

    constructor(origin: string, target: string, hebrewTranslation: string = '') {
      this.origin = origin;
      this.target = target;
      this.hebrewTranslation = hebrewTranslation;
    }
  }
  
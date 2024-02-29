export class TranslatedWord {
    origin: string;
    target: string;
    hebrewTranslation: string;
  
    constructor(origin: string, target: string, hebrewTranslation: string = '') {
      this.origin = origin;
      this.target = target;
      this.hebrewTranslation = hebrewTranslation;
    }
  }
  
import { QueryDocumentSnapshot, SnapshotOptions, Timestamp } from "@angular/fire/firestore";
import { Category } from "../../shared/model/category";
import { TranslateComponent } from "../../translate/translate.component";
import { TranslatedWord } from "../../shared/model/translatword";

export const categoryConverter = {
    toFirestore: (category : Category) => {
        const translatedWords = []
        for(const word of category.words){
            const translatedWord = {
                origin: word.origin,
                target: word.target
            }
            translatedWords.push(translatedWord)
        }

        return {
            categoryName: category.categoryName,
            words: translatedWords,
            lastModifiedDate: Timestamp.fromDate(category.lastModifiedDate)
        };
    },
    
    fromFirestore: (
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
    ) => {
        const data = snapshot.data(options);
         const newCategoryObj = new Category(
            data['categoryName'],
            data['lastModifiedDate'].toDate(),
            snapshot.id
        );


        const translatedWordsObj = []

        for(const word of data['words']){
            const translatedWordObj = new TranslatedWord(
                word.origin,
                word.target
            )
            translatedWordsObj.push(translatedWordObj)
        }

        newCategoryObj.words = translatedWordsObj

        return newCategoryObj

    },
}

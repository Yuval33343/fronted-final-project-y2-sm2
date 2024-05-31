import { Injectable } from '@angular/core';
import { Category } from '../shared/model/category';
import { DocumentReference, DocumentSnapshot, Firestore, QuerySnapshot, Timestamp, addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc } from '@angular/fire/firestore';
import { categoryConverter } from './convertor/category-converters';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  

  constructor(private firestoreService: Firestore) {} // Add constructor to ensure service is provided correctly


  async add(category: Category): Promise<void> {
    category.lastModifiedDate = new Date()
    await addDoc(
      collection(this.firestoreService, 'category').withConverter(
      categoryConverter
      ),
    category
    );
  }


  async list(): Promise<Category[]> {
    const collectionConnection = collection(
      this.firestoreService,
      'category'
    ).withConverter(categoryConverter);
    const querySnapshot: QuerySnapshot<Category> = await getDocs(collectionConnection);
    const result: Category[] = [];
    querySnapshot.docs.forEach((docSnap: DocumentSnapshot<Category>) => {
      const data = docSnap.data();
      if (data) {
        result.push(data);
      }
    });
    return result;
  }


  async get(categoryId: string): Promise<Category | undefined> {
    const categoryDocRef = doc(
      this.firestoreService,
       'category',
       categoryId
      ).withConverter(
          categoryConverter
        );
    return (await getDoc(categoryDocRef)).data();  
  }

 

    

  async delete(categoryId: string): Promise<void>  {
    const personDocRef = doc(
      this.firestoreService,
      'category',
      categoryId
    ).withConverter(categoryConverter);
  return await deleteDoc(personDocRef);
  }

  async update(category: Category): Promise<void> {
    category.lastModifiedDate = new Date()
      const personDocRef = doc(
        this.firestoreService,
        'category',
        category.id
      ).withConverter(categoryConverter);
    return await setDoc(personDocRef, category);
  }




}
function deletDoc(personDocRef: DocumentReference<Category, { categoryName: string; words: { origin: string; target: string; }[]; lastModifiedDate: Timestamp; }>, category: any): void | PromiseLike<void> {
  throw new Error('Function not implemented.');
}


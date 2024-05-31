import { Injectable } from '@angular/core';
import { GamePlayed } from '../shared/model/game-played';
import { DocumentSnapshot, Firestore, QuerySnapshot, addDoc, collection, getDocs } from '@angular/fire/firestore';
import { gamePlayedConverter } from './convertor/game-played-converters';

@Injectable({
  providedIn: 'root'
})
export class GamePointsService {
  private readonly storageKey = 'gamePlayed';

  constructor(private firestoreService: Firestore) {} // Add constructor to ensure service is provided correctly

  

  async list(): Promise<GamePlayed[]> {
    const collectionConnection = collection(
      this.firestoreService,
      'gamePlayed'
    ).withConverter(gamePlayedConverter);
    const querySnapshot: QuerySnapshot<GamePlayed> = await getDocs(collectionConnection);
    const result: GamePlayed[] = [];
    querySnapshot.docs.forEach((docSnap: DocumentSnapshot<GamePlayed>) => {
      const data = docSnap.data();
      if (data) {
        result.push(data);
      }
    });
    return result;
  }



  async addGamePlayed(gamePlayed: GamePlayed): Promise<void> {
    await addDoc(
      collection(this.firestoreService, 'gamePlayed').withConverter(
      gamePlayedConverter
      ),
      gamePlayed
    );
  }
}

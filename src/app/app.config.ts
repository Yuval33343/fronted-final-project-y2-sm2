import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideAnimations(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'little-linguist-final-project',
        appId: '1:239516673050:web:c1922691ae1861398cdda3',
        storageBucket: 'little-linguist-final-project.appspot.com',
        apiKey: 'AIzaSyClHNW-GQsXav_8c12wZMlwL1LUDlGh0xU',
        authDomain: 'little-linguist-final-project.firebaseapp.com',
        messagingSenderId: '239516673050',
      })
    ),
    provideFirestore(() => getFirestore()),
  ],
};

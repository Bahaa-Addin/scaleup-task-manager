// @ts-check
import { default as firebase } from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/functions';
import 'firebase/remote-config';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAqWWolDCO2QFpiFprDPUMWXhCF3PAApRU',
  authDomain: 'scaleup-task-manager.firebaseapp.com',
  projectId: 'scaleup-task-manager',
  storageBucket: 'scaleup-task-manager.appspot.com',
  messagingSenderId: '530304162287',
  appId: '1:530304162287:web:b58e72063395b09fa8be1a',
  measurementId: 'G-BBB46HZ9WM'
};
const getFirebaseApp = () => {
  if (firebase.apps.length > 0) {
    return firebase.app();
  } else {
    return firebase.initializeApp(firebaseConfig, 'scaleup-task-manager');
  }
};
/**
 * Firebase SDK application.
 */
export const FirebaseSdkApp = getFirebaseApp();
/* tslint:disable-next-line */
console.log('Firebase App Name:', FirebaseSdkApp.name);
/** Firebase App Auth. */
export const FirebaseAppAuth = FirebaseSdkApp.auth();
/** Firebase App Firestore. */
export const FirebaseAppFirestore = FirebaseSdkApp.firestore();
/** Firebase App Functions. */
export const FirebaseAppFunctions = FirebaseSdkApp.functions();
/** Firebase App Storage. */
export const FirebaseAppStorage = FirebaseSdkApp.storage();

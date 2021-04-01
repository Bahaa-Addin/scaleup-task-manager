import {FirebaseAppAuth} from "../firebase-app";
import {createUser} from "./user.actions";

export async function registerUser(name, position, email, password) {
  const userCredentials = await FirebaseAppAuth.createUserWithEmailAndPassword(email, password);

  if (userCredentials.user) {
    await createUser({
      ID: userCredentials.user.uid,
      EMAIL: userCredentials.user.email,
      NAME: name,
      POSITION: position,
    });

    return userCredentials;
  } else {
    throw new Error('Registration failed.');
  }
}

export async function loginUser(email, password) {
  const userCredentials = await FirebaseAppAuth.signInWithEmailAndPassword(email, password);
  return userCredentials;
}

export async function logoutUser(){
  return FirebaseAppAuth.signOut();
}

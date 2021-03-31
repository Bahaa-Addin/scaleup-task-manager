// @ts-check
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {loginUser, logoutUser, registerUser} from "../../actions/auth.actions";
import {FirebaseAppAuth} from "../../firebase-app";

export default function useAuthContext() {
  return useContext(AuthContext);
}

export function useProvideAuth() {
  const [currentUser, setCurrentUser] = useState(getCurrentUser());

  FirebaseAppAuth.onAuthStateChanged(currentUser =>
    cacheCurrentUser(currentUser, setCurrentUser));

  const signUp= (name, position, email, password) =>{
    return registerUser(name, position, email, password)
      .then(credentials => cacheCurrentUser(credentials.user, setCurrentUser))
  }

  const signIn = (email, password) => {
    return loginUser(email, password)
      .then(credentials => cacheCurrentUser(credentials.user, setCurrentUser))
  };

  const signOut = () => {
    return logoutUser()
      .then(() => cacheCurrentUser(null, setCurrentUser))
  };

  return {
    currentUser,
    signUp,
    signIn,
    signOut
  };
}

function cacheCurrentUser(user, callback = () => {}) {
  localStorage.setItem('user', JSON.stringify(user));
  callback(user);
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem('user'));
}

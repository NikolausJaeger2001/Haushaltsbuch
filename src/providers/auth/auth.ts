import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import fireBaseApp from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';


// this Class handles user management and authentification at the firebase database
@Injectable()
export class AuthProvider {
  constructor(public http: HttpClient) {
  }

  // login function
  loginUser(email: string, password: string): Promise<any> {
    return fireBaseApp.auth().signInWithEmailAndPassword(email,password);
  }

  // logout function
  logoutUser(): Promise<void> {
    const userId: string = fireBaseApp.auth().currentUser.uid;
    fireBaseApp
      .database()
      .ref(`/user/${userId}`)
      .off();
    return fireBaseApp.auth().signOut();
  }

  // creates a new User
  signupUser(email: string, password: string): Promise<any> {
    return fireBaseApp
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(newUserCredential => {
        fireBaseApp
          .database()
          .ref(`/user/${newUserCredential.user.uid}/email`)
          .set(email);
      })
      .catch(error => {
        console.error(error);
        throw new Error(error);
      });
  }

  // resets User Password
  resetPassword(email:string): Promise<void> {
    return fireBaseApp.auth().sendPasswordResetEmail(email);
  }
}

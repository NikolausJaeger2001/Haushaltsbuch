import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import fireBaseApp from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';


/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(public http: HttpClient) {
    console.log('Hello AuthProvider Provider');
  }

  loginUser(email: string, password: string): Promise<any> {
    /*
    const userCredential: Promise<fireBaseApp.auth.UserCredential> = fireBaseApp.auth().signInWithEmailAndPassword(email,password);
    if (userCredential) {
      const userId: string = fireBaseApp.auth().currentUser.uid;;
      fireBaseApp
        .database()
        .ref(`/user/${userId}`)
        .off();
    }
    return userCredential;
    */
    return fireBaseApp.auth().signInWithEmailAndPassword(email,password);
  }


  logoutUser(): Promise<void> {
    const userId: string = fireBaseApp.auth().currentUser.uid;
    fireBaseApp
      .database()
      .ref(`/user/${userId}`)
      .off();
    return fireBaseApp.auth().signOut();
  }

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

  resetPassword(email:string): Promise<void> {
    return fireBaseApp.auth().sendPasswordResetEmail(email);
  }
}

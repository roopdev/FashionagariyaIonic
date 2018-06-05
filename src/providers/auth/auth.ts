import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

import { usercreds } from '../../models/interfaces/usercreds';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

	firedata = firebase.database().ref('/users');

  constructor(public afireAuth: AngularFireAuth) {
    console.log('Hello AuthProvider Provider');
  }

  // ========== Email Auth =========== // 
  emailLogin(credentials: usercreds) {
  	var promise = new Promise((resolve, reject) => {
  		this.afireAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password).then(() => {
  			resolve(true);
  		}).catch((err) => {
  			reject(err);
  		})
  	})
  	return promise;
  }

  emailSignup(newuser: usercreds) {
  	var promise = new Promise((resolve, reject) => {
  		this.afireAuth.auth.createUserWithEmailAndPassword(newuser.email, newuser.password).then(() => {
  			this.afireAuth.auth.currentUser.updateProfile({
  				displayName: newuser.displayName,
  				photoURL: 'https://firebasestorage.googleapis.com/v0/b/basefashionagariyaionic.appspot.com/o/default_user.png?alt=media&token=354d1a00-b87a-48f8-a65d-47b4413d2c5a'
  			}).then(() => {
  				this.firedata.child(this.afireAuth.auth.currentUser.uid).set({
  					uid: this.afireAuth.auth.currentUser.uid,
  					displayName: newuser.displayName,
  					email: this.afireAuth.auth.currentUser.email,
  					photoURL: 'https://firebasestorage.googleapis.com/v0/b/basefashionagariyaionic.appspot.com/o/default_user.png?alt=media&token=354d1a00-b87a-48f8-a65d-47b4413d2c5a'
  				}).then(() => {
  					resolve({ success: true });
  				}).catch((err) => {
  					reject(err);
  				})
  			}).catch((err) => {
  				reject(err);
  			})
  		}).catch((err) => {
  			reject(err);
  		})
  	})
  	return promise;
  }

  // ================== Password reset ============= //
  passwordReset(email) {
  	var promise = new Promise((resolve, reject) => {
  		firebase.auth().sendPasswordResetEmail(email).then(() => {
  			resolve({ success: true });
  		}).catch((err) => {
  			reject(err);
  		})
  	})
  	return promise;
  }



  // =============== Sign Out =============== //
  signOut() {
  	var promise = new Promise((resolve, reject) => {
  		this.afireAuth.auth.signOut().then(() => {
  			resolve({ success: true });
  		}).catch((err) => {
  			reject(err);
  		})
  	})
  	return promise;
  }


}

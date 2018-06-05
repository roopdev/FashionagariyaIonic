import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

	firedata = firebase.database().ref('/users');
  constructor(public afireAuth: AngularFireAuth) {
    console.log('Hello UserProvider Provider');
  }

  // =============== Fetch all user details =============== //
  getAllUsers() {
  	var promise = new Promise((resolve, reject) => {
  		this.firedata.orderByChild('uid').once('value', (snapshot) => {
  			let userdata = snapshot.val();
  			let temparr = [];
  			for (var key in userdata) {
  				temparr.push(userdata[key]);
  			}
  			resolve(temparr);
  		}).catch((err) => {
  			reject(err);
  		})
  	})
  	return promise;
  }

  // =============== Fetch single user details ============= //
  getUserDetails() {
  	var promise = new Promise((resolve, reject) => {
  		this.firedata.child(firebase.auth().currentUser.uid).once('value', (snapshot) => {
  			resolve(snapshot.val());
  		}).catch((err) => {
  			reject(err);
  		})
  	})
  	return promise;
  }

  // =============== Update displayname of the user =========== //
  updateDisplayName(newname) {
  	var promise = new Promise((resolve, reject) => {
  		this.afireAuth.auth.currentUser.updateProfile({
  			displayName: newname,
  			photoURL: this.afireAuth.auth.currentUser.photoURL
  		}).then(() => {
  			this.firedata.child(firebase.auth().currentUser.uid).update({
  				displayName: newname,
  				photoURL: this.afireAuth.auth.currentUser.photoURL,
  				uid: this.afireAuth.auth.currentUser.uid
  			}).then(() => {
  				resolve({ success: true });
  			}).catch((err) => {
  				reject(err);
  			})
  		}).catch((err) => {
  			reject(err);
  		})
  	})
  	return promise;
  }

  // ================ Update profile image of the user =========== //
  updateImage(imageURL) {
  	var promise = new Promise((resolve, reject) => {
  		this.afireAuth.auth.currentUser.updateProfile({
  			displayName: this.afireAuth.auth.currentUser.displayName,
  			photoURL: imageURL
  		}).then(() => {
  			firebase.database().ref('/users/' + firebase.auth().currentUser.uid).update({
  				displayName: this.afireAuth.auth.currentUser.displayName,
  				photURL: imageURL,
  				uid: firebase.auth().currentUser.uid
  			}).then(() => {
  				resolve({ success: true });
  			}).catch((err) => {
  				reject(err);
  			})
  		}).catch((err) => {
  			reject(err);
  		})
  	})
  	return promise;
  }

}

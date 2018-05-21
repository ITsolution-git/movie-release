import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
// Firebase
import * as firebase from 'firebase/app';
// AngularFire
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
// RxJS
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
// Constants
import { DEFAULT_USER_ROLE, DEFAULT_USER_IMG } from '../../../constants';

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  username?: string;
  userStatus?: string; // online, offline, away, dnd, invisible
  accountStatus?: string; // active, pending, disabled
  lastLogin: Date;
  regDate: string;
  role: string;
  metadata?: any;
}

@Injectable()
export class AuthService {

  authState: firebase.User;
  authorChanged = new EventEmitter<boolean>();
  // roleChanged = new EventEmitter<AppRoles>();
  user: Observable<User>;
  returnUrl: string;
  authError: string;
  authMessage: string;
  isLoggedIn: boolean;

  constructor(
    private router: Router,
    public afAuth: AngularFireAuth,
    private afDb: AngularFireDatabase
  ) {

    // Runs When Change Happens in Authorization State (#Runs Twice)
    this.afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        console.log('Logged In as: ', 'Name: ', user.displayName, ' Email: ', user.email, 'UID: ', user.uid);
        this.authState = user;
        this.isLoggedIn = true;
        if (this.returnUrl) {
          this.router.navigateByUrl(this.returnUrl);
        }
        this.authorChanged.emit(true);
      } else {
        console.log('NOT Logged In');
        this.authState = null;
        this.isLoggedIn = false;
        this.authorChanged.emit(false);
      }
    });

    this.resetMessages();

    this.user = this.afAuth.authState
      .switchMap(user => {
        if (user) {
          console.log('User UID: ', user.uid);
          return this.afDb.object('users/' + user.uid).valueChanges();
        } else {
          return Observable.of(null);
        }
      });
    // console.log(this.user)
  }

  googleLogin(): void {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((gUserData) => {
        // console.log(gUserData.user);
        this.registerUserData(null, gUserData.user, null);
      })
      .catch((err) => {
        this.resetMessages();
        this.authError = err.message;
      });
  }

  facebookLogin(): void {
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(fUserData => {
        this.registerUserData(null, null, fUserData.user);
      })
      .catch(err => {
        this.resetMessages();
        this.authError = err.message;
        console.error('Auth Error:', err.message);
      });
  }

  registerUserData(userData: User, gUserData: User, fUserData: any): void {
    // if userData is initialized
    if (userData) {
      this.afDb.object('users/' + userData.uid)
        .set({
          uid: userData.uid,
          email: userData.email,
          photoURL: DEFAULT_USER_IMG,
          role: DEFAULT_USER_ROLE,
          lastLogin: Date.now(),
          regDate: Date.now()
        }
        ).catch((err) => {
          console.log('DB not Updated:', err);
        });
    } else if (fUserData) {
      this.afDb.object('users/' + fUserData.uid)
        .set({
          uid: fUserData.uid,
          email: fUserData.providerData[0].email,
          photoURL: fUserData.providerData[0].photoURL,
          displayName: fUserData.providerData[0].displayName,
          phoneNumber: fUserData.providerData[0].phoneNumber,
          role: DEFAULT_USER_ROLE,
          lastLogin: Date.now(),
          regDate: Date.now()
        }
        ).catch((err) => {
          console.log('DB not Updated:', err);
        });
    }
  }

  updateUserData(userData: User): void {
    // console.log('User Data UID: ', userData.uid);
    this.afDb.object('users/' + userData.uid).update(
      {
        lastLogin: Date.now(),
        status: true
      }
    ).catch((err) => {
      console.log('DB not Updated:', err);
    });
  }

  resetMessages(): void {
    this.authError = '';
    this.authMessage = '';
  }

  logout(): void {
    this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }

}

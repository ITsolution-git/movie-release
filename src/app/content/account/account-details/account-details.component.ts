import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
// Firebase
import * as firebase from 'firebase/app';
// AngularFire
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
// RxJS
import { Observable } from 'rxjs/Observable';
// Constants
import { DB_COL, APP_SEO_NAME } from '../../../constants';
// Services
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent {

  userRef: AngularFireList<any>;
  userObsRef: Observable<{}>;
  userDetails: any;
  favorites: any[];
  ratings: any[];
  reviews: any[];
  settings: any[];
  currentAccountTab: number;
  loading = false;
  errorMessage: string;
  successMessage: string;

  constructor(
    public title: Title,
    public afAuth: AngularFireAuth,
    private afDb: AngularFireDatabase,
    private aus: AuthService
  ) {
    // Set SEO Title
    this.title.setTitle('Account Details - ' + APP_SEO_NAME);

    this.afAuth.authState.subscribe(res => {
      this.userRef = afDb.list(DB_COL.USERS + '/');
      this.userObsRef = afDb.object(DB_COL.USERS + '/' + res.uid).valueChanges();
      this.getUserDetails();
    });
  }

  getUserDetails(): void {
    // console.log('GET USER DETAILS');
    this.userObsRef.subscribe(res => {
      this.userDetails = res;
      if (this.userDetails) {
        this.loading = false;
      }
    });

  }

  updateUserInfo(email, username, displayName, phone, address, gender?): void {
    console.log(email, username);
    // Update User Email In Firebase Authentication Section
    firebase.auth().currentUser.updateEmail(email)
      .then(() => {
        // Update Email & Username in Database
        if (email) {
          this.userRef.update(this.afAuth.auth.currentUser.uid, {
            displayName: displayName,
            email: email,
            username: username,
            phone: phone,
            address: address,
            gender: gender || ''
          })
            .then(() => {
              this.showSuccessMessage('User Details Updated!');
            })
            .catch((err) => {
              this.showErrorMessage('User Details Not Updated!');
              console.log('User Details NOT Updated: ', err);
            });
        } else {
          this.showErrorMessage('User Details Not Updated!');
        }
      })
      .catch((err) => {
        this.showErrorMessage(err.toString());
        console.log('Email NOT Updated: ', err);
      });
  }

  // Messages
  showSuccessMessage(msg: string): void {
    this.errorMessage = '';
    this.successMessage = msg;
    setTimeout(() => {
      this.successMessage = '';
    }, 5000);
  }

  showErrorMessage(msg: string): void {
    this.successMessage = '';
    this.errorMessage = msg;
    setTimeout(() => {
      this.errorMessage = '';
    }, 5000);
  }

}

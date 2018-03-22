import { Component, OnInit } from '@angular/core';
// AngularFire
import { AngularFireAuth } from 'angularfire2/auth';
import {
  AngularFireDatabase,
  AngularFireList
} from 'angularfire2/database';
// RxJS
import { Observable } from 'rxjs/Observable';
// Constants
import { DB_COL } from '../../constants';
import { log } from 'util';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  userObsRef: Observable<{}>;
  userRole: string;

  constructor(
    public afAuth: AngularFireAuth,
    private afDb: AngularFireDatabase,
  ) {
    this.afAuth.authState.subscribe(res => {
      this.userObsRef = afDb.object(DB_COL.USERS + '/' + res.uid).valueChanges();
      this.getUserRole();
    });
  }

  ngOnInit(): void { }

  getUserRole(): void {
    // console.log('GET USER ROLE');
    this.userObsRef.subscribe(res => {
      console.log(res['role']);
      this.userRole = res['role'];
    });
  }

}

import { Injectable } from '@angular/core';
// AngularFire
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
// RxJS
import { Observable } from 'rxjs/Observable';
// Constants
import { DB_COL, APP_SEO_NAME } from '../constants';
@Injectable()
export class AdminService {

  userRole: string;
  userUid: string;

  constructor(
    private afDb: AngularFireDatabase,
    public afAuth: AngularFireAuth
  ) { }

  getUserRole(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      // console.log('GET USER ROLE');
      this.afAuth.authState
        .subscribe(res => {
          this.userUid = res.uid;
          this.afDb.object(DB_COL.USERS + '/' + this.userUid).valueChanges()
            .subscribe(user => {
              console.log(user['role']);
              this.userRole = user['role'];
              resolve(this.userRole);
            });
        });
    });
  }

}

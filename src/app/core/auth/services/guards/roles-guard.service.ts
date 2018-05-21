import { Injectable } from '@angular/core';
// Firebase
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
// Services
import { DB_COL } from '../../../../constants';

@Injectable()
export class RolesGuardService {

  userRef: any;

  constructor(
    public afAuth: AngularFireAuth,
    private afDb: AngularFireDatabase
  ) { }

  canActivate(): Promise<boolean> {
    let result = false;
    const promise: Promise<boolean> = new Promise<boolean>((resolve, reject) => {
      this.afAuth.authState
        .subscribe((authRes) => {
          this.userRef = this.afDb.object(DB_COL.USERS + '/' + authRes.uid).valueChanges();
          this.userRef
            .subscribe(res => {
              if (res.role === 'subscriber') {
                result = false;
              }
              resolve(result);
            });

        });
    });
    return promise;
  }
}

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import * as firebase from 'firebase';
// RxJS
import { Observable } from 'rxjs/Observable';

// Firebase
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

// Services
import { DB_COL } from '../../constants';
import { FirebaseAuth } from '@firebase/auth-types';


@Injectable()
export class RolesGuardService {

  userRef: any;

  constructor(
    private router: Router,
    public afAuth: AngularFireAuth,
    private afDb: AngularFireDatabase
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    let result = false;
    const promise: Promise<boolean> = new Promise<boolean>((resolve, reject) => {
      this.afAuth.authState
        .subscribe((authRes) => {
          this.userRef = this.afDb.object(DB_COL.USERS + '/' + authRes.uid).valueChanges();
          this.userRef
            .subscribe(res => {
              if (res.role === 'subscriber') {
                result = false;
                // this.router.navigate(['/my-account/details']);
              } else if (res.role === 'admin' || res.role === 'editor') {
                result = true;
              }
              resolve(result);
            });

        });
    });
    return promise;
  }
}

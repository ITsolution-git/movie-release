import { Injectable } from '@angular/core';

// Firebase
import * as firebase from 'firebase/app';

// AngularFire
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';

// RxJS
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

// Constants
import { DB_COL } from '../../constants';

@Injectable()
export class UsersService {

  usersRef: AngularFireList<any>;
  users: Observable<any[]>;

  constructor(
    private afDb: AngularFireDatabase,
  ) {
    this.usersRef = this.afDb.list('users');
  }

  getUserItem(userKey: string): AngularFireObject<IUsers> {
    return this.afDb.object(`${DB_COL.USERS}/${userKey}`);
  }

}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
// AngularFire
import { AngularFireDatabase } from 'angularfire2/database';
// Constants
import { DB_COL } from '../../constants';
// Components
import { AuthDialogComponent } from '../../content/shared/auth-dialog/auth-dialog.component';

@Injectable()
export class AppService {

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private router: Router,
    private afDb: AngularFireDatabase
  ) { }

  urlOptimizeText(text: string): Promise<string> {
    // console.log('URL Optimize:', text);
    const noSpecial = text.replace(/\(|\)|\?|\!|\'|\.|\,|\:|\;|\<|\>|\[|\]|\*|\+/g, '');
    const noDouble = noSpecial.replace(/\œ/g, 'oe').replace(/\ᴂ/g, 'ae');
    // console.log('no brachets: ', noSpecial);
    return new Promise<string>((resolves, rejects) => {
      this.removeAccents(noDouble)
        .then(res => {
          // console.log(res);
          const replaceAnd = res.replace(/\&/g, 'and');
          const urlText = replaceAnd.toLowerCase().replace(/[^a-zA-Z0-9-$@]+/gm, '-');
          resolves(urlText);
        });
    });
  }

  removeAccents(p): Promise<string> {
    // console.log('TEXT TO CONVERT: ', p);
    const c = 'áàãâäåéèêëíìîïóòõôöøúùûüçćÁÀÃÂÄÅÉÈÊËÍÌÎÏÓÒÕÖÔÚÙÛÜÇĆ';
    const s = 'aaaaaaeeeeiiiioooooouuuuccAAAAAAEEEEIIIIOOOOOUUUUCC';
    let n = '';
    return new Promise<string>((resolve, reject) => {
      for (let i = 0; i < p.length; i++) {
        if (c.search(p.substr(i, 1)) >= 0) {
          n += s.substr(c.search(p.substr(i, 1)), 1);
        } else {
          n += p.substr(i, 1);
        }
      }
      // console.log('CONVERTED TEXT: ', n);
      resolve(n);
    });
  }

  seoOptimizeText(text: string): string {
    const seoText = text.replace(/-/g, ' ');
    return seoText;
  }
  scrollToTop(): void {
    window.scrollTo(0, 0);
  }

  openLoginDialog(): void {
    let dialogRef = this.dialog.open(AuthDialogComponent, {
      panelClass: 'login-dialog',
      data: 'login',
      height: '100%',
      width: '100%',
      maxWidth: '100%',
      maxHeight: '100%'
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        dialogRef = null;
      });
  }

  goToMovieDetails(movieId: string) {
    // Get the Movie URL by MovieID from firebase movie_results collection
    this.getMovieUrlById(movieId)
      .then(res => {
        console.log(res['url']);
        this.router.navigate([res['url']]);
      });
  }

  getMovieUrlById(movieId: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.afDb.list(`${DB_COL.MOVIES_RESULTS}`, ref => ref.orderByChild('id').equalTo(movieId)).valueChanges()
        .subscribe(res => {
          console.log(res);
          console.log(res[0]);
          console.log(res[0]['url']);
          resolve(res[0]);
        });
    });
  }
}

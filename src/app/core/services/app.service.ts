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
        })
        .catch(error => {
          console.log('There was an error while removing accents froms string! ', error);
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

  // Movie Functions
  goToMovieDetails(movieId: number) {
    // Get the Movie URL by MovieID from firebase movie_results collection
    this.getMovieUrlById(Number(movieId))
      .then(res => {
        this.router.navigate([res['url']]);
      })
      .catch(error => {
        console.log('There was an error while getting the movie URL! ', error);
      });
  }
  goToMovieGenresPage(genre: string): void {
    this.urlOptimizeText(genre)
      .then(res => {
        this.router.navigate(['/movies/genre/' + res]);
      });
  }
  getMovieUrlById(movieId: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.afDb.list(`${DB_COL.MOVIES_RESULTS}`, ref => ref.orderByChild('id').equalTo(movieId)).valueChanges()
        .subscribe(res => {
          resolve(res[0]);
        });
    });
  }

  // Celeb Functions
  goToCelebDetails(celebId: number): void {
    // Get the Celeb URL by CelebID from firebase celebs_results collection
    this.getCelebUrlById(celebId)
      .then(res => {
        this.router.navigate([res['url']]);
      })
      .catch(error => {
        console.log('There was an error while getting the celeb URL! ', error);
      });
  }
  getCelebUrlById(celebId: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.afDb.list(`${DB_COL.CELEBS_RESULTS}`, ref => ref.orderByChild('id').equalTo(celebId)).valueChanges()
        .subscribe(res => {
          resolve(res[0]);
        });
    });
  }
}

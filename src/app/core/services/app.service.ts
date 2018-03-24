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

  urlOptimizeText(text: string): string {
    const urlText = text.toLowerCase().replace(/[^a-zA-Z0-9-$@]+/gm, '-');
    return urlText;
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
    })
  }
}

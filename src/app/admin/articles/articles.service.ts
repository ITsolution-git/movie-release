import { Injectable } from '@angular/core';
// Material
import { MatDialog } from '@angular/material';

// AngularFire
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
// RxJS
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
// Constants
import { DB_COL } from '../../constants';
// Services
import { ApiService } from '../../services/api/api.service';
// Components
import { SelectMovieDialogComponent } from '../articles/select-movie-dialog/select-movie-dialog.component';

@Injectable()
export class ArticlesService {

  searchKeyword: string;
  currentPageIndex: number;
  totalPages: number;
  totalResults: number;
  moviesList: any[] = [];

  articlesRef: Observable<any[]>;
  articles: any[];

  loading = false;

  constructor(
    private afDb: AngularFireDatabase,
    private apis: ApiService,
    private as: ApiService,
    public dialog: MatDialog
  ) {
    // Initialize Articles DB Collection
    this.articlesRef = this.afDb.list(DB_COL.ARTICLES_PUBLIC).valueChanges();
    // Get the List of Articles
    this.getArticles();
  }

  getArticles() {
    this.loading = true;
    this.articlesRef.subscribe(res => {
      this.articles = res;
    });
  }

  searchMoviesByKeyword(keyword: string, pageIndex: number): void {
    this.loading = true;
    this.apis.searchMovieByKeyword(keyword, pageIndex)
      .subscribe((res) => {
        this.currentPageIndex = res['page'];
        this.totalPages = res['total_pages'];
        this.totalResults = res['total_results'];
        this.moviesList = this.moviesList.concat(res['results']);
        if (this.moviesList) {
          this.loading = false;
        }
        console.log(this.moviesList);
      });
  }

  openSelectMovieDialog(): void {
    let dialogRef = this.dialog.open(SelectMovieDialogComponent, {
      panelClass: 'select-movie-dialog',
      height: '90%',
      width: '90%',
      maxWidth: '90%',
      maxHeight: '90%'
    });
    dialogRef.afterClosed()
      .subscribe(() => {
        dialogRef = null;
      });
  }
}

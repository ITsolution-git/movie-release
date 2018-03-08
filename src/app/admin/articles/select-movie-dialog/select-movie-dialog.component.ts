import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataSource } from '@angular/cdk/table';
// Material
import { PageEvent, MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// AngularFire
import { AngularFireAuth } from 'angularfire2/auth';
import {
  AngularFireDatabase,
  AngularFireList
} from 'angularfire2/database';
// RxJS
import { Observable } from 'rxjs/Observable';
// Constant
import { DB_COL, TMDB_IMAGES_BASE_URL, IMG_45 } from '../../../constants';
// Service
import { ArticlesService } from '../articles.service';
import { ApiService } from '../../../services/api/api.service';

@Component({
  selector: 'app-select-movie-dialog',
  templateUrl: './select-movie-dialog.component.html',
  styleUrls: ['./select-movie-dialog.component.css']
})
export class SelectMovieDialogComponent implements OnInit {

  displayedSearchMovieResultColumns = [
    'movie-poster',
    'movie-title',
    'release-date'
  ];
  movieResultslesDataSource: MatTableDataSource<any> | null;
  @ViewChild(MatPaginator) searchMovieResultsPaginator: MatPaginator;
  @ViewChild(MatSort) searchMovieResultsSort: MatSort;

  TMDB_IMAGES_BASE_URL: any;
  IMG_45: any;

  searchMovieResults: any[];

  articlesRef: AngularFireList<any>;

  isLooading: boolean;

  constructor(
    private afDb: AngularFireDatabase,
    public dialogRef: MatDialogRef<SelectMovieDialogComponent>,
    private router: Router,
    private apis: ApiService,
    private afAuth: AngularFireAuth,
    // @Inject(MAT_DIALOG_DATA) public articleID: string
  ) {
    // Initialize Constants
    this.TMDB_IMAGES_BASE_URL = TMDB_IMAGES_BASE_URL;
    this.IMG_45 = IMG_45;
    // Initialize Articles Database Collection
    this.articlesRef = afDb.list(DB_COL.ARTICLES);
  }

  ngOnInit(): void { }

  searchForMovie(keyword: string) {
    this.isLooading = true;
    this.apis.searchMovieByKeyword(keyword, 1)
      .subscribe(res => {
        this.searchMovieResults = res['results'];
        this.movieResultslesDataSource = new MatTableDataSource(res['results']);
        this.movieResultslesDataSource.sort = this.searchMovieResultsSort;
        this.movieResultslesDataSource.paginator = this.searchMovieResultsPaginator;
        this.isLooading = false;
      });
  }

  selectMovie(movieId: string, movieTitle: string) {
    const uid = this.afAuth.auth.currentUser.uid;
    const email = this.afAuth.auth.currentUser.email;
    // Create database entry for the new article
    this.articlesRef.push({
      article_movie_id: movieId,
      article_movie_title: movieTitle,
      article_owner_id: uid,
      article_owner_name: email,
      article_status: 'draft',
      article_date: Date.now()
    }).then(res => {
      this.articlesRef.update(res.key, {
        article_key: res.key,
      }).then(() => {
        this.dialogRef.close();
        this.router.navigate(['admin/articles/edit-article/' + res.key]);
      });
    });
  }

  // applyMovieFilter(filterValue: string) {
  //   filterValue = filterValue.trim();
  //   filterValue = filterValue.toLowerCase();
  //   this.movieResultslesDataSource.filter = filterValue;
  // }

}

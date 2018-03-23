import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Meta, Title } from '@angular/platform-browser';
// AngularFire
import { AngularFireAuth } from 'angularfire2/auth';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject
} from 'angularfire2/database';
// RxJS
import { Observable } from 'rxjs/Observable';
// Constants
import { TMDB_IMAGES_BASE_URL, IMG_92, IMG_45, DB_COL, APP_SEO_NAME } from '../../../constants';
// Services
import { AppService } from '../../../core/services/app.service';
import { log } from 'util';

@Component({
  selector: 'app-account-ratings',
  templateUrl: './account-ratings.component.html',
  styleUrls: ['./account-ratings.component.css']
})
export class AccountRatingsComponent implements OnInit {

  TMDB_IMAGES_BASE_URL: any;
  IMG_45: any;
  IMG_92: any;

  movieRatingsObsRef: Observable<{}[]>;
  movieRatingsRef: AngularFireList<any>;
  userMovieRatingsRef: AngularFireList<any>;

  tvShowRatingsObsRef: Observable<{}[]>;
  tvShowRatingsRef: AngularFireList<any>;
  userTvShowRatingsRef: AngularFireList<any>;

  loading = false;

  movieRatingsColumns = ['movieImg', 'movieTitle', 'movieRating', 'removeMovieRating'];
  movieRatingsSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) movieRatingsPaginator: MatPaginator;
  @ViewChild(MatSort) movieRatingsSort: MatSort;

  tvShowRatingsColumns = ['tvImg', 'tvTitle', 'tvRating', 'removeTvRating'];
  tvShowRatingsSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) tvShowRatingsPaginator: MatPaginator;
  @ViewChild(MatSort) tvShowRatingsSort: MatSort;

  constructor(
    public title: Title,
    public meta: Meta,
    private afDb: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private as: AppService
  ) {
    // Set SEO Title & remove Description & Keywords (This Page Does Not Need to be Indexed)
    this.title.setTitle('My Ratings - ' + APP_SEO_NAME);
    this.meta.removeTag('name = "description"');
    this.meta.removeTag('name = "keywords"');

    // Initialize Constants
    this.TMDB_IMAGES_BASE_URL = TMDB_IMAGES_BASE_URL;
    this.IMG_45 = IMG_45;
    this.IMG_92 = IMG_92;

    this.afAuth.authState.subscribe(res => {
      // Movie DB References
      this.movieRatingsObsRef = this.afDb.list(DB_COL.USERS + '/' + res.uid + '/movie_ratings').valueChanges();
      this.userMovieRatingsRef = this.afDb.list(DB_COL.USERS + '/' + res.uid + '/movie_ratings');
      this.getUserMovieRatings();
      // TV Shows DB References
      this.tvShowRatingsObsRef = this.afDb.list(DB_COL.USERS + '/' + res.uid + '/tv_show_ratings').valueChanges();
      this.userTvShowRatingsRef = this.afDb.list(DB_COL.USERS + '/' + res.uid + '/tv_show_ratings');
      this.getUserTvShowRatings();
    });
  }

  ngOnInit(): void { }

  getUserMovieRatings(): void {
    this.loading = true;
    this.movieRatingsObsRef
      .subscribe(res => {
        this.movieRatingsSource = new MatTableDataSource(res);
        this.movieRatingsSource.sort = this.movieRatingsSort;
        if (this.movieRatingsSource) {
          this.loading = false;
        }
      });
  }

  getUserTvShowRatings(): void {
    this.loading = true;
    this.tvShowRatingsObsRef
      .subscribe(res => {
        this.tvShowRatingsSource = new MatTableDataSource(res);
        // console.log('TV SHOWS RATING SOURCE: ', this.tvShowRatingsSource);
        this.tvShowRatingsSource.sort = this.tvShowRatingsSort;
        if (this.tvShowRatingsSource) {
          this.loading = false;
        }
      });
  }

  rateMovie(rating: number, id: string, title: string, poster: string) {
    // console.log('Rate Movie', rating);
    this.movieRatingsRef = this.afDb.list(DB_COL.MOVIE_RATINGS + '/' + id);
    this.movieRatingsRef.update(this.afAuth.auth.currentUser.uid, {
      rating: rating
    }).then(() => {
      this.userMovieRatingsRef.update(id, {
        id: id,
        title: title,
        poster: poster,
        rating: rating
      })
        .catch(err => console.log(err, 'You do not have access!'));
    })
      .catch(err => console.log(err, 'You do not have access!'));
  }

  removeMovieRating(movieId: number) {
    // console.log(movieId);
    this.afAuth.authState.subscribe(res => {
      this.movieRatingsRef = this.afDb.list(DB_COL.MOVIE_RATINGS + '/' + movieId + '/' + res.uid);
      this.movieRatingsRef.remove()
        .then(() => {
          this.afAuth.authState.subscribe(userRes => {
            this.afDb.list(DB_COL.USERS + '/' + userRes.uid + '/movie_ratings/' + movieId).remove();
            // console.log('Rating Removed!');
          });
        })
        .catch(error => {
          console.log(error);
        });
    });
  }

}

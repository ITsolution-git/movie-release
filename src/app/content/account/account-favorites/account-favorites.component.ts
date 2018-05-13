import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
// AngularFire
import { AngularFireAuth } from 'angularfire2/auth';
import {
  AngularFireDatabase,
  AngularFireList
} from 'angularfire2/database';
// RxJS
import { Observable } from 'rxjs/Observable';
// Constants
import { TMDB_IMAGES_BASE_URL, IMG_185, APP_SEO_NAME, DB_COL } from '../../../constants';
// Services
import { AppService } from '../../../core/services/app.service';
@Component({
  selector: 'app-account-favorites',
  templateUrl: './account-favorites.component.html',
  styleUrls: ['./account-favorites.component.css']
})
export class AccountFavoritesComponent implements OnInit {

  TMDB_IMAGES_BASE_URL: any;
  IMG_185: any;

  favMoviesRef: AngularFireList<any>;
  favMoviesObsRef: Observable<{}[]>;
  favoriteMovies: any[];
  favTvShowsRef: AngularFireList<any>;
  favTvShowsObsRef: Observable<{}[]>;
  favoriteTvShows: any[];
  favCelebsRef: AngularFireList<any>;
  favCelebsObsRef: Observable<{}[]>;
  favoriteCelebs: any[];

  currentFavTab: number;
  loading = false;

  constructor(
    public title: Title,
    public meta: Meta,
    private afDb: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    public as: AppService
  ) {
    // Set SEO Title & remove Description & Keywords (This Page Does Not Need to be Indexed)
    this.title.setTitle('Favorite Movies and TV Shows - ' + APP_SEO_NAME);
    this.meta.removeTag('name = "description"');
    this.meta.removeTag('name = "keywords"');

    this.resetTab(0);
    // Initialize Constants
    this.TMDB_IMAGES_BASE_URL = TMDB_IMAGES_BASE_URL;
    this.IMG_185 = IMG_185;
    // Initialize Databse Collections References
    this.afAuth.authState.subscribe(res => {
      if (res){
        this.favMoviesRef = this.afDb.list(DB_COL.USERS + '/' + res.uid + '/fav_movies');
        this.favMoviesObsRef = this.afDb.list(DB_COL.USERS + '/' + res.uid + '/fav_movies').valueChanges();
        this.favTvShowsRef = this.afDb.list(DB_COL.USERS + '/' + res.uid + '/fav_tv_shows');
        this.favTvShowsObsRef = this.afDb.list(DB_COL.USERS + '/' + res.uid + '/fav_tv_shows').valueChanges();
        this.favCelebsRef = this.afDb.list(DB_COL.USERS + '/' + res.uid + '/fav_celebs');
        this.favCelebsObsRef = this.afDb.list(DB_COL.USERS + '/' + res.uid + '/fav_celebs').valueChanges();
      }
      this.getFavoriteMovies();
    });
  }

  ngOnInit(): void { }

  getFavoriteMovies(): void {
    this.loading = true;
    // console.log('GET FAVORITE MOVIES');
    this.favMoviesObsRef
      .subscribe(res => {
        console.log(res);
        this.favoriteMovies = res;
        if (this.favoriteMovies) {
          this.loading = false;
        }
      });
  }

  onFavTabChange($event): void {
    // console.log('TAB CHANGED TO: ', $event.index);
    this.currentFavTab = $event.index;
    if (this.currentFavTab === 0 && !this.favoriteMovies) {
      this.loading = true;
      this.getFavoriteMovies();
    }
  }

  resetTab(i: number): void {
    this.currentFavTab = i;
  }

  removeFromFavorites(type: string, id: string): void {
    if (type === 'movie') {
      this.favMoviesRef.remove(id)
        .then(() => {
          console.log('Removed' + type + 'from favorites!');
        })
        .catch(error => {
          console.log(error);
        });
    } else if (type === 'tv-show') {
      this.favTvShowsRef.remove(id)
        .then(() => {
          console.log('Removed' + type + 'from favorites!');
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

}

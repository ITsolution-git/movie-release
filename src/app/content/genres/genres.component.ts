import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
// AngularFire
import { AngularFireDatabase } from 'angularfire2/database';
// RxJS
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
// Services
import { AppService } from '../../core/services/app.service';
import { ApiService } from '../../core/services/api/api.service';
import { SeoService } from '../../core/services/seo/seo.service';
// Constants
import { TMDB_IMAGES_BASE_URL, IMG_185, APP_SEO_NAME, DB_COL, APP_BASE_URL, DEFAULT_FB_CAT_IMG } from '../../constants';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {

  seoMetaDetailsObsRef: Observable<any>;
  pageSeoTitle: string;
  pageSeoDescr: string;
  pageSeoKeywords: string;

  TMDB_IMAGES_BASE_URL: any;
  IMG_185: any;

  routeParamsSubscription: Subscription;
  pageKey: string;
  genreType: string;
  genreId: string;
  movieGenresList: any[];

  moviesList: any[];
  currentPageIndex: number;
  totalResults: number;
  totalPages: number;

  loading = false;
  loadingMore = false;

  constructor(
    public meta: Meta,
    public title: Title,
    private afDb: AngularFireDatabase,
    private router: Router,
    public as: AppService,
    private apis: ApiService,
    private ar: ActivatedRoute,
    private seoS: SeoService
  ) {

    // Initialize Constants
    this.TMDB_IMAGES_BASE_URL = TMDB_IMAGES_BASE_URL;
    this.IMG_185 = IMG_185;

    // Get the current genre name from the URL
    this.routeParamsSubscription = this.ar.url
      .subscribe(
        params => {
          // Scroll To Top
          this.as.scrollToTop();
          this.genreType = params[0].path;
          this.pageKey = params[2].path;

          // console.log(this.genreType);
          // console.log(this.pageKey);

          if (this.genreType === 'movies') {
            this.moviesList = [];

            this.getMovieGenres()
              .then(() => {
                this.seoMetaDetailsObsRef = afDb.object(DB_COL.SETTINGS_SEO_GENRE_MOVIES).valueChanges();
                this.seoMetaDetailsObsRef
                  .subscribe(res => {
                    this.as.urlOptimizeText(this.pageKey)
                      .then(key => {
                        const dbKey = 'genre_' + key.replace('-', '_') + '_movies';
                        this.pageSeoTitle = res[dbKey].title;
                        this.pageSeoDescr = res[dbKey].descr;
                        this.pageSeoKeywords = this.pageSeoTitle + ',' + this.as.seoOptimizeText(this.genreType);
                        seoS.setSeoMetaTags(this.pageSeoTitle, this.pageSeoDescr, this.pageSeoKeywords);
                        // tslint:disable-next-line:max-line-length
                        seoS.setFacebookMetaTags(this.pageSeoTitle, APP_BASE_URL + '/movies/genre/' + this.pageKey, this.pageSeoDescr, DEFAULT_FB_CAT_IMG);
                      })
                      .catch(error => {
                        console.log('There was an error while URL Optimizing the text.', error);
                      });
                  });
                this.getMovieGenreId(this.pageKey);
              })
              .catch(error => {
                console.log('There was an error while getting the Movie Genres! ', error);
              });
          }
        });
  }

  ngOnInit(): void { }

  // Movies Functions
  getMovieGenres(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apis.getMovieGenres()
        .subscribe((res) => {
          this.movieGenresList = res['genres'];
          resolve();
        });
    });
  }

  getMovieGenreId(genreName: string): void {
    this.apis.getMovieGenreIdByGenreName(genreName)
      .then((res) => {
        this.genreId = res;
        // console.log(this.genreId);
        if (this.genreId) {
          this.getMoviesByGenre(1);
        }
      })
      .catch(error => {
        console.log('There was an error while getting the genre ID by Genre Name! ', error);
      });
  }

  getMoviesByGenre(pageIndex: number): void {
    this.loading = true;
    this.apis.getMoviesByGenre(this.genreId, this.pageKey, pageIndex)
      .subscribe((res) => {
        this.currentPageIndex = res['page'];
        this.totalPages = res['total_pages'];
        this.totalResults = res['total_results'];
        this.moviesList = this.moviesList.concat(res['results']);
        if (this.moviesList) {
          this.loading = false;
        }
      });
  }

  // Load More Results
  loadMoreResults(pageIndex: number) {
    // console.log(pageIndex);
    this.loadingMore = true;
    if (this.genreType === 'movies') {
      this.apis.getMoviesByGenre(this.genreId, this.pageKey, pageIndex)
        .subscribe((res) => {
          this.currentPageIndex = res['page'];
          this.moviesList = this.moviesList.concat(res['results']);
          if (this.moviesList) {
            this.loadingMore = false;
          }
          // console.log(this.moviesList);
        });
    }
  }

}

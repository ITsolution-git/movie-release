import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
// AngularFire
import { AngularFireDatabase } from 'angularfire2/database';
// RxJS
import { Observable } from 'rxjs/Observable';
// Services
import { AppService } from '../../core/services/app.service';
import { ApiService } from '../../core/services/api/api.service';
import { SeoService } from '../../core/services/seo/seo.service';
// Constants
import { TMDB_IMAGES_BASE_URL, IMG_300, APP_SEO_NAME, DB_COL, APP_BASE_URL, DEFAULT_FB_CAT_IMG } from '../../constants';

@Component({
  selector: 'app-main-movies-directory',
  templateUrl: './main-movies-directory.component.html',
  styleUrls: ['./main-movies-directory.component.css']
})
export class MainMoviesDirectoryComponent implements OnInit {

  seoMetaDetailsObsRef: Observable<any>;
  pageSeoTitle: string;
  pageSeoDescr: string;
  pageSeoKeywords: string;

  TMDB_IMAGES_BASE_URL: any;
  IMG_300: any;

  screenSize: number;

  mainDirectoryMovies: any[];
  mainDirectoryCurrentIndex: number;
  mainDirectoryTotalResults: number;
  mainDirectoryTotalPages: number;

  loading = false;
  loadingMore = false;

  constructor(
    public meta: Meta,
    public title: Title,
    private afDb: AngularFireDatabase,
    public as: AppService,
    private apis: ApiService,
    private seoS: SeoService
  ) {
    // Set SEO Meta Tags
    this.seoMetaDetailsObsRef = afDb.object(DB_COL.SETTINGS_SEO_MOVIES).valueChanges();
    this.seoMetaDetailsObsRef
      .subscribe(res => {
        this.pageSeoTitle = res._movies_main.title;
        this.pageSeoDescr = res._movies_main.descr;
        this.pageSeoKeywords = 'movies, movie directory, movie filter';
        seoS.setSeoMetaTags(this.pageSeoTitle, this.pageSeoDescr, this.pageSeoKeywords);
        // tslint:disable-next-line:max-line-length
        seoS.setFacebookMetaTags(this.pageSeoTitle, APP_BASE_URL + '/movies', this.pageSeoDescr, DEFAULT_FB_CAT_IMG);
      });

    // Initialize Constants
    this.TMDB_IMAGES_BASE_URL = TMDB_IMAGES_BASE_URL;
    this.IMG_300 = IMG_300;

    if (!this.apis.mainDirectoryMovies.length) {
      this.getMoviesForMainDirectory(1);
    } else {
      this.mainDirectoryMovies = this.apis.mainDirectoryMovies;
      this.mainDirectoryCurrentIndex = this.apis.mainDirectoryMoviesLastIndex;
      this.mainDirectoryTotalPages = this.apis.mainDirectoryMoviesTotalPages;
      this.mainDirectoryTotalResults = this.apis.mainDirectoryMoviesTotalResults;
    }
  }

  ngOnInit(): void { }

  // Get movies for homepage from service
  getMoviesForMainDirectory(pageIndex: number): void {
    this.loading = true;
    this.apis.getMoviesForMainDirectory(pageIndex)
      .subscribe((res) => {
        this.mainDirectoryMovies = res['results'];
        this.mainDirectoryCurrentIndex = res['page'];
        this.mainDirectoryTotalPages = res['total_pages'];
        this.mainDirectoryTotalResults = res['total_results'];
        if (this.mainDirectoryMovies) {
          this.loading = false;
        }
        // console.log(this.mainDirectoryMovies);
      });
  }

  loadMoreResults(pageIndex: number): void {
    this.loadingMore = true;
    this.apis.getMoviesForMainDirectory(pageIndex)
      .subscribe((res) => {
        this.mainDirectoryCurrentIndex = res['page'];
        this.mainDirectoryMovies = this.mainDirectoryMovies.concat(res['results']);
        if (this.mainDirectoryMovies) {
          this.loadingMore = false;
        }
        // console.log(this.mainDirectoryMovies);
      });
  }

}

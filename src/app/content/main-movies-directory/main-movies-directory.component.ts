import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validator } from '@angular/forms';
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

interface ISortTypes {
  name: string;
  index: string;
}

@Component({
  selector: 'app-main-movies-directory',
  templateUrl: './main-movies-directory.component.html',
  styleUrls: ['./main-movies-directory.component.css']
})
export class MainMoviesDirectoryComponent implements OnInit {

  sortTypes = [
    {
      name: 'Release Date Ascending',
      param: 'release_date.asc'
    },
    {
      name: 'Release Date Descending',
      param: 'release_date.desc'
    },
    {
      name: 'Primary Release Date Ascending',
      param: 'primary_release_date.asc'
    },
    {
      name: 'Primary Release Date Descending',
      param: 'primary_release_date.desc'
    },
    {
      name: 'Revenue Ascending',
      param: 'revenue.asc'
    },
    {
      name: 'Revenue Descending',
      param: 'revenue.desc'
    },
    {
      name: 'Popularity Ascending',
      param: 'popularity.asc'
    },
    {
      name: 'Popularity Descending',
      param: 'popularity.desc'
    },
    {
      name: 'Vote Average Ascending',
      param: 'vote_average.asc'
    },
    {
      name: 'Vote Average Descending',
      param: 'vote_average.desc'
    },
    {
      name: 'Vote Count Ascending',
      param: 'vote_count.asc'
    },
    {
      name: 'Vote Count Descending',
      param: 'vote_count.desc'
    },
    {
      name: 'Original Title Ascending',
      param: 'original_title.asc'
    },
    {
      name: 'Original Title Descending',
      param: 'original_title.desc'
    }
  ];
  
  defaultValue = this.sortTypes[1].param;

  advancedFilteringForm: FormGroup;
  currentSortType: string;

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
    private seoS: SeoService,
    private fb: FormBuilder
  ) {

    this.advancedFilteringForm = fb.group({
      releaseDateSort: '',
    });
    this.currentSortType = this.sortTypes[1].param;
    console.log(this.currentSortType);

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
      this.getMoviesForMainDirectory(1, this.currentSortType);
    } else {
      this.mainDirectoryMovies = this.apis.mainDirectoryMovies;
      this.mainDirectoryCurrentIndex = this.apis.mainDirectoryMoviesLastIndex;
      this.mainDirectoryTotalPages = this.apis.mainDirectoryMoviesTotalPages;
      this.mainDirectoryTotalResults = this.apis.mainDirectoryMoviesTotalResults;
    }
  }

  ngOnInit(): void { }

  onSortTypeChange(type: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.currentSortType = type;
      console.log('SORT BY', type);
      this.getMoviesForMainDirectory(1, type);
      resolve();
    });
  }

  // Get movies for homepage from service
  getMoviesForMainDirectory(pageIndex: number, sortType: string): void {
    console.log(sortType);
    this.loading = true;
    this.apis.getMoviesForMainDirectory(pageIndex, sortType)
      .subscribe((res) => {
        this.mainDirectoryMovies = res['results'];
        this.mainDirectoryCurrentIndex = res['page'];
        this.mainDirectoryTotalPages = res['total_pages'];
        this.mainDirectoryTotalResults = res['total_results'];
        if (this.mainDirectoryMovies &&
          this.mainDirectoryCurrentIndex &&
          this.mainDirectoryTotalPages &&
          this.mainDirectoryTotalResults) {
          this.loading = false;
        }
        // console.log(this.mainDirectoryMovies);
      });
  }

  loadMoreResults(pageIndex: number): void {
    this.loadingMore = true;
    this.apis.getMoviesForMainDirectory(pageIndex, this.currentSortType)
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

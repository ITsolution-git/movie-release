import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
// AngularFire
import { AngularFireDatabase } from 'angularfire2/database';
// RxJS
import { Observable } from 'rxjs/Observable';
// Services
import { AppService } from '../../core/services/app.service';
import { ApiService } from '../../core/services/api/api.service';
// Constants
import { TMDB_IMAGES_BASE_URL, IMG_300, APP_SEO_NAME, DB_COL } from '../../constants';

@Component({
  selector: 'app-main-movies-directory',
  templateUrl: './main-movies-directory.component.html',
  styleUrls: ['./main-movies-directory.component.css']
})
export class MainMoviesDirectoryComponent implements OnInit {

  seoMetaDetailsObsRef: Observable<any>;
  pageSeoTitle: string;
  pageSeoDescr: string;

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
    private apis: ApiService
  ) {
    this.seoMetaDetailsObsRef = afDb.object(DB_COL.SETTINGS_SEO_MOVIES).valueChanges();
    this.seoMetaDetailsObsRef
      .subscribe(res => {
        this.pageSeoTitle = res._movies_main.title;
        this.pageSeoDescr = res._movies_main.descr;
        this.setSEOMetaTags(this.pageSeoTitle, this.pageSeoDescr);
      });

    // Initialize Constants
    this.TMDB_IMAGES_BASE_URL = TMDB_IMAGES_BASE_URL;
    this.IMG_300 = IMG_300;
    // Calls the function that gets the list of movies and tv shows for the sliders

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

  setSEOMetaTags(title: string, description: string): void {    // Set SEO Title, Keywords and Description Meta tags
    this.title.setTitle(title + ' | ' + APP_SEO_NAME);
    this.meta
      .updateTag(
        {
          name: 'description',
          content: description + ' | ' + APP_SEO_NAME
        }
      );
    this.meta.updateTag(
      { name: 'keywords', content: 'movies, tv shows, celebrities, production companies, cinema tickets, actors, actresses' },
    );
  }
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
        console.log(this.mainDirectoryMovies);
      });
  }

}

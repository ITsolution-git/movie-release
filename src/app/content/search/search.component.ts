import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
// RxJS
import { Subscription } from 'rxjs/Subscription';
// Services
import { AppService } from '../../core/services/app.service';
import { ApiService } from '../../core/services/api/api.service';
// Constants
import { TMDB_IMAGES_BASE_URL, IMG_185, APP_SEO_NAME } from '../../constants';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  TMDB_IMAGES_BASE_URL: any;
  IMG_185: any;

  routeParamsSubscription: Subscription;
  searchType: string;
  pageTitle: string;
  pageKey: string;

  moviesList: any[] = [];

  currentPageIndex: number;
  totalResults: number;
  totalPages: number;

  loading = false;
  loadingMore = false;

  constructor(
    public meta: Meta,
    public title: Title,
    private router: Router,
    public as: AppService,
    private apis: ApiService,
    private ar: ActivatedRoute
  ) {
    // Initialize Constants
    this.TMDB_IMAGES_BASE_URL = TMDB_IMAGES_BASE_URL;
    this.IMG_185 = IMG_185;

    // Get the genre name from the URL
    this.routeParamsSubscription = this.ar.url
      .subscribe((params) => {
        this.searchType = params[1].path;
        this.pageKey = params[2].path;
        this.pageTitle = this.as.seoOptimizeText(this.pageKey);
        if (this.searchType === 'movies') {
          this.setSEOMetaTags();
          this.moviesList = [];
          this.searchMoviesByKeyword(1);
        }
      });
  }

  ngOnInit(): void { }

  setSEOMetaTags(): void {
    // Set SEO Title, Keywords and Description Meta tags
    this.title.setTitle(this.pageTitle + ' - ' + this.as.seoOptimizeText(this.searchType) + ' | ' + APP_SEO_NAME + ' search');
    this.meta.updateTag(
      { name: 'description', content: this.pageTitle + ' ' + this.as.seoOptimizeText(this.searchType) + ' ' + APP_SEO_NAME }
    );
    this.meta.updateTag(
      { name: 'keywords', content: this.pageTitle + ',' + this.as.seoOptimizeText(this.searchType) + ', search page' },
    );
  }

  searchMoviesByKeyword(pageIndex: number): void {
    this.loading = true;
    this.apis.searchMovieByKeyword(this.pageKey, pageIndex)
      .subscribe((res) => {
        this.currentPageIndex = res['page'];
        this.totalPages = res['total_pages'];
        this.totalResults = res['total_results'];
        this.moviesList = this.moviesList.concat(res['results']);
        if (this.moviesList) {
          this.loading = false;
        }
        // console.log(this.moviesList);
      });
  }

  loadMoreResults(pageIndex: number) {
    this.loadingMore = true;
    if (this.searchType === 'movies') {
      this.apis.searchMovieByKeyword(this.pageKey, pageIndex)
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

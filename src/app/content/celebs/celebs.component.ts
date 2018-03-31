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
  selector: 'app-celebs',
  templateUrl: './celebs.component.html',
  styleUrls: ['./celebs.component.css']
})
export class CelebsComponent implements OnInit {

  TMDB_IMAGES_BASE_URL: any;
  IMG_185: any;

  popularActors: any[];
  currentPageIndex: number;
  totalResults: number;
  totalPages: number;
  loading = false;
  loadingMore = false;

  constructor(
    public meta: Meta,
    public title: Title,
    private router: Router,
    private apis: ApiService,
    private as: AppService
  ) {
    // Set SEO Title, Keywords and Description Meta tags
    this.title.setTitle('Most Popular Actors and Actresses - ' + APP_SEO_NAME);
    this.meta.updateTag(
      { name: 'description', content: 'Most Popular Actors and Actresses ' + APP_SEO_NAME }
    );
    this.meta.updateTag(
      { name: 'keywords', content: 'celebrities, actors, actresses, persons, most popular' },
    );

    // Initialize Constants
    this.TMDB_IMAGES_BASE_URL = TMDB_IMAGES_BASE_URL;
    this.IMG_185 = IMG_185;

    // this.popularActors = [];
    if (!this.apis.personsPopular.length) {
      this.getPopularActors(1);
    } else {
      this.popularActors = this.apis.personsPopular;
      this.currentPageIndex = this.apis.personsPopularLastIndex;
      this.totalPages = this.apis.personsPopularTotalPages;
      this.totalResults = this.apis.personsPopularTotalResults;
      if (this.popularActors) {
        this.loading = false;
      }
    }
  }

  ngOnInit(): void { }

  getPopularActors(pageIndex: number): void {
    this.loading = true;
    this.apis.getPopularActors(pageIndex)
      .subscribe((res) => {
        this.popularActors = res['results'];
        this.currentPageIndex = res['page'];
        this.totalPages = res['total_pages'];
        this.totalResults = res['total_results'];
        if (this.popularActors) {
          this.loading = false;
        }
        // console.log(this.popularTvShows);
      });
  }

  loadMoreResults(pageIndex: number): void {
    this.loadingMore = true;
    this.apis.getPopularActors(pageIndex)
      .subscribe((res) => {
        this.currentPageIndex = res['page'];
        this.popularActors = this.popularActors.concat(res['results']);
        if (this.popularActors) {
          this.loadingMore = false;
        }
        console.log(this.popularActors);
      });
  }

}

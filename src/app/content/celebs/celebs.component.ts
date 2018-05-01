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
import { TMDB_IMAGES_BASE_URL, IMG_185, APP_SEO_NAME, DB_COL, DEFAULT_FB_CAT_IMG, APP_BASE_URL } from '../../constants';

@Component({
  selector: 'app-celebs',
  templateUrl: './celebs.component.html',
  styleUrls: ['./celebs.component.css']
})
export class CelebsComponent implements OnInit {

  seoMetaDetailsObsRef: Observable<any>;
  pageSeoTitle: string;
  pageSeoDescr: string;
  pageSeoKeywords: string;

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
    private afDb: AngularFireDatabase,
    private router: Router,
    private apis: ApiService,
    public as: AppService,
    private seoS: SeoService
  ) {
    this.seoMetaDetailsObsRef = afDb.object(DB_COL.SETTINGS_SEO_CELEBS).valueChanges();
    this.seoMetaDetailsObsRef
      .subscribe(res => {
        this.pageSeoTitle = res._celebs_main.title;
        this.pageSeoDescr = res._celebs_main.descr;
        this.pageSeoKeywords = this.pageSeoTitle + ', celebrities, actors, actresses, persons, most popular';
        seoS.setSeoMetaTags(this.pageSeoTitle, this.pageSeoDescr, this.pageSeoKeywords);
        seoS.setFacebookMetaTags(this.pageSeoTitle, APP_BASE_URL + '/celebrities', this.pageSeoDescr, DEFAULT_FB_CAT_IMG);
      });

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

  ngOnInit(): void {
    this.as.scrollToTop();
  }

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
        // console.log(this.popularActors);
      });
  }

}

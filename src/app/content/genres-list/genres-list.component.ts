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
import { APP_SEO_NAME, DB_COL, APP_BASE_URL, DEFAULT_FB_CAT_IMG } from '../../constants';

@Component({
  selector: 'app-genres-list',
  templateUrl: './genres-list.component.html',
  styleUrls: ['./genres-list.component.css']
})
export class GenresListComponent implements OnInit {

  seoMetaDetailsObsRef: Observable<any>;
  pageSeoTitle: string;
  pageSeoDescr: string;
  pageSeoKeywords: string;

  genresList: any[];

  constructor(
    public meta: Meta,
    public title: Title,
    private apis: ApiService,
    private afDb: AngularFireDatabase,
    private as: AppService,
    private seoS: SeoService
  ) {
    // Set SEO Meta Tags
    this.seoMetaDetailsObsRef = afDb.object(DB_COL.SETTINGS_SEO_GENRE_MOVIES).valueChanges();
    this.seoMetaDetailsObsRef
      .subscribe(res => {
        this.pageSeoTitle = res._genres_main.title;
        this.pageSeoDescr = res._genres_main.descr;
        this.pageSeoKeywords = 'movie genres, genres';
        seoS.setSeoMetaTags(this.pageSeoTitle, this.pageSeoDescr, this.pageSeoKeywords);
        // tslint:disable-next-line:max-line-length
        seoS.setFacebookMetaTags(this.pageSeoTitle, APP_BASE_URL + '/movies/genres', this.pageSeoDescr, DEFAULT_FB_CAT_IMG);
      });
    // Get Movie Genres
    this.apis.getMovieGenres()
      .subscribe(res => {
        this.genresList = res['genres'];
      });
  }

  ngOnInit(): void {
    this.as.scrollToTop();
  }

}

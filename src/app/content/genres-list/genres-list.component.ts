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
import { APP_SEO_NAME, DB_COL } from '../../constants';

@Component({
  selector: 'app-genres-list',
  templateUrl: './genres-list.component.html',
  styleUrls: ['./genres-list.component.css']
})
export class GenresListComponent implements OnInit {

  seoMetaDetailsObsRef: Observable<any>;
  pageSeoTitle: string;
  pageSeoDescr: string;

  genresList: any[];

  constructor(
    public meta: Meta,
    public title: Title,
    private apis: ApiService,
    private afDb: AngularFireDatabase,
    private as: AppService
  ) {
    this.seoMetaDetailsObsRef = afDb.object(DB_COL.SETTINGS_SEO_GENRE_MOVIES).valueChanges();
    this.seoMetaDetailsObsRef
      .subscribe(res => {
        this.pageSeoTitle = res._genres_main.title;
        this.pageSeoDescr = res._genres_main.descr;
        this.setSEOMetaTags(this.pageSeoTitle, this.pageSeoDescr);
      });

    this.apis.getMovieGenres()
      .subscribe(res => {
        this.genresList = res['genres'];
      });
  }

  ngOnInit(): void { }

  setSEOMetaTags(title: string, description: string) {
    // Set SEO Title, Keywords and Description Meta tags
    this.title.setTitle(title + ' | ' + APP_SEO_NAME);
    this.meta.updateTag(
      { name: 'description', content: description + ' | ' + APP_SEO_NAME }
    );
    this.meta.updateTag(
      { name: 'keywords', content: 'movie genres, genres' },
    );
  }
}

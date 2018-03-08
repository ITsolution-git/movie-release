import { Injectable } from '@angular/core';

// AngularFire
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';

// RxJS
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

// Constants
import { DB_COL } from '../../constants';

// Services
import { ApiService } from '../../services/api/api.service';

@Injectable()
export class ArticlesService {

  searchKeyword: string;
  currentPageIndex: number;
  totalPages: number;
  totalResults: number;
  moviesList: any[] = [];

  articlesRef: Observable<any[]>;
  articles: any[];

  loading = false;

  constructor(
    private afDb: AngularFireDatabase,
    private apis: ApiService,
    private as: ApiService
  ) {
    // Initialize Articles DB Collection
    this.articlesRef = this.afDb.list(DB_COL.ARTICLES_PUBLIC).valueChanges();
    // Get the List of Articles
    this.getArticles();
  }

  getArticles() {
    this.loading = true;
    this.articlesRef.subscribe(res => {
      this.articles = res;
    });
  }

  searchMoviesByKeyword(keyword: string, pageIndex: number): void {
    this.loading = true;
    this.apis.searchMovieByKeyword(keyword, pageIndex)
      .subscribe((res) => {
        this.currentPageIndex = res['page'];
        this.totalPages = res['total_pages'];
        this.totalResults = res['total_results'];
        this.moviesList = this.moviesList.concat(res['results']);
        if (this.moviesList) {
          this.loading = false;
        }
        console.log(this.moviesList);
      });
  }

}

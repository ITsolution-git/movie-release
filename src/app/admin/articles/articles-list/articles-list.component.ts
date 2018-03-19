import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataSource } from '@angular/cdk/table';
// Material
import { PageEvent, MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
// AngularFire
import { AngularFireAuth } from 'angularfire2/auth';
import {
  AngularFireDatabase,
  AngularFireList
} from 'angularfire2/database';
// RxJS
import { Observable } from 'rxjs/Observable';
// Constant
import { DB_COL } from '../../../constants';
// Service
import { AdminService } from '../../admin.service';
import { ArticlesService } from '../articles.service';
import { ApiService } from '../../../services/api/api.service';
// Components
import { SelectMovieDialogComponent } from '../select-movie-dialog/select-movie-dialog.component';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css']
})
export class ArticlesListComponent implements OnInit {

  adminColumns = [
    'article-title',
    'movie-title',
    'article-owner',
    'date',
    'status',
    'user-actions'
  ];
  editorColumns = [
    'article-title',
    'movie-title',
    'date',
    'status'
  ];
  userRole: string;
  articlesList: any[];
  articlesDataSource: MatTableDataSource<any> | null;
  articlesObs: Observable<{}[]>;
  articlesRef: any;

  @ViewChild(MatPaginator) articlesPaginator: MatPaginator;
  @ViewChild(MatSort) articlesSort: MatSort;

  loading = false;

  constructor(
    private afDb: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private router: Router,
    public dialog: MatDialog,
    private apis: ApiService,
    public ars: ArticlesService,
    public ads: AdminService
  ) {
    this.ads.getUserRole()
      .then(res => {
        this.userRole = res;
        // initializes articles db collection
        this.articlesObs = this.afDb.list(DB_COL.ARTICLES).valueChanges();
        this.articlesRef = this.afDb.list(DB_COL.ARTICLES);
        this.getArticles(this.ads.userUid);
      });
  }

  ngOnInit(): void { }

  getArticles(uid: string) {
    if (this.userRole === 'admin') {
      this.userRole = 'admin';
      // console.log('GET ALL ARTICLES!');
      this.loading = true;
      this.articlesObs
        .subscribe(art => {
          this.articlesList = art;
          this.articlesDataSource = new MatTableDataSource(art);
          this.articlesDataSource.sort = this.articlesSort;
          this.articlesDataSource.paginator = this.articlesPaginator;
          this.loading = false;
        });
    } else if (this.userRole === 'editor') {
      this.userRole = 'editor';
      // console.log('GET EDITOR ARTICLES: ');
      this.loading = true;
      this.afDb.list(DB_COL.ARTICLES, ref => ref.orderByChild('article_owner_id').equalTo(this.afAuth.auth.currentUser.uid))
        .valueChanges()
        .subscribe(art => {
          this.articlesList = art;
          this.articlesDataSource = new MatTableDataSource(art);
          this.articlesDataSource.sort = this.articlesSort;
          this.articlesDataSource.paginator = this.articlesPaginator;
          this.loading = false;
        });
    }
  }

  applyArticlesFilter(filterValue: string): void {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.articlesDataSource.filter = filterValue;
  }

  goToArticleEditPage(key: string) {
    this.router.navigate(['admin/articles/edit-article/' + key]);
  }

  toggleArticleStatus(key: string, status: string) {
    this.articlesRef.update((key.toString()), {
      article_status: status
    });
  }

}

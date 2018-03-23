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
// Toast Messages
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
// Constant
import { DB_COL } from '../../../constants';
// Service
import { AdminService } from '../../admin.service';
import { ArticlesService } from '../articles.service';
import { ApiService } from '../../../core/services/api/api.service';
// Components
import { SelectMovieDialogComponent } from '../select-movie-dialog/select-movie-dialog.component';
import { DeleteArticleDialogComponent } from '../delete-article-dialog/delete-article-dialog.component';

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
    public ads: AdminService,
    public toastr: ToastsManager
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
      this.afDb.list(DB_COL.ARTICLES, ref => ref.orderByChild('article_date_reverse')).valueChanges()
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
    }).then(() => {
      if (status === 'public') {
        this.toastr.success('Article Published!');
      } else {
        this.toastr.success('Article Unpublished!');
      }
    }).catch((error) => {
      this.toastr.success('Could Not Change Article Status!', error);
    });
  }

  // Opens Dialog Box when Delete Button is Clicked
  openDeleteDialog(articleId: string): void {
    let dialogRef = this.dialog.open(DeleteArticleDialogComponent, {
      data: articleId
    });
    dialogRef.afterClosed().subscribe(result => {
      dialogRef = null;
      if (typeof result === 'object' && result.deleted) {
        this.goBack();
      }
    });
  }

  // Go back to previous route
  public goBack(): void {
    this.router.navigate(['admin/articles']);
  }

}

import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataSource } from '@angular/cdk/table';
// Material
import { PageEvent, MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
// AngularFire
import {
  AngularFireDatabase,
  AngularFireList
} from 'angularfire2/database';
// RxJS
import { Observable } from 'rxjs/Observable';
// Constant
import { DB_COL } from '../../../constants';
// Service
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

  displayedAdminColumns = [
    'article-title',
    'movie-title',
    'article-owner',
    'date',
    'status',
    'user-actions'
  ];
  displayedEditorColumns = [
    'article-title',
    'movie-title',
    'date',
    'status'
  ];
  articlesList: any[];
  publicArticlesDataSource: MatTableDataSource<any> | null;
  publicArticlesObs: Observable<{}[]>;
  publicArticlesRef: any;
  // draftArticlesDataSource: MatTableDataSource<any> | null;
  // draftArticlesObs: Observable<{}[]>;

  @ViewChild(MatPaginator) publicPaginator: MatPaginator;
  @ViewChild(MatSort) publicSort: MatSort;

  @ViewChild(MatPaginator) draftPaginator: MatPaginator;
  @ViewChild(MatSort) draftSort: MatSort;

  loadingPublic = false;
  loadingDraft = false;

  // @ViewChild(MatPaginator) editorPaginator: MatPaginator;
  // @ViewChild(MatSort) editorSort: MatSort;


  constructor(
    afDb: AngularFireDatabase,
    private router: Router,
    public dialog: MatDialog,
    private apis: ApiService
  ) {
    // initializes articles db collection
    this.publicArticlesObs = afDb.list(DB_COL.ARTICLES).valueChanges();
    this.publicArticlesRef = afDb.list(DB_COL.ARTICLES);
    // this.draftArticlesObs = afDb.list(DB_COL.ARTICLES_DRAFT).valueChanges();
    this.getPublicArticles();
    // this.getDraftArticles();
  }

  ngOnInit(): void { }

  getPublicArticles() {
    this.loadingPublic = true;
    this.publicArticlesObs
      .subscribe(res => {
        // console.log('PUBLIC ARTICLES: ', res);
        this.articlesList = res;
        this.publicArticlesDataSource = new MatTableDataSource(res);
        this.publicArticlesDataSource.sort = this.publicSort;
        this.publicArticlesDataSource.paginator = this.publicPaginator;
        this.loadingPublic = false;
      });
  }

  // getDraftArticles() {
  //   this.loadingDraft = true;
  //   this.draftArticlesObs
  //     .subscribe(res => {
  //       // console.log('DRAFT ARTICLES: ', res);
  //       this.draftArticlesDataSource = new MatTableDataSource(res);
  //       this.draftArticlesDataSource.sort = this.draftSort;
  //       this.draftArticlesDataSource.paginator = this.draftPaginator;
  //       this.loadingDraft = false;
  //     });
  // }

  applyPublicFilter(filterValue: string): void {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.publicArticlesDataSource.filter = filterValue;
  }

  addNewArticle() {
    this.router.navigate(['admin/articles/add-article/']);
  }

  goToArticleEditPage(key: string) {
    // console.log(key);
    this.router.navigate(['admin/articles/edit-article/' + key]);
  }

  toggleArticleStatus(key: string, status: string) {
    // console.log(key, status);
    this.publicArticlesRef.update((key.toString()), {
      article_status: status
    });
  }

  // Open Select Movie Dialog Box
  openSelectMovieDialog(): void {
    let dialogRef = this.dialog.open(SelectMovieDialogComponent, {
      panelClass: 'select-movie-dialog',
      height: '90%',
      width: '90%',
      maxWidth: '90%',
      maxHeight: '90%'
    });
    dialogRef.afterClosed()
      .subscribe(() => {
        dialogRef = null;
      });
  }

}

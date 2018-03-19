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

  @ViewChild(MatPaginator) publicPaginator: MatPaginator;
  @ViewChild(MatSort) publicSort: MatSort;

  loadingPublic = false;

  constructor(
    afDb: AngularFireDatabase,
    private router: Router,
    public dialog: MatDialog,
    private apis: ApiService,
    public ars: ArticlesService
  ) {
    // initializes articles db collection
    this.publicArticlesObs = afDb.list(DB_COL.ARTICLES).valueChanges();
    this.publicArticlesRef = afDb.list(DB_COL.ARTICLES);
    this.getPublicArticles();
  }

  ngOnInit(): void { }

  getPublicArticles() {
    this.loadingPublic = true;
    this.publicArticlesObs
      .subscribe(res => {
        this.articlesList = res;
        this.publicArticlesDataSource = new MatTableDataSource(res);
        this.publicArticlesDataSource.sort = this.publicSort;
        this.publicArticlesDataSource.paginator = this.publicPaginator;
        this.loadingPublic = false;
      });
  }

  applyPublicFilter(filterValue: string): void {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.publicArticlesDataSource.filter = filterValue;
  }

  goToArticleEditPage(key: string) {
    this.router.navigate(['admin/articles/edit-article/' + key]);
  }

  toggleArticleStatus(key: string, status: string) {
    this.publicArticlesRef.update((key.toString()), {
      article_status: status
    });
  }

}

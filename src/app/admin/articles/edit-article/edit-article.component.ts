import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// Material
import { MatDialog } from '@angular/material';
// RxJS
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
// AngularFire
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
// Toast Messages
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
// Constants
import { DB_COL, ckEditorConfig } from '../../../constants';
// Services
import { ApiService } from '../../../core/services/api/api.service';
// Components
import { DeleteArticleDialogComponent } from '../delete-article-dialog/delete-article-dialog.component';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {

  routeParamsSubscription: Subscription;

  userRef: any;

  ckEditorConfig: any;
  ckeditorContent: any;

  articleID: string;
  articleObs: Observable<any>;
  articleRef: any;
  articleDetails: any;

  movieDetails: any;

  isLoading: boolean;

  constructor(
    private router: Router,
    private ar: ActivatedRoute,
    private afAuth: AngularFireAuth,
    private afDb: AngularFireDatabase,
    public dialog: MatDialog,
    private apis: ApiService,
    public toastr: ToastsManager
  ) {
    this.ckEditorConfig = ckEditorConfig;
    // Get the article ID from the URL
    this.routeParamsSubscription = this.ar.url
      .subscribe(params => {
        this.articleID = params[1].path;
      });
    this.afAuth.authState.subscribe(userRes => {
      if (userRes && userRes.uid) {
        this.userRef = this.afDb.object(DB_COL.USERS + '/' + userRes.uid);
      }
    });
    this.articleObs = afDb.object(`${DB_COL.ARTICLES}/${this.articleID}`).valueChanges();
    this.articleRef = afDb.object(`${DB_COL.ARTICLES}/${this.articleID}`);
    this.getArticleDetails()
      .then(res => {
        this.getMovieDetails(res.article_movie_id);
      })
      .catch(error => {
        console.log('Could Not Get Article Details! ', error);
      });
  }

  ngOnInit(): void { }

  getArticleDetails(): Promise<any> {
    this.isLoading = true;
    return new Promise<any>((resolve, reject) => {
      this.articleObs.subscribe(res => {
        this.articleDetails = res;
        resolve(res);
      });
    });
  }

  getMovieDetails(movieId: string): void {
    this.apis.getMovieDetails(movieId)
      .subscribe(res => {
        this.movieDetails = res;
        this.isLoading = false;
      });
  }

  saveArticle(title: string, ckeditorContent: string): void {
    if (title) {
      this.articleRef.update({
        article_title: title,
        article_content: ckeditorContent,
        article_date_last_edit: Date.now(),
        article_status: 'draft'
      })
        .then(() => {
          this.toastr.success('Article Saved');
          this.router.navigate(['admin/articles']);
        })
        .catch((error) => {
          this.toastr.error('There Was an Error. Article Was Not Saved!');
          console.log(error.message);
        });
    } else {
      this.toastr.error('Article Title Should Not Be Empty!');
    }
  }

  // Opens Dialog Box when Delete Button is Clicked
  openDeleteDialog(): void {
    let dialogRef = this.dialog.open(DeleteArticleDialogComponent, {
      data: this.articleID
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

  onReady($event: any): void { }

  onFocus($event: any): void { }

  onChange($event: any): void { }

  onBlur($event: any): void { }

}

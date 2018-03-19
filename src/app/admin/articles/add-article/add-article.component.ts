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
// Constants
import { DB_COL, ckEditorConfig } from '../../../constants';
// Services
import { ApiService } from '../../../services/api/api.service';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {

  routeParamsSubscription: Subscription;

  userRef: any;

  ckEditorConfig: any;
  ckeditorContent: any;

  articleID: string;
  articleObs: Observable<any>;
  articleRef: any;
  articleDetails: any;

  movieDetails: any;

  isLooading: boolean;

  constructor(
    private router: Router,
    private ar: ActivatedRoute,
    private afAuth: AngularFireAuth,
    private afDb: AngularFireDatabase,
    public dialog: MatDialog,
    private apis: ApiService
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
    // this.getMovieDetails(movieId);
  }

  ngOnInit(): void { }

  getArticleDetails(): Promise<any> {
    this.isLooading = true;
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
        this.isLooading = false;
      });
  }

  saveArticle(title: string, ckeditorContent: string): void {
    // console.log(title, ckeditorContent);
    if (title) {
      this.articleRef.update({
        article_title: title,
        article_content: ckeditorContent,
        article_date_last_edit: Date.now(),
        article_status: 'draft'
      })
        .then(() => {
          // this.toastr.success('Page Saved');
          console.log('Page Saved');
          this.router.navigate(['admin/articles']);
        })
        .catch((error) => {
          // this.toastr.error('Page Not Saved!');
          console.log('Page Not Saved!');
          console.log(error.message);
        });
    } else {
      // this.toastr.error('Please Enter Page Title!');
      console.log('Please Enter Page Title!');
    }
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

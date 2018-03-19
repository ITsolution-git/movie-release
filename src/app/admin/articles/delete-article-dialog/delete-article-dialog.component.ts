import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
// Material
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// AngularFire
import {
  AngularFireDatabase,
  AngularFireObject,
  AngularFireList
} from 'angularfire2/database';
// Toast Messages
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
// Constants
import { DB_COL, ckEditorConfig } from '../../../constants';

@Component({
  selector: 'app-delete-article-dialog',
  templateUrl: './delete-article-dialog.component.html',
  styleUrls: ['./delete-article-dialog.component.css']
})
export class DeleteArticleDialogComponent implements OnInit {

  constructor(
    private afDb: AngularFireDatabase,
    public dialogRef: MatDialogRef<DeleteArticleDialogComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public articleID: string,
    public toastr: ToastsManager
  ) { }

  ngOnInit(): void { }

  deleteArticle(): void {
    this.afDb.object(`${DB_COL.ARTICLES}/${this.articleID}`).remove()
      .then(() => {
        this.toastr.success('Article Was Deleted!');
        this.dialogRef.close({ deleted: true });
        this.router.navigate(['admin/articles']);
      }).catch(error => {
        this.toastr.error('There Was an Error. Article Was Not Be Deleted!');
        console.log(error.message);
      });
  }

}

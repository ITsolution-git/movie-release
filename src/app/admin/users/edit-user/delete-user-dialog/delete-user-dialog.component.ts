import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';

// Material
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

// Firebase
import { AngularFireDatabase } from 'angularfire2/database';

// ToastsManager
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

// Services
import { UsersService } from '../../users.service';
import { UploadService } from '../../../services/upload/upload.service';

// Constant
import { DB_COL } from '../../../../constants';

@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrls: ['./delete-user-dialog.component.css']
})
export class DeleteUserDialogComponent implements OnInit {

  user: IUsers;

  constructor(
    private usersService: UsersService,
    private uploadService: UploadService,
    private router: Router,
    private afDb: AngularFireDatabase,
    public dialogRef: MatDialogRef<DeleteUserDialogComponent>,
    public toastr: ToastsManager,
    @Inject(MAT_DIALOG_DATA) public userKey: string
  ) { }

  ngOnInit() {
    // const userSubscription = this.usersService.getUserItem(this.userKey)
    //   .subscribe(snapshot => {

    //     // if user subscription already exists, then unsubscribe first
    //     if (userSubscription) {
    //       userSubscription.unsubscribe();
    //     }

    //     // Initialize users property with returned value
    //     this.user = snapshot.val();

    //     // If no returned value, show console error
    //     // if (!this.user) {
    //     //   console.error(`Confirm delete not exists user with key: ${this.userKey}`)
    //     // }
    //   });
  }

  // Delete User
  deleteUser() {
    console.log(this.userKey);
    // let removeUser: Promise<any>[];
    const removeUser = new Promise((resolve, reject) => {

      // Remove User db ref
      this.afDb.object(`${DB_COL.USERS}/${this.userKey}`).remove();

      // Remove User Profile Picture db ref
      // this.afDb.object(`${FB_LISTS.UPLOADS}/img/users/${this.userKey}`).remove(),
      resolve();
    }).then(() => {
      this.toastr.success('User was deleted!');
      this.dialogRef.close();
      this.router.navigate(['admin/users']);
    })
      .catch(error => {
        console.log('There was an error while deleting the user! ', error);
      });
  }

}

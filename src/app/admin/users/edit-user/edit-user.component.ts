import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

// Material
import { MatDialog } from '@angular/material';

// Firebase
import {
  AngularFireDatabase,
  AngularFireObject
} from 'angularfire2/database';

// RxJS
import { Subscription } from 'rxjs/Subscription';

// ToastsManager
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

// Interfaces
import { Upload } from '../../services/upload/upload';

// Constant
import { DB_COL } from '../../../constants';

// Services
import { UploadService } from '../../services/upload/upload.service';
import { UsersService } from '../users.service';

// Component
import { DeleteUserDialogComponent } from './delete-user-dialog/delete-user-dialog.component';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit, OnDestroy {

  user: IUsers;
  userDetailsForm: FormGroup;
  usersRef: AngularFireObject<IUsers>;
  userObj: any;
  userKey: string;
  routeParamsSubscription: Subscription;
  uploadProcessing: {
    [key: string]: Upload;
  } = {};

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _afDb: AngularFireDatabase,
    private _fb: FormBuilder,
    private _toastr: ToastsManager,
    protected _uploadService: UploadService,
    private _userService: UsersService,
    public dialog: MatDialog
  ) {

    this.usersRef = this._afDb.object(`${DB_COL.USERS}`);

    // initialize Form Group
    this.userDetailsForm = _fb.group({
      about: '',
      address: '',
      age: '',
      email: ['', Validators.required],
      gender: '',
      displayName: '',
      phone: '',
      photoURL: '',
      role: ['', Validators.required],
      username: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Initialize Product Id from route parameter
    this.routeParamsSubscription = this._route.params
      .subscribe(
        params => {
          this.userKey = params['id'];
          this.userObj = this._userService.getUserItem(this.userKey);
          console.log(this.userKey, ' => ', this.userObj);

        });
    this._fetchUserValues();
  }

  _fetchUserValues(): Promise<any> {
    return new Promise((resolve, reject) => {
      const user_sub = this.userObj.valueChanges()
        .subscribe(snapshot => {
          console.log(snapshot);

          this.user = snapshot;
          resolve();
        }, error => reject(error));
    });
  }

  // Go back to previous route
  public goBack() {
    this._router.navigate(['admin/users']);
  }

  save() {
    console.log(this.user);
    if (this.user) {
      this._afDb.object(`${DB_COL.USERS}/${this.userKey}`).set(this.user)
        .then(() => {
          this._toastr.success('User Profile Updated!');
          this._router.navigate(['admin/users']);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  // Uploaded Image File Event Listener
  public imgFileChange(event) {
    // console.log('image uploading');
    let file: File;
    const files = event.target.files;
    if (files && files.length > 0) {
      file = files.item(0);
      this.uploadImgFile(file);
    }
  }

  // Upload Album Artwork
  protected uploadImgFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const key = 'user-avatars';
      const img_upload = new Upload(file);
      this.uploadProcessing[key] = img_upload;
      this._uploadService.pushUploadImg(img_upload, key);
      let running_count = 0;
      const sub = this._uploadService.onDone.subscribe(upload => {
        if (img_upload === upload) {
          ++running_count;
          if (sub) {
            sub.unsubscribe();
          }
          if (running_count === 1) {
            this.user.photoURL = upload.url;
            resolve(img_upload.url);
            delete this.uploadProcessing[key];
          }
        }
      });
    });
  }

  // Opens Dialog Box when Delete Button is Clicked
  openDeleteDialog() {
    let dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      data: this.userKey
    });
    dialogRef.afterClosed().subscribe(result => {
      dialogRef = null;
    });
  }

  ngOnDestroy(): void {

  }
}

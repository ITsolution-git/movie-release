import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

// Firebase
import {
  AngularFireDatabase,
  AngularFireObject,
  AngularFireList
} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

// RxJS
import { Subscription } from 'rxjs/Subscription';

// ToastsManager
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

// Constant
import { DB_COL, DEFAULT_USER_IMG } from '../../../constants';

// Services
import { UploadService } from '../../_services/upload/upload.service';
import { UsersService } from '../users.service';
import { Observable } from 'rxjs/Observable';

export class Upload {
  $key: string;
  file: File;
  name: string;
  url: string;
  progress: number;
  createdAt: Date = new Date();
  constructor(file: File) {
    this.file = file;
  }
}

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {

  user: IUsers;
  addUserForm: FormGroup;
  usersRef: AngularFireList<IUsers[]>;
  newUserKey: string;
  userAvatar: string;
  uploadProcessing: {
    [key: string]: Upload;
  } = {};

  constructor(
    private _router: Router,
    private _afDb: AngularFireDatabase,
    private _fb: FormBuilder,
    private _toastr: ToastsManager,
    protected _uploadService: UploadService,
    private _userService: UsersService,
    private afAuth: AngularFireAuth,
  ) {
    // this.initNewUser();
    // Initialize Users DB collection
    this.usersRef = this._afDb.list(`${DB_COL.USERS}`);
    this.newUserKey = this.getNewUserKey();
    // this.userAvatar = this.getUserAvatar();
    // initialize Form Group
    this.addUserForm = _fb.group({
      about: '',
      address: '',
      age: '',
      email: ['', Validators.required],
      gender: '',
      displayName: '',
      phone: '',
      photoURL: [DEFAULT_USER_IMG, Validators.required],
      role: ['', Validators.required],
      username: '',
      uid: this.newUserKey,
      regDate: Date.now(),
      isActive: false
    });
  }

  getNewUserKey(): string {
    return this.usersRef.push(null).key;
  }
  // getUserAvatar(): string {
  //   return this.user.photoURL
  // }

  // Go back to previous route
  public goBack() {
    this._router.navigate(['admin/users']);
  }

  // Create New User
  save(user: IUsers, pass: string, repeatPass: string) {
    console.log(user);
    if (this.addUserForm.invalid) {
      this._toastr.error('Please Fill In All Required Fields!');
    } else {
      if (pass === repeatPass) {
        // Register User
        this.afAuth.auth.createUserWithEmailAndPassword(user.email, pass)
          .then(() => {
            // Create User DB Reference
            this._afDb.object(`${DB_COL.USERS}/${this.newUserKey}`).set(user)
              .then(() => {
                this._toastr.success('New User Added');
                this._router.navigate(['admin/users']);
              })
              .catch((error) => {
                // Could Not Create DB Reference for User
                this._toastr.success(error.message);
              });
          })
          .catch((error) => {
            // Could Not Register User
            this._toastr.error(error.message);
          });
      } else if (pass !== repeatPass) {
        this._toastr.error('Passwords do not match!');
      }
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
      const sub = this._uploadService.onDone.subscribe(upload => {
        if (img_upload === upload) {
          if (sub) {
            sub.unsubscribe();
          }
          this.addUserForm.controls.photoURL.setValue(upload.url);
          resolve(img_upload.url);
          delete this.uploadProcessing[key];
        }
      });
    });
  }

}

import { Injectable, EventEmitter } from '@angular/core';
import { Upload } from './upload';

// Firebase
import * as firebase from 'firebase';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

// ToastsManager
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UploadService {

  onDone = new EventEmitter<Upload>();
  currentUserUID: string;
  private imgBasePath: string;
  uploads: Observable<{}[]>;
  storageRef = firebase.storage().ref();

  constructor(
    private db: AngularFireDatabase,
    public toastr: ToastsManager,
    private afAuth: AngularFireAuth
  ) {
    this.currentUserUID = afAuth.auth.currentUser.uid;
    this.imgBasePath = '/uploads/' + this.currentUserUID + '/img';
  }

  getImgUploads(query = {}) {
    this.uploads = this.db.list(this.imgBasePath).valueChanges();
    return this.uploads;
  }

  deleteImgUpload(upload: Upload) {
    this.deleteImgDbRef(upload.$key)
      .then(() => {
        this.deleteImgFile(upload.name);
      })
      .catch(error => console.log(error));
  }

  deleteImg(key: string, subPath: string) {
    this.deleteImgDbRef(key, subPath)
      .then(() => {
        this.deleteUserProfileImg(key);
      })
      .catch(error => console.log(error));
  }

  // Executes the file uploading to firebase https://firebase.google.com/docs/storage/web/upload-files
  pushUploadImg(upload: Upload, category?: string) {
    let upload_task;
    upload_task = this.storageRef.child(`${this.imgBasePath}/${category}/` + Date.now() + `/${upload.file.name}`).put(upload.file);
    upload_task.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // upload in progress
        upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log('img progress: ', upload.progress);
      },
      (error) => {
        // upload failed
        console.log(error);
      },
      () => {
        // upload success
        upload.url = upload_task.snapshot.downloadURL;
        upload.name = upload.file.name;
        if (category === 'logo') {
          this.saveLogoImg(upload)
            .then(() => {
              this.onDone.emit(upload);
              this.toastr.success('Logo Uploaded!');
            });
        } else if (category === 'user-avatars') {
          this.saveUserProfileImg(upload)
            .then(() => {
              this.onDone.emit(upload);
              this.toastr.success('Profile Image Uploaded!');
            });
        }
      }
    );
  }

  // Firebase files must have unique names in their respective storage dir.
  // So the name serves as a unique key

  // Save files refs to database
  private saveLogoImg(file: Upload, subPath?: string) {
    return this.db.list(`${this.imgBasePath}/logo`).push(file);
  }
  private saveUserProfileImg(file: Upload, subPath?: string) {
    return this.db.list(`${this.imgBasePath}/users`).push(file);
  }

  // Delete files from database
  private deleteImgDbRef(key: string, subPath?: string) {
    return this.db.list(`${this.imgBasePath}/${subPath}/`).remove(key);
  }

  // Delete files from storage
  private deleteUserProfileImg(name: string) {
    return this.storageRef.child(`${this.imgBasePath}/${name}`).delete();
  }
  private deleteImgFile(name: string) {
    const storageRef = firebase.storage().ref();
    return this.storageRef.child(`${this.imgBasePath}/${name}`).delete();
  }

}

import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
// AngularFire
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.css']
})
export class AuthDialogComponent implements OnInit {

  constructor(
    public afAuth: AngularFireAuth,
    private dialogRef: MatDialogRef<AuthDialogComponent>,
  ) {
    this.afAuth.auth.onAuthStateChanged(user => {
      // Close dialog box if user has logged in
      if (user) {
        this.dialogRef.close();
      }
    });
  }

  ngOnInit(): void { }

}

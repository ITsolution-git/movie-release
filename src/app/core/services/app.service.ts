import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
// Components
import { AuthDialogComponent } from '../../content/shared/auth-dialog/auth-dialog.component';

@Injectable()
export class AppService {

  constructor(
    private http: HttpClient,
    public dialog: MatDialog
  ) { }

  urlOptimizeText(text: string): string {
    const urlText = text.toLowerCase().replace(/[^a-zA-Z0-9-$@]+/gm, '-');
    return urlText;
  }

  seoOptimizeText(text: string): string {
    const seoText = text.replace(/-/g, ' ');
    return seoText;
  }
  scrollToTop(): void {
    window.scrollTo(0, 0);
  }

  openLoginDialog(): void {
    let dialogRef = this.dialog.open(AuthDialogComponent, {
      panelClass: 'login-dialog',
      data: 'login',
      height: '100%',
      width: '100%',
      maxWidth: '100%',
      maxHeight: '100%'
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        dialogRef = null;
      });
  }

}

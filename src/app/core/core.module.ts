import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// AngularFire2
import { AngularFireModule } from 'angularfire2'; // Core Firebase Module
import { AngularFireAuthModule } from 'angularfire2/auth'; // Firebase Authentication Module
import { AngularFireDatabaseModule } from 'angularfire2/database';
// Environment
import { environment } from '../../environments/environment';
// Auth
import { AuthService } from './auth/auth.service'; // Service for Authorization functions (login, register, reset password...)
import { AuthGuard } from './auth/guards/auth-guard.service';

@NgModule({
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  providers: [
    AuthService,
    AuthGuard
  ]
})
export class CoreModule { }

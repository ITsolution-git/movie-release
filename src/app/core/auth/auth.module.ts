import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Material Modules
import {
  MatCardModule,
  MatInputModule,
  MatButtonModule
} from '@angular/material';
// Routing Module
import { AuthRoutingModule } from './auth-routing.module';
// Components
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AdminLoginComponent } from './admin-login/admin-login.component'; // Service for Guarding Admin and Account Routes

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    AdminLoginComponent
  ],
  exports: [
    LoginComponent
  ]
})
export class AuthModule { }

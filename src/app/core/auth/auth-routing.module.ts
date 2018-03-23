import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Components
import { UserAuthComponent } from './user-auth/user-auth.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
// Auth Routes
const authRoutes = [
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: UserAuthComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'admin-login', component: AdminLoginComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(authRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule { }

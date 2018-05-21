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
import { UserAuthComponent } from './user-auth/user-auth.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule
  ],
  declarations: [
    UserAuthComponent
  ],
  exports: [
    UserAuthComponent
  ]
})
export class AuthModule { }

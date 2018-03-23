import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
// Material Modules
import {
  MatSidenavModule,
  MatIconModule,
  MatButtonModule,
  MatDialogModule,
  MatTableModule,
  MatProgressSpinnerModule
} from '@angular/material';
// Routing Module
import { AdminRoutingModule } from './admin-routing.module';
// Guard Services
import { AdminRoleGuardService } from '../core/auth/services/guards/admin-role-guard.service';
// Services
import { AdminService } from './services/admin.service';
import { UploadService } from './services/upload/upload.service';
import { UsersService } from './users/users.service';
import { ArticlesService } from './articles/articles.service';
// Components
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';
import { TagsComponent } from './tags/tags.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { SettingsComponent } from './settings/settings.component';
import { DeleteUserDialogComponent } from './users/edit-user/delete-user-dialog/delete-user-dialog.component';
import { SelectMovieDialogComponent } from './articles/select-movie-dialog/select-movie-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    MatProgressSpinnerModule,
    FlexLayoutModule
  ],
  declarations: [
    AdminComponent,
    DashboardComponent,
    CategoriesComponent,
    TagsComponent,
    SidebarComponent,
    SettingsComponent,
    DeleteUserDialogComponent,
    SelectMovieDialogComponent
  ],
  entryComponents: [
    DeleteUserDialogComponent,
    SelectMovieDialogComponent
  ],
  providers: [
    AdminRoleGuardService,
    UploadService,
    UsersService,
    ArticlesService,
    AdminService
  ]
})
export class AdminModule { }

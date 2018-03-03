import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Material Modules
import {
  MatSidenavModule,
  MatIconModule,
  MatButtonModule,
  MatDialogModule
} from '@angular/material';

// Routing Module
import { AdminRoutingModule } from './admin-routing.module';

// Guard Services
import { AdminRoleGuardService } from '../core/auth/admin-role-guard.service';

// Services
import { UploadService } from './_services/upload/upload.service';
import { UsersService } from './users/users.service';

// Components
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';
import { TagsComponent } from './tags/tags.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { SettingsComponent } from './settings/settings.component';
import { DeleteUserDialogComponent } from './users/edit-user/delete-user-dialog/delete-user-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ],
  declarations: [
    AdminComponent,
    DashboardComponent,
    CategoriesComponent,
    TagsComponent,
    SidebarComponent,
    SettingsComponent,
    DeleteUserDialogComponent
  ],
  entryComponents: [
    DeleteUserDialogComponent
  ],
  providers: [
    AdminRoleGuardService,
    UploadService,
    UsersService,
  ]
})
export class AdminModule { }

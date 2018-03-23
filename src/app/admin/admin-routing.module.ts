import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// AuthGuard
import { AdminRoleGuardService } from '../core/auth/guards/admin-role-guard.service';

// Components
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';
import { TagsComponent } from './tags/tags.component';
import { SettingsComponent } from './settings/settings.component';

// Admin Routes
const adminRoutes = [
  {
    path: '', component: AdminComponent, children: [
      { path: '', component: DashboardComponent },
      { path: 'articles', loadChildren: 'app/admin/articles/articles.module#ArticlesModule' },
      { path: 'categories', component: CategoriesComponent },
      { path: 'tags', component: TagsComponent },
      { path: 'users', canActivate: [AdminRoleGuardService], loadChildren: 'app/admin/users/users.module#UsersModule' },
      { path: 'settings', canActivate: [AdminRoleGuardService], component: SettingsComponent }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(adminRoutes)
  ],
  providers: [
    AdminRoleGuardService
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }

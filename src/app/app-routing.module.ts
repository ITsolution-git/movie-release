import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// AuthGuard
import { AuthGuard } from './core/auth/guards/auth-guard.service';
import { RolesGuardService } from './core/auth/guards/roles-guard.service';

// Components
import { PublicComponent } from './core/public/public.component';
import { PageNotFoundComponent } from './content/page-not-found/page-not-found.component';

// Application Root Routes
const appRoutes = [
  {
    path: '', component: PublicComponent, children: [
      {
        path: '',
        loadChildren: './content/content.module#ContentModule'
      },
      {
        path: 'auth',
        loadChildren: './core/auth/auth.module#AuthModule'
      },
    ]
  },
  {
    path: 'admin',
    canActivate: [AuthGuard, RolesGuardService],
    loadChildren: './admin/admin.module#AdminModule',
    data: { roles: ['admin'] }
  },
  {
    path: '**', component:
      PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthGuard
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

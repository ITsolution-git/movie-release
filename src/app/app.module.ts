import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CdkTableModule } from '@angular/cdk/table';
import { HttpModule } from '@angular/http';
import { LayoutModule } from '@angular/cdk/layout';
// Third Party
// import { FacebookModule } from 'ngx-facebook';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
// Environments
import { environment } from '../environments/environment';
// Service Worker
import { ServiceWorkerModule } from '@angular/service-worker';
// Material Modules
import {
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
  MatCardModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatTabsModule,
  MatOptionModule,
  MatSelectModule,
  MatDialogModule,
  MatSidenavModule,
  MatListModule
} from '@angular/material';
// Toastr
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { ToastrOptions } from './toastr-options';
import { ToastOptions } from 'ng2-toastr';
// Guard Services
import { AuthGuard } from './core/auth/services/guards/auth-guard.service';
import { RolesGuardService } from './core/auth/services/guards/roles-guard.service';
// Modules
import { CoreModule } from './core/core.module';
import { AuthModule } from './core/auth/auth.module';
import { ContentModule } from './content/content.module';
// Routing Modules
import { AppRoutingModule } from './app-routing.module';
// Services
import { AppService } from './core/services/app.service';
import { ApiService } from './core/services/api/api.service';
import { SitemapService } from './core/services/sitemap/sitemap.service';
import { FirebaseService } from './core/services/firebase/firebase.service';
import { ResponsiveService } from './core/services/responsive.service';
import { SeoService } from './core/services/seo/seo.service';
// Components
import { PublicComponent } from './core/public/public.component';
import { AppComponent } from './app.component';
import { HeaderComponent } from './content/shared/header/header.component';
import { FooterComponent } from './content/shared/footer/footer.component';
import { PageNotFoundComponent } from './content/page-not-found/page-not-found.component';
import { PrimaryMenuComponent } from './content/shared/primary-menu/primary-menu.component';
import { SearchFormComponent } from './content/shared/search-form/search-form.component';
import { SidenavComponent } from '../app/content/shared/sidenav/sidenav.component';
import { AuthDialogComponent } from './content/shared/auth-dialog/auth-dialog.component';

@NgModule({
  declarations: [
    PublicComponent,
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    PrimaryMenuComponent,
    SearchFormComponent,
    SidenavComponent,
    AuthDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    environment.production ? ServiceWorkerModule.register('ngsw-worker.js') : [], // Regsiters Service Worker
    CdkTableModule,
    FlexLayoutModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatTabsModule,
    MatOptionModule,
    MatSelectModule,
    MatDialogModule,
    MatSidenavModule,
    MatListModule,
    ToastModule.forRoot(),
    AppRoutingModule,
    CoreModule,
    AuthModule,
    ContentModule,
    LoadingBarRouterModule
  ],
  providers: [
    AppService,
    ApiService,
    SeoService,
    SitemapService,
    FirebaseService,
    ResponsiveService,
    AuthGuard,
    RolesGuardService,
    {
      provide: ToastOptions,
      useClass: ToastrOptions
    }
  ],
  entryComponents: [AuthDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

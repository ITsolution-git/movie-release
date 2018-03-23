import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CdkTableModule } from '@angular/cdk/table';
// Material Modules
import {
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
  MatCardModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatTabsModule,
  MatOptionModule,
  MatSelectModule,
  MatDialogModule
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
    AuthDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatOptionModule,
    MatSelectModule,
    CdkTableModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule,
    AuthModule,
    MatToolbarModule,
    MatIconModule,
    ToastModule.forRoot(),
    AppRoutingModule,
    MatDialogModule
  ],
  providers: [
    AppService,
    // SeoService,
    ApiService,
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

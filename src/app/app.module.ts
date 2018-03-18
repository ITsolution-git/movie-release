import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CdkTableModule } from '@angular/cdk/table';
import {HttpModule} from '@angular/http';
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
  MatSidenav,
  MatSidenavModule,
  MatButtonToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatListModule,
  MatPaginatorModule,
  MatStepperModule,
  MatTableModule,
  MatSliderModule,
  MatProgressBarModule,
  MatRadioModule,
  MatRippleModule,
} from '@angular/material';
// Toastr
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { ToastrOptions } from './toastr-options';
import { ToastOptions } from 'ng2-toastr';
// Guard Services
import { AuthGuard } from './core/auth/auth.guard';
import { RolesGuardService } from './core/auth/roles-guard.service';
// Modules
import { CoreModule } from './core/core.module';
// import { ContentModule } from './content/content.module';
// Routing Modules
import { AppRoutingModule } from './app-routing.module';
// Services
import { AppService } from './services/app.service';
import { ApiService } from './services/api/api.service';
import { SitemapService } from './services/sitemap/sitemap.service';
import { FirebaseService } from './services/firebase/firebase.service';
import { ResponsiveService } from './services/responsive.service';
import { SeoService } from './services/seo/seo.service';
// Components
import { PublicComponent } from './core/public/public.component';
import { AppComponent } from './app.component';
import { HeaderComponent } from './content/shared/header/header.component';
import { FooterComponent } from './content/shared/footer/footer.component';
import { PageNotFoundComponent } from './content/page-not-found/page-not-found.component';
import { PrimaryMenuComponent } from './content/shared/primary-menu/primary-menu.component';
import { SearchFormComponent } from './content/shared/search-form/search-form.component';
import { SidenavComponent } from '../app/content/shared/sidenav/sidenav.component';


@NgModule({
  declarations: [
    PublicComponent,
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    PrimaryMenuComponent,
    SearchFormComponent,
    SidenavComponent
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
    // ContentModule, // this makes the header to disappear
    MatToolbarModule,
    MatIconModule,
    ToastModule.forRoot(),
    AppRoutingModule,
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
  bootstrap: [AppComponent]
})
export class AppModule { }

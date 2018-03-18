import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatTabsModule,
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatGridListModule,
  MatProgressSpinnerModule,
  MatListModule,
  MatTableModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MatMenuModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
// Modules
import { AuthModule } from '../core/auth/auth.module';
// Routing Module
import { ContentRoutingModule } from './content-routing.module';
// Components
import { HomeComponent } from './home/home.component';
import { MoviesComponent } from './movies/movies.component';
import { GenresComponent } from './genres/genres.component';
import { SearchComponent } from './search/search.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { TrailersDialogComponent } from './shared/trailers-dialog/trailers-dialog.component';
import { AuthDialogComponent } from './shared/auth-dialog/auth-dialog.component';
import { GenresListComponent } from './genres-list/genres-list.component';
import { MainMoviesDirectoryComponent } from './main-movies-directory/main-movies-directory.component';
import { SidenavComponent } from './shared/sidenav/sidenav.component';

@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatDialogModule,
    MatMenuModule,
    FlexLayoutModule,
    ContentRoutingModule,
    AuthModule,
  ],
  declarations: [
    HomeComponent,
    MoviesComponent,
    GenresComponent,
    SearchComponent,
    MovieDetailsComponent,
    TrailersDialogComponent,
    AuthDialogComponent,
    GenresListComponent,
    MainMoviesDirectoryComponent,
    SidenavComponent
  ],
  entryComponents: [
    TrailersDialogComponent,
    AuthDialogComponent
  ]
})
export class ContentModule { }

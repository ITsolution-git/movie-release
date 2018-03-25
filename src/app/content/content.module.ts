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
// Routing Module
import { ContentRoutingModule } from './content-routing.module';
// Pipes
import { SafePipe } from '../pipes/safe-html.pipe';
// Components
import { HomeComponent } from './home/home.component';
import { MoviesComponent } from './movies/movies.component';
import { GenresComponent } from './genres/genres.component';
import { SearchComponent } from './search/search.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { TrailersDialogComponent } from './shared/trailers-dialog/trailers-dialog.component';
// import { AuthDialogComponent } from './shared/auth-dialog/auth-dialog.component';
import { GenresListComponent } from './genres-list/genres-list.component';
import { MainMoviesDirectoryComponent } from './main-movies-directory/main-movies-directory.component';
import { MovieCardComponent } from './shared/movie-card/movie-card.component';
import { JumbotronComponent } from './shared/jumbotron/jumbotron.component';

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
    ContentRoutingModule
  ],
  declarations: [
    HomeComponent,
    MoviesComponent,
    GenresComponent,
    SearchComponent,
    MovieDetailsComponent,
    TrailersDialogComponent,
    // AuthDialogComponent,
    GenresListComponent,
    MainMoviesDirectoryComponent,
    SafePipe,
    MovieCardComponent,
    JumbotronComponent
  ],
  entryComponents: [
    TrailersDialogComponent,
    // AuthDialogComponent
  ]
})
export class ContentModule { }

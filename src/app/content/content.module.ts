import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  MatMenuModule,
  MatOptionModule,
  MatSelectModule
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
import { MovieDetailsComponent, GoogleAdOneComponent } from './movie-details/movie-details.component';
import { TrailersDialogComponent } from './shared/trailers-dialog/trailers-dialog.component';
import { GenresListComponent } from './genres-list/genres-list.component';
import { MainMoviesDirectoryComponent } from './main-movies-directory/main-movies-directory.component';
import { JumbotronComponent } from './shared/jumbotron/jumbotron.component';
import { MovieCardComponent } from './shared/movie-card/movie-card.component';
import { CelebsComponent } from './celebs/celebs.component';
import { CelebDetailsComponent } from './celeb-details/celeb-details.component';
import { UserButtonsComponent } from './shared/user-buttons/user-buttons.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
    MatOptionModule,
    MatSelectModule,
    FlexLayoutModule,
    ContentRoutingModule
  ],
  declarations: [
    HomeComponent,
    GoogleAdOneComponent,
    MoviesComponent,
    GenresComponent,
    SearchComponent,
    MovieDetailsComponent,
    TrailersDialogComponent,
    GenresListComponent,
    MainMoviesDirectoryComponent,
    JumbotronComponent,
    MovieCardComponent,
    CelebsComponent,
    CelebDetailsComponent,
    SafePipe,
    UserButtonsComponent
  ],
  entryComponents: [
    TrailersDialogComponent
  ]
})
export class ContentModule { }

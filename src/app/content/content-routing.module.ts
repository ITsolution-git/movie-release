import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// AuthGuard
import { AuthGuard } from '../core/auth/auth.guard';

// components
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { GenresComponent } from './genres/genres.component';

// Content Routes
const contentRoutes = [
  { path: '', component: HomeComponent },
  { path: 'search/movies/:keyword', component: SearchComponent },
  { path: 'movies/genre/:genre', component: GenresComponent },
  { path: 'movies/most-popular', component: MoviesComponent },
  { path: 'movies/top-rated', component: MoviesComponent },
  { path: 'movies/upcoming', component: MoviesComponent },
  { path: 'movies/now-playing', component: MoviesComponent },
  { path: 'movies/:title/:id', component: MovieDetailsComponent },
  { path: 'my-account', canActivate: [AuthGuard], loadChildren: './account/account.module#AccountModule' },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(contentRoutes)
  ],
  exports: [RouterModule]
})
export class ContentRoutingModule { }

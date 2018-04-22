import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// AuthGuard
import { AuthGuard } from '../core/auth/services/guards/auth-guard.service';

// components
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { GenresComponent } from './genres/genres.component';
import { GenresListComponent } from './genres-list/genres-list.component';
import { MainMoviesDirectoryComponent } from './main-movies-directory/main-movies-directory.component';
import { CelebDetailsComponent } from './celeb-details/celeb-details.component';
import { CelebsComponent } from './celebs/celebs.component';
import { AboutComponent } from './about/about.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsComponent } from './terms/terms.component';

// Content Routes
const contentRoutes = [
  { path: '', component: HomeComponent },
  // Movies
  { path: 'search/movies/:keyword', component: SearchComponent },
  { path: 'movies', component: MainMoviesDirectoryComponent },
  { path: 'movies/genres', component: GenresListComponent },
  { path: 'movies/genre/:genre', component: GenresComponent },
  { path: 'movies/most-popular', component: MoviesComponent },
  { path: 'movies/top-rated', component: MoviesComponent },
  { path: 'movies/upcoming', component: MoviesComponent },
  { path: 'movies/now-playing', component: MoviesComponent },
  { path: 'movies/:title', component: MovieDetailsComponent },
  { path: 'about', component: AboutComponent},
  { path: 'privacy', component: PrivacyComponent},
  { path: 'terms', component: TermsComponent},

  // Persons
  { path: 'search/celebrities/:keyword', component: SearchComponent },
  { path: 'celebrities', component: CelebsComponent },
  { path: 'celebrity/:name', component: CelebDetailsComponent },
  // Account
  { path: 'my-account', canActivate: [AuthGuard], loadChildren: './account/account.module#AccountModule' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(contentRoutes)
  ],
  exports: [RouterModule]
})
export class ContentRoutingModule { }

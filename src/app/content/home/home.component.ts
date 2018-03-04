import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

// Services
import { AppService } from '../../services/app.service';
import { ApiService } from '../../services/api/api.service';
// Constants
import { TMDB_IMAGES_BASE_URL, IMG_185, APP_SEO_NAME } from '../../constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  TMDB_IMAGES_BASE_URL: any;
  IMG_185: any;

  screenSize: number;

  nowPlayingMovies: any[];
  nowPlayingMoviesCurrentIndex: number;
  nowPlayingMoviesTotalResults: number;
  nowPlayingMoviesTotalPages: number;

  loading = false;
  loadingMore = false;

  constructor(
    public meta: Meta,
    public title: Title,
    private as: AppService,
    private apis: ApiService
  ) {
    // Set SEO Title, Keywords and Description Meta tags
    this.title.setTitle(APP_SEO_NAME + ' - Movies, TV Shows, Celebrities, Cinema Tickets.');
    this.meta
      .updateTag(
        {
          name: 'description',
          content: APP_SEO_NAME + ' the best source for Movie, TV Show, Celebrity content, Cinema Tickets and more! - ' + APP_SEO_NAME
        }
      );
    this.meta.updateTag(
      { name: 'keywords', content: 'movies, tv shows, celebrities, production companies, cinema tickets,  actors, actresses' },
    );

    // Initialize Constants
    this.TMDB_IMAGES_BASE_URL = TMDB_IMAGES_BASE_URL;
    this.IMG_185 = IMG_185;

    // Scrolls to top of the page
    this.as.scrollToTop();

    // Calls the function that gets the list of movies and tv shows for the sliders
    if (!this.apis.moviesNowPlaying.length) {
      this.getNowPlayingMovies(1);
    } else {
      this.nowPlayingMovies = this.apis.moviesNowPlaying;
      this.nowPlayingMoviesCurrentIndex = this.apis.moviesNowPlayingLastIndex;
      this.nowPlayingMoviesTotalPages = this.apis.moviesNowPlayingTotalPages;
      this.nowPlayingMoviesTotalResults = this.apis.moviesNowPlayingTotalResults;
    }
  }

  onResize(event?): void {
    // Checks Screen Size in Pixels
    if (event) {
      this.screenSize = event.target.innerWidth;
    } else {
      this.screenSize = window.innerWidth;
    }
  }

  // Get now playing movies from service
  getNowPlayingMovies(pageIndex: number): void {
    this.loading = true;
    this.apis.getNowPlayingMovies(pageIndex).subscribe((res) => {
      this.nowPlayingMovies = res['results'];
      this.nowPlayingMoviesCurrentIndex = res['page'];
      this.nowPlayingMoviesTotalPages = res['total_pages'];
      this.nowPlayingMoviesTotalResults = res['total_results'];
      if (this.nowPlayingMovies) {
        this.loading = false;
      }
      // console.log(this.nowPlayingMovies);
    });
  }

  loadMoreResults(pageIndex: number): void {
    this.loadingMore = true;
    this.apis.getNowPlayingMovies(pageIndex)
      .subscribe((res) => {
        this.nowPlayingMoviesCurrentIndex = res['page'];
        this.nowPlayingMovies = this.nowPlayingMovies.concat(res['results']);
        if (this.nowPlayingMovies) {
          this.loadingMore = false;
        }
        // console.log(this.tvShowsList);
      });
  }

}

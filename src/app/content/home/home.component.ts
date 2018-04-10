import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
// Services
import { AppService } from '../../core/services/app.service';
import { ApiService } from '../../core/services/api/api.service';
// Constants
import { TMDB_IMAGES_BASE_URL, IMG_300, APP_SEO_NAME } from '../../constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  TMDB_IMAGES_BASE_URL: any;
  IMG_300: any;

  screenSize: number;

  nowPlayingMovies: any[];
  nowPlayingMoviesCurrentIndex: number;
  nowPlayingMoviesTotalResults: number;
  nowPlayingMoviesTotalPages: number;

  upcomingMovies: any[];
  upcomingMoviesCurrentIndex: number;
  upcomingMoviesTotalResults: number;
  upcomingMoviesTotalPages: number;

  loading = false;
  loadingMore = false;

  constructor(
    public meta: Meta,
    public title: Title,
    public as: AppService,
    private apis: ApiService
  ) {
    // // Set SEO Title, Keywords and Description Meta tags
    // this.title.setTitle('Looking for your next favorite movie? | ' + APP_SEO_NAME);
    // this.meta
    //   .updateTag(
    //     {
    //       name: 'description',
    //       // tslint:disable-next-line:max-line-length
    // tslint:disable-next-line:max-line-length
    //       content: APP_SEO_NAME + ' in 2018. Looking for your next favorite movie? Try the best selection of the current movie releases listed in their respective movie genres. Feel free to browse our wide selection of now playing Movies and upcoming movies to find the right movie that is playing near you right now!'
    //     }
    //   );
    // this.meta.updateTag(
    //   // tslint:disable-next-line:max-line-length
    // tslint:disable-next-line:max-line-length
    //   { name: 'keywords', content: 'current movie releases, current movies, movie releases, now playing movies, new releases, tv shows, celebrities, directors, producers, production companies, actors, actresses' },
    // );

    // Initialize Constants
    this.TMDB_IMAGES_BASE_URL = TMDB_IMAGES_BASE_URL;
    this.IMG_300 = IMG_300;

    // Scrolls to top of the page
    this.as.scrollToTop();

    // Calls the function that gets the list of movies from discover
    // if (!this.apis.homeMovies.length) {
    //   this.getMoviesForHomepage(1);
    // } else {
    //   this.timelineMovies = this.apis.homeMovies;
    //   this.timelineMoviesCurrentIndex = this.apis.homeMoviesLastIndex;
    //   this.timelineMoviesTotalPages = this.apis.homeMoviesTotalPages;
    //   this.timelineMoviesTotalResults = this.apis.homeMoviesTotalResults;
    // }

    // Get Upcoming Movies from either the Service Variable or API
    if (!this.apis.moviesUpcoming.length) {
      this.getUpcomingMovies(1);
    } else {
      this.upcomingMovies = this.apis.moviesUpcoming;
      this.upcomingMoviesCurrentIndex = this.apis.moviesUpcomingLastIndex;
      this.upcomingMoviesTotalPages = this.apis.moviesUpcomingTotalPages;
      this.upcomingMoviesTotalResults = this.apis.moviesUpcomingTotalResults;
    }

    // Get Now Playing Movies from either the Service Variable or API
    if (!this.apis.moviesNowPlaying.length) {
      this.getNowPlayingMovies(1);
    } else {
      this.nowPlayingMovies = this.apis.moviesNowPlaying;
      this.nowPlayingMoviesCurrentIndex = this.apis.moviesNowPlayingLastIndex;
      this.nowPlayingMoviesTotalPages = this.apis.moviesNowPlayingTotalPages;
      this.nowPlayingMoviesTotalResults = this.apis.moviesNowPlayingTotalResults;
    }
  }

  // Get movies for homepage from service
  // getMoviesForHomepage(pageIndex: number): void {
  //   this.loading = true;
  //   this.apis.getMoviesForHomepage(pageIndex)
  //     .subscribe((res) => {
  //       this.timelineMovies = res['results'];
  //       this.timelineMoviesCurrentIndex = res['page'];
  //       this.timelineMoviesTotalPages = res['total_pages'];
  //       this.timelineMoviesTotalResults = res['total_results'];
  //       if (this.timelineMovies) {
  //         this.loading = false;
  //       }
  //       console.log(this.timelineMovies);
  //     });
  // }

  // Get now playing movies from API
  getNowPlayingMovies(pageIndex: number): void {
    this.loading = true;
    this.apis.getNowPlayingMovies(pageIndex)
      .subscribe((res) => {
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
  // Get upcoming movies from API
  getUpcomingMovies(pageIndex: number): void {
    this.loading = true;
    this.apis.getUpcomingMovies(pageIndex)
      .subscribe((res) => {
        this.upcomingMovies = res['results'];
        this.upcomingMoviesCurrentIndex = res['page'];
        this.upcomingMoviesTotalPages = res['total_pages'];
        this.upcomingMoviesTotalResults = res['total_results'];
        if (this.upcomingMovies) {
          this.loading = false;
        }
        // console.log(this.upcomingMovies);
      });
  }

  // Load more movies from API
  loadMoreResults(pageIndex: number, src: string): void {
    this.loadingMore = true;
    if (src === 'upcoming') {
      this.apis.getUpcomingMovies(pageIndex)
        .subscribe((res) => {
          this.upcomingMoviesCurrentIndex = res['page'];
          this.upcomingMovies = this.upcomingMovies.concat(res['results']);
          if (this.upcomingMovies) {
            this.loadingMore = false;
          }
          // console.log(this.upcomingMovies);
        });
    } else if (src === 'now-playing') {
      this.apis.getNowPlayingMovies(pageIndex)
        .subscribe((res) => {
          this.nowPlayingMoviesCurrentIndex = res['page'];
          this.nowPlayingMovies = this.nowPlayingMovies.concat(res['results']);
          if (this.nowPlayingMovies) {
            this.loadingMore = false;
          }
          // console.log(this.nowPlayingMovies);
        });
    }
  }

}

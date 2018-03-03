import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
// RxJS
import { Subscription } from 'rxjs/Subscription';
// Services
import { AppService } from '../../services/app.service';
import { ApiService } from '../../services/api/api.service';
// Constants
import { TMDB_IMAGES_BASE_URL, IMG_185, APP_SEO_NAME } from '../../constants';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  TMDB_IMAGES_BASE_URL: any;
  IMG_185: any;

  routeParamsSubscription: Subscription;
  pageKey: any;
  pageTitle: string;
  currentMovieTab: any;
  movieGenresList: any[];
  latestMovies: any[];
  upcomingMovies: any[];
  upcomingMoviesCurrentIndex: number;
  upcomingMoviesTotalResults: number;
  upcomingMoviesTotalPages: number;
  nowPlayingMovies: any[];
  nowPlayingMoviesCurrentIndex: number;
  nowPlayingMoviesTotalResults: number;
  nowPlayingMoviesTotalPages: number;
  popularMovies: any[];
  popularMoviesCurrentIndex: number;
  popularMoviesTotalResults: number;
  popularMoviesTotalPages: number;
  topRatedMovies: any[];
  topRatedMoviesCurrentIndex: number;
  topRatedMoviesTotalResults: number;
  topRatedMoviesTotalPages: number;
  loading = false;
  loadingMore = false;

  constructor(
    public meta: Meta,
    public title: Title,
    private router: Router,
    private ar: ActivatedRoute,
    private as: AppService,
    private apis: ApiService
  ) {
    // Initialize Constants
    this.TMDB_IMAGES_BASE_URL = TMDB_IMAGES_BASE_URL;
    this.IMG_185 = IMG_185;

    // Generate Page Titles Based on Current URL
    this.routeParamsSubscription = this.ar.url
      .subscribe((params) => {
        this.as.scrollToTop();
        this.pageKey = params[1].path; // upcoming / now-playing / most-popular / top-rated
        if (this.pageKey === 'most-popular') {
          this.pageTitle = 'Most Popular Movies';
          this.setSEOMetaTags();
          if (!this.apis.moviesPopular.length) {
            this.getPopularMovies(1);
          } else {
            this.popularMovies = this.apis.moviesPopular;
            this.popularMoviesCurrentIndex = this.apis.moviesPopularLastIndex;
            this.popularMoviesTotalPages = this.apis.moviesPopularTotalPages;
            this.popularMoviesTotalResults = this.apis.moviesPopularTotalResults;
          }
          this.changeTab(2);
        } else if (this.pageKey === 'top-rated') {
          this.pageTitle = 'Top Rated Movies';
          this.setSEOMetaTags();
          if (!this.apis.moviesTopRated.length) {
            this.getTopRatedMovies(1);
          } else {
            this.topRatedMovies = this.apis.moviesTopRated;
            this.topRatedMoviesCurrentIndex = this.apis.moviesTopRatedLastIndex;
            this.topRatedMoviesTotalPages = this.apis.moviesTopRatedTotalPages;
            this.topRatedMoviesTotalResults = this.apis.moviesTopRatedTotalResults;
          }
          this.changeTab(3);
        } else if (this.pageKey === 'upcoming') {
          this.pageTitle = 'Upcoming Movies';
          this.setSEOMetaTags();
          if (!this.apis.moviesUpcoming.length) {
            this.getUpcomingMovies(1);
          } else {
            this.upcomingMovies = this.apis.moviesUpcoming;
            this.upcomingMoviesCurrentIndex = this.apis.moviesUpcomingLastIndex;
            this.upcomingMoviesTotalPages = this.apis.moviesUpcomingTotalPages;
            this.upcomingMoviesTotalResults = this.apis.moviesUpcomingTotalResults;
          }
          this.changeTab(0);
        } else if (this.pageKey === 'now-playing') {
          this.pageTitle = 'Now Playing Movies';
          this.setSEOMetaTags();
          if (!this.apis.moviesNowPlaying.length) {
            this.getNowPlayingMovies(1);
          } else {
            this.nowPlayingMovies = this.apis.moviesNowPlaying;
            this.nowPlayingMoviesCurrentIndex = this.apis.moviesNowPlayingLastIndex;
            this.nowPlayingMoviesTotalPages = this.apis.moviesNowPlayingTotalPages;
            this.nowPlayingMoviesTotalResults = this.apis.moviesNowPlayingTotalResults;
          }
          this.changeTab(1);
        }
      });
    this.getMovieGenres();
    // this.getLatestMovies();
  }

  ngOnInit(): void { }

  setSEOMetaTags(): void {
    // Set SEO Title, Keywords and Description Meta tags
    this.title.setTitle(this.pageTitle + ' - ' + APP_SEO_NAME);
    this.meta.addTags([
      { name: 'keywords', content: this.pageTitle + ',' + this.as.seoOptimizeText(this.pageKey) },
      { name: 'description', content: this.pageTitle + ' ' + this.as.seoOptimizeText(this.pageKey) + ' - ' + APP_SEO_NAME }
    ]);
  }

  getMovieGenres(): void {
    this.apis.getMovieGenres().subscribe((res) => {
      this.movieGenresList = res['genres'];
    });
  }

  goToGenresPage(genre: string): void {
    const seoURL = this.as.urlOptimizeText(genre);
    this.router.navigate(['/movies/genre/' + seoURL]);
  }

  getPopularMovies(pageIndex: number): void {
    this.loading = true;
    this.apis.getPopularMovies(pageIndex)
      .subscribe((res) => {
        this.popularMovies = res['results'];
        this.popularMoviesCurrentIndex = res['page'];
        this.popularMoviesTotalPages = res['total_pages'];
        this.popularMoviesTotalResults = res['total_results'];
        if (this.popularMovies) {
          this.loading = false;
        }
        // console.log(this.getPopularMovies);
      });
  }

  getTopRatedMovies(pageIndex: number): void {
    this.loading = true;
    this.apis.getTopRatedMovies(pageIndex)
      .subscribe((res) => {
        this.topRatedMovies = res['results'];
        this.topRatedMoviesCurrentIndex = res['page'];
        this.topRatedMoviesTotalPages = res['total_pages'];
        this.topRatedMoviesTotalResults = res['total_results'];
        if (this.topRatedMovies) {
          this.loading = false;
        }
        // console.log(this.topRatedMovies);
      });
  }

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

  onMovieTabChange($event): void {
    this.currentMovieTab = $event.index;
    console.log(this.currentMovieTab);
    if (this.currentMovieTab === 2 && !this.popularMovies) {
      this.loading = true;
      this.getPopularMovies(1);
    } else if (this.currentMovieTab === 3 && !this.topRatedMovies) {
      this.loading = true;
      this.getTopRatedMovies(1);
    } else if (this.currentMovieTab === 0 && !this.upcomingMovies) {
      this.loading = true;
      this.getUpcomingMovies(1);
    } else if (this.currentMovieTab === 1 && !this.nowPlayingMovies) {
      this.loading = true;
      this.getNowPlayingMovies(1);
    }
  }

  goToMoviesPage(page: string): void {
    // console.log(page);
    this.router.navigate(['/movies/' + page]);
  }

  changeTab(i: number): void {
    this.currentMovieTab = i;
  }

  loadMoreResults(pageIndex: number): void {
    this.loadingMore = true;
    if (this.pageKey === 'upcoming') {
      this.apis.getUpcomingMovies(pageIndex)
        .subscribe((res) => {
          this.upcomingMoviesCurrentIndex = res['page'];
          this.upcomingMovies = this.upcomingMovies.concat(res['results']);
          if (this.upcomingMovies) {
            this.loadingMore = false;
          }
          // console.log(this.moviesList);
        });
    } else if (this.pageKey === 'now-playing') {
      this.apis.getNowPlayingMovies(pageIndex)
        .subscribe((res) => {
          this.nowPlayingMoviesCurrentIndex = res['page'];
          this.nowPlayingMovies = this.nowPlayingMovies.concat(res['results']);
          if (this.nowPlayingMovies) {
            this.loadingMore = false;
          }
          // console.log(this.tvShowsList);
        });
    } else if (this.pageKey === 'most-popular') {
      this.apis.getPopularMovies(pageIndex)
        .subscribe((res) => {
          this.popularMoviesCurrentIndex = res['page'];
          this.popularMovies = this.popularMovies.concat(res['results']);
          if (this.popularMovies) {
            this.loadingMore = false;
          }
          // console.log(this.personsList);
        });
    } else if (this.pageKey === 'top-rated') {
      this.apis.getTopRatedMovies(pageIndex)
        .subscribe((res) => {
          this.topRatedMoviesCurrentIndex = res['page'];
          this.topRatedMovies = this.topRatedMovies.concat(res['results']);
          if (this.topRatedMovies) {
            this.loadingMore = false;
          }
          // console.log(this.personsList);
        });
    }
  }

}

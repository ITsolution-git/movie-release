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
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {

  TMDB_IMAGES_BASE_URL: any;
  IMG_185: any;

  routeParamsSubscription: Subscription;
  pageKey: string;
  pageTitle: string;
  genreType: string;
  genreId: string;
  movieGenresList: any[];
  moviesList: any[];
  currentPageIndex: number;
  totalResults: number;
  totalPages: number;
  loading = false;
  loadingMore = false;

  constructor(
    public meta: Meta,
    public title: Title,
    private router: Router,
    public as: AppService,
    private apis: ApiService,
    private ar: ActivatedRoute
  ) {
    // Initialize Constants
    this.TMDB_IMAGES_BASE_URL = TMDB_IMAGES_BASE_URL;
    this.IMG_185 = IMG_185;

    // Get the current genre name from the URL
    this.routeParamsSubscription = this.ar.url
      .subscribe(
        params => {
          this.genreType = params[0].path;
          this.pageKey = params[2].path;
          if (this.genreType === 'movies') {
            // console.log('movies');
            this.pageTitle = this.pageKey.toLowerCase().split(' ').map(x => x[0].toUpperCase() + x.slice(1)).join(' ');
            this.pageTitle = this.as.seoOptimizeText(this.pageTitle);
            this.moviesList = [];
            this.getMovieGenres().then(() => {
              this.setSEOMetaTags();
              this.getMovieGenreId(this.pageKey);
            });
          }
        });
  }

  ngOnInit(): void { }


  setSEOMetaTags(): void {
    // Set SEO Title, Keywords and Description Meta tags
    this.title.setTitle(this.pageTitle + ' ' + (this.genreType.replace('-', ' ')).toLowerCase().split(' ')
      .map(x => x[0].toUpperCase() + x.slice(1))
      .join(' ') + ' | ' + APP_SEO_NAME);
    this.meta.updateTag(
      { name: 'description', content: this.pageTitle + ' ' + this.as.seoOptimizeText(this.genreType) + ' ' + APP_SEO_NAME }
    );
    this.meta.updateTag(
      { name: 'keywords', content: this.pageTitle + ',' + this.as.seoOptimizeText(this.genreType) },
    );
  }

  // Movies Functions
  getMovieGenres(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apis.getMovieGenres().subscribe((res) => {
        this.movieGenresList = res['genres'];
        resolve();
      });
    });
  }

  getMovieGenreId(genreName: string): void {
    this.apis.getMovieGenreIdByGenreName(genreName)
      .then((res) => {
        this.genreId = res;
        // console.log(this.genreId);
        if (this.genreId) {
          this.getMoviesByGenre(1);
        }
      });
  }

  getMoviesByGenre(pageIndex: number): void {
    this.loading = true;
    this.apis.getMoviesByGenre(this.genreId, this.pageKey, pageIndex)
      .subscribe((res) => {
        this.currentPageIndex = res['page'];
        this.totalPages = res['total_pages'];
        this.totalResults = res['total_results'];
        this.moviesList = this.moviesList.concat(res['results']);
        if (this.moviesList) {
          this.loading = false;
        }
      });
  }

  goToMovieGenresPage(genre: string): void {
    const seoURL = this.as.urlOptimizeText(genre);
    this.router.navigate(['/movies/genre/' + seoURL]);
  }

  // Load More Results
  loadMoreResults(pageIndex: number) {
    // console.log(pageIndex);
    this.loadingMore = true;
    if (this.genreType === 'movies') {
      this.apis.getMoviesByGenre(this.genreId, this.pageKey, pageIndex)
        .subscribe((res) => {
          this.currentPageIndex = res['page'];
          this.moviesList = this.moviesList.concat(res['results']);
          if (this.moviesList) {
            this.loadingMore = false;
          }
          // console.log(this.moviesList);
        });
    }
  }

}

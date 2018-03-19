import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
// Services
import { AppService } from '../../services/app.service';
import { ApiService } from '../../services/api/api.service';
// Constants
import { TMDB_IMAGES_BASE_URL, IMG_185, APP_SEO_NAME } from '../../constants';

@Component({
  selector: 'app-main-movies-directory',
  templateUrl: './main-movies-directory.component.html',
  styleUrls: ['./main-movies-directory.component.css']
})
export class MainMoviesDirectoryComponent implements OnInit {

  TMDB_IMAGES_BASE_URL: any;
  IMG_185: any;

  screenSize: number;

  mainDirectoryMovies: any[];
  mainDirectoryCurrentIndex: number;
  mainDirectoryTotalResults: number;
  mainDirectoryTotalPages: number;

  loading = false;
  loadingMore = false;

  constructor(
    public meta: Meta,
    public title: Title,
    public as: AppService,
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
    // Calls the function that gets the list of movies and tv shows for the sliders

    if (!this.apis.mainDirectoryMovies.length) {
      this.getMoviesForMainDirectory(1);
    } else {
      this.mainDirectoryMovies = this.apis.mainDirectoryMovies;
      this.mainDirectoryCurrentIndex = this.apis.mainDirectoryMoviesLastIndex;
      this.mainDirectoryTotalPages = this.apis.mainDirectoryMoviesTotalPages;
      this.mainDirectoryTotalResults = this.apis.mainDirectoryMoviesTotalResults;
    }
  }

  ngOnInit(): void { }

  // Get movies for homepage from service
  getMoviesForMainDirectory(pageIndex: number): void {
    this.loading = true;
    this.apis.getMoviesForMainDirectory(pageIndex)
      .subscribe((res) => {
        this.mainDirectoryMovies = res['results'];
        this.mainDirectoryCurrentIndex = res['page'];
        this.mainDirectoryTotalPages = res['total_pages'];
        this.mainDirectoryTotalResults = res['total_results'];
        if (this.mainDirectoryMovies) {
          this.loading = false;
        }
        console.log(this.mainDirectoryMovies);
      });
  }

  loadMoreResults(pageIndex: number): void {
    this.loadingMore = true;

    this.apis.getMoviesForMainDirectory(pageIndex)
      .subscribe((res) => {
        this.mainDirectoryCurrentIndex = res['page'];
        this.mainDirectoryMovies = this.mainDirectoryMovies.concat(res['results']);
        if (this.mainDirectoryMovies) {
          this.loadingMore = false;
        }
        console.log(this.mainDirectoryMovies);
      });
  }

}

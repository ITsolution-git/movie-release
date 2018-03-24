import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// Services
import { SitemapService } from '../../core/services/sitemap/sitemap.service';
import { ApiService } from '../../core/services/api/api.service';
import { FirebaseService } from '../../core/services/firebase/firebase.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  duplicateTitles: any[] = [];
  duplicateMovieDetails: any;
  loading: boolean;

  constructor(
    private router: Router,
    private apis: ApiService,
    private sm: SitemapService,
    private fS: FirebaseService
  ) {
    this.getAllMoviesResults();
  }

  ngOnInit(): void { }

  // Get Data From TMDB API
  getAPIConfig(): void {
    this.apis.getAPIConfig();
  }
  getMovieGenres(): void {
    this.apis.getMovieGenres();
  }

  // Generate Sitemaps
  generateMoviesSitemap(): void {
    this.sm.generateMoviesSitemap();
  }
  generateMoviesCategoriesSitemap(): void {
    // this.sm.generateMoviesCategoriesSitemap();
  }
  generateMovieGenresSitemap(): void {
    this.sm.generateMoviesSitemap();
  }

  getAllMoviesResults(): void {
    this.duplicateTitles = [];
    this.loading = true;
    this.fS.getAllMoviesResults()
      .then(res => {
        this.checkDuplicateMovieTitles('slug', res)
          .then(duplicates => {
            for (let i = 0; i < duplicates.length; i++) {
              // console.log(duplicates[i]);
              const element = duplicates[i];
              this.getDuplicateMovieDetailsBySlug(element)
                .then(movie => {
                  // console.log(movie);
                  this.duplicateTitles.push(movie);
                  // console.log(this.duplicateTitles);
                  this.loading = false;
                });
            }
          });
      });
  }

  checkDuplicateMovieTitles(propertyName, collection): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const duplicateTitles = [];
      const moviesObject = {};
      collection.map((item) => {
        const moviePropertyName = item[propertyName];
        if (moviePropertyName in moviesObject) {
          duplicateTitles.push(moviePropertyName);
        } else {
          moviesObject[moviePropertyName] = item;
          delete item.duplicate;
        }
      });
      resolve(duplicateTitles);
    });
  }

  getDuplicateMovieDetailsByTitle(movieTitle: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.fS.getMoviesByTitle(movieTitle)
        .then(res => {
          resolve(res);
          // this.duplicateMovieDetails = res;
          // console.log(this.duplicateMovieDetails);
        });
    });
  }

  getDuplicateMovieDetailsBySlug(movieSlug: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.fS.getMoviesBySlug(movieSlug)
        .then(res => {
          resolve(res);
          // this.duplicateMovieDetails = res;
          // console.log(this.duplicateMovieDetails);
        });
    });
  }

}

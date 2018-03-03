import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SitemapService {

  constructor(
    private http: HttpClient
  ) { }

  generateMoviesSitemap() {
    this.http.get('/sitemap-movies').subscribe(res => console.log(res));
  }

  generateMovieGenresSitemap() {
    this.http.get('/sitemap-movie-genres').subscribe(res => console.log(res));
  }

}

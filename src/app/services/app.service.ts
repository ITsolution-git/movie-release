import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppService {

  constructor(
    private http: HttpClient
  ) { }

  urlOptimizeText(text: string): string {
    const urlText = text.toLowerCase().replace(/[^a-zA-Z0-9-$@]+/gm, '-');
    return urlText;
  }

  seoOptimizeText(text: string): string {
    const seoText = text.replace(/-/g, ' ');
    return seoText;
  }
  scrollToTop() {
    window.scrollTo(0, 0);
  }

  generateMoviesSitemap() {
    this.http.get('/sitemap-movies')
      .subscribe((res) => {
        console.log(res);
      });
  }

}

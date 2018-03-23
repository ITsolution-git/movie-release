import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SitemapService } from '../../core/services/sitemap/sitemap.service';
import { ApiService } from '../../core/services/api/api.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(
    private router: Router,
    private apis: ApiService,
    private sm: SitemapService
  ) { }

  ngOnInit() {
  }

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

}

import { Component, OnInit } from '@angular/core';
// Services
import { SitemapService } from '../../../core/services/sitemap/sitemap.service';

@Component({
  selector: 'app-sitemaps-generator-tool',
  templateUrl: './sitemaps-generator-tool.component.html',
  styleUrls: ['./sitemaps-generator-tool.component.css']
})
export class SitemapsGeneratorToolComponent implements OnInit {

  constructor(
    private sm: SitemapService
  ) { }

  ngOnInit(): void { }

  // Generate Sitemaps
  generateMoviesSitemap(): void {
    this.sm.generateMoviesSitemap();
  }
  generateMovieGenresSitemap(): void {
    this.sm.generateMovieGenresSitemap();
  }

}

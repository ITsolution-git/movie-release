import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
// Constants
import { APP_SEO_NAME } from '../../constants';
@Injectable()
export class SeoService {

  constructor(
    private title: Title,
    private meta: Meta
  ) {}

  // setSEOMetaTags(title: string, keywords: string[],  
  // description: string): void {
  //   // Set SEO Title, Keywords and Description Meta tags
  //   // tslint:disable-next-line:max-line-length
  //   this.title.setTitle(this.movieDetails.title + ' (' + this.movieDetails.release_date.substr(0, 4) + ') - ' + this.movieDetails.genres[0].name + ' Movie | ' + APP_SEO_NAME);
  //   this.meta.addTags([
  //     { name: 'keywords', content: this.movieDetails.title + ', movie, film, ' + this.movieDetails.genres[0] },
  //     // tslint:disable-next-line:max-line-length
  //     { name: 'description', content: this.movieDetails.title + ' (' + this.movieDetails.release_date.substr(0, 4) + ') - ' + this.movieDetails.genres[0].name + ' Movie. ' + this.movieDetails.overview + ' ' + APP_SEO_NAME }
  //   ]);
  // }

}

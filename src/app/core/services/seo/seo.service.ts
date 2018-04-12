import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
// Constants
import { APP_SEO_NAME } from '../../../constants';
import { APP_BASE_URL } from '../../../constants';
import { DEFAULT_POSTER_IMG } from '../../../constants';
@Injectable()
export class SeoService {

  constructor(
    private title: Title,
    private meta: Meta
  ) { }

  setSeoMetaTags(title: string, description: string, keywords: string): void {
    console.log('SEO SERVICE TITLE: ' + title + ' DESCRIPTION: ' + description.substring(0, 300) + ' KEYWORDS: ' + keywords);
    // Set SEO Title, Keywords and Description Meta tags
    this.title.setTitle(title + ' | ' + APP_SEO_NAME);
    this.meta.updateTag(
      { name: 'description', content: description.substring(0, 300) + ' | ' + APP_SEO_NAME }
    );
    this.meta.updateTag(
      { name: 'keywords', content: description + ' | ' + APP_SEO_NAME },
    );
    this.meta.updateTag(
      { property: 'og:title',  content: APP_SEO_NAME },
    );
    this.meta.updateTag(
      { property: 'og:url',  content: APP_BASE_URL },
    );
    this.meta.updateTag(
      { property: 'og:type',  content: 'website'},
    );
    this.meta.updateTag(
      { property: 'og:title',  content: APP_SEO_NAME },
    );
    this.meta.updateTag(
      { property: 'og:description',  content: description.substring(0, 300) + ' | ' + APP_SEO_NAME },
    );
    this.meta.updateTag(
      { property: 'og:image',  content: DEFAULT_POSTER_IMG },
    );
  }
}

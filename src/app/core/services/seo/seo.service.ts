import { Injectable, RendererFactory2, ViewEncapsulation, Inject } from '@angular/core';
import { Meta, Title, DOCUMENT } from '@angular/platform-browser';
// Constants
import { APP_SEO_NAME, APP_BASE_URL, DEFAULT_POSTER_IMG, DEFAULT_FB_CAT_IMG } from '../../../constants';

@Injectable()
export class SeoService {

  constructor(
    private title: Title,
    private meta: Meta,
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document
  ) { }

  setSeoMetaTags(title: string, description: string, keywords: string): void {
    // console.log('SEO SERVICE TITLE: ' + title + ' DESCRIPTION: ' + description.substring(0, 300) + ' KEYWORDS: ' + keywords);
    // Set SEO Title, Keywords and Description Meta tags
    this.title.setTitle(title + ' | ' + APP_SEO_NAME);
    this.meta.updateTag(
      { name: 'description', content: description.substring(0, 300) }
    );
    this.meta.updateTag(
      { name: 'keywords', content: keywords + ' | ' + APP_SEO_NAME },
    );
  }

  setFacebookMetaTags(title: string, pageURL: string, description: string, thumbImg: string, OGtype?: string) {
    // Facebook OG Tags
    this.meta.updateTag(
      { property: 'og:title', content: title },
    );
    this.meta.updateTag(
      { property: 'og:url', content: pageURL },
    );
    if (OGtype) {
      this.meta.updateTag(
        { property: 'og:type', content: OGtype },
      );
    } else {
      this.meta.updateTag(
        { property: 'og:type', content: 'website' },
      );
    }
    this.meta.updateTag(
      { property: 'og:description', content: description.substring(0, 300) },
    );
    this.meta.updateTag(
      { property: 'og:image', content: thumbImg },
    );
  }

  setCanonicalURL(canonicalObj: ICanonicalLink) {

    try {
      const renderer = this.rendererFactory
        .createRenderer(this.document, {
          id: '-1',
          encapsulation: ViewEncapsulation.None,
          styles: [],
          data: {}
        });

      // Initialize Head Section
      const headTag = this.document.head;
      // Create New Link Tag
      const linkTag = renderer.createElement('link');

      // Check if <head> tag exists in DOM
      if (headTag === null) {
        throw new Error('<head> not found within DOCUMENT.');
      }

      // Set the attribute values of link tag
      Object.keys(canonicalObj).forEach((attr: string) => {
        return renderer.setAttribute(linkTag, attr, canonicalObj[attr]);
      });

      // Check if Canonical Link Tag already Exists in the DOM
      this.checkIfCanonicalLinkTagExists()
        .then(() => {
          // Add New Canonical Link Tag
          console.log('XXX: ADDING NEW CANONICAL: ', linkTag);
          renderer.appendChild(headTag, linkTag);
        })

    } catch (err) {
      console.error('Error within linkService : ', err);
    }
  }

  checkIfCanonicalLinkTagExists(): Promise<any> {
    return new Promise<any>((resolve, reject) => {

      const linkTags = this.document.querySelectorAll('link[rel]');
      console.log('XXX: LINK TAGS', linkTags);

      for (let i = 0; i < linkTags.length; i++) {
        const element = linkTags[i];
        if (element.attributes.rel.nodeValue === 'canonical') {
          console.log('XXX CANONICAL FOUND! RES:', element, ' | ', i);
          this.removeTag(element)
            .then(() => {
              resolve();
            })
          break;
        } else {
          console.log('XXX NO CANONICAL FOUND YET ...!');
          if (i === linkTags.length - 1) {
            resolve();
          }
        }
      }
    })
  }

  removeTag(element: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {

      console.log('XXX CANONICAL TO REMOVE: ', element);

      if (element) {
        try {
          const renderer = this.rendererFactory.createRenderer(this.document, {
            id: '-1',
            encapsulation: ViewEncapsulation.None,
            styles: [],
            data: {}
          });

          const head = this.document.head;

          if (head === null) {
            throw new Error('<head> not found within DOCUMENT.');
          }

          renderer.removeChild(head, element);
          resolve();

        } catch (err) {
          console.log('Error while removing tag ' + err.message);
        }
      }
    })
  }
}

export declare type ICanonicalLink = {
  href: string;
  rel: string;
}

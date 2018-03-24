import { TestBed, inject } from '@angular/core/testing';

import { SitemapService } from './sitemap.service';

describe('SitemapService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SitemapService]
    });
  });

  it('should be created', inject([SitemapService], (service: SitemapService) => {
    expect(service).toBeTruthy();
  }));
});

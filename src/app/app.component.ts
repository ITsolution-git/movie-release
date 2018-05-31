import { Component, ViewContainerRef, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router, NavigationEnd } from '@angular/router';
// Third Party
import { LoadingBarService } from '@ngx-loading-bar/core';
// Services
import { SeoService } from './core/services/seo/seo.service';
// Constants
import { APP_BASE_URL } from './constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;
  public loadPercent = 0;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public toastr: ToastsManager,
    vRef: ViewContainerRef,
    private router: Router,
    public loader: LoadingBarService,
    private seoService: SeoService
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Set Google Analytics Routes
        (<any>window).gtag('config', 'UA-9011937-10', { 'page_path': event.urlAfterRedirects });
        (<any>window).gtag('event', 'page_view', { 'send_to': 'UA-9011937-10' });

        // Sets Canonical URL in <head>
        this.seoService.setCanonicalURL({ rel: 'canonical', href: `${APP_BASE_URL}${event.urlAfterRedirects}` });
      }
    });

    loader.progress$.subscribe(val => {
      this.loadPercent = val;
    });

    this.toastr.setRootViewContainerRef(vRef);
    document.body.className = 'home';

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}

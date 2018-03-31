import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
// AngularFire
import { AngularFireDatabase } from 'angularfire2/database';
// RxJS
import { Subscription } from 'rxjs/Subscription';
// Services
import { AppService } from '../../core/services/app.service';
import { ApiService } from '../../core/services/api/api.service';
// Constants
import { TMDB_IMAGES_BASE_URL, IMG_185, IMG_500, APP_SEO_NAME, DB_COL } from '../../constants';

@Component({
  selector: 'app-celeb-details',
  templateUrl: './celeb-details.component.html',
  styleUrls: ['./celeb-details.component.css']
})
export class CelebDetailsComponent implements OnInit {

  TMDB_IMAGES_BASE_URL: any;
  IMG_185: any;
  IMG_500: any;

  routeParamsSubscription: Subscription;
  pageKey: string;
  actorId: string;
  actorDetails: any;
  actorLinks: any;
  actorImages: any[];
  actorTaggedImages: any;
  movieCasts: any[];
  movieCrew: any[];
  movieCreditsLength: number;
  currentInfoTab: number;

  isMoreInfoOpen = false;
  isLoadingInfo = false;
  isLoadingImages = false;
  celebCounter = 0;

  currentProfilePic: number;
  profilePicsList: NodeListOf<Element>;
  profilePicsLength: number;

  constructor(
    public meta: Meta,
    public title: Title,
    private router: Router,
    private as: AppService,
    private apis: ApiService,
    private ar: ActivatedRoute,
    private afDb: AngularFireDatabase
  ) {
    // Initialize Constants
    this.TMDB_IMAGES_BASE_URL = TMDB_IMAGES_BASE_URL;
    this.IMG_185 = IMG_185;
    this.IMG_500 = IMG_500;

    this.ar.url.subscribe(() => {
      this.resetTabs(0);
      this.as.scrollToTop();
      this.currentProfilePic = 0;
      this.isMoreInfoOpen = false;
      this.movieCasts = undefined;
      this.actorLinks = undefined;
    });

    // Get the genre name from the URL
    this.routeParamsSubscription = this.ar.params
      .subscribe(
        params => {
          this.pageKey = params['name'];
          ++this.celebCounter;
          if (this.celebCounter === 1) {
            this.convertCelebNameToId(this.pageKey)
              .then(() => {
                this.getActorDetails()
                  .then(() => {
                    this.setSEOMetaTags();
                    this.getActorImages();
                    this.getActorTaggedImages();
                  });
              });
          }
        });
  }

  ngOnInit(): void { }

  convertCelebNameToId(name: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const celeb = this.afDb.list(DB_COL.CELEBS_RESULTS, ref => ref.orderByChild('slug').equalTo(name));
      // console.log(celeb);
      celeb.valueChanges()
        .subscribe(res => {
          // console.log('CELEB ID: ', res[0]['id']);
          this.actorId = (res[0]['id']).toString();
          resolve(this.actorId);
        });
    });
  }

  setSEOMetaTags(): void {
    // Set SEO Title, Keywords and Description Meta tags
    this.title.setTitle(this.actorDetails.name + ' Latest Movies, Biography');
    this.meta.updateTag(
      { name: 'description', content: this.actorDetails.biography + ' - ' + APP_SEO_NAME }
    );
    this.meta.updateTag(
      { name: 'keywords', content: this.actorDetails.name + ', celebrity, actor, actress, person, popular' },
    );
  }

  getActorDetails(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apis.getActorDetails(this.actorId)
        .subscribe((res) => {
          this.actorDetails = res;
          // console.log(this.actorDetails);
          resolve();
        });
    });
  }

  getActorMovieCredits(): void {
    this.apis.getActorMovieCredits(this.actorId)
      .subscribe((res) => {
        this.movieCasts = res['cast'];
        this.movieCrew = res['crew'];
        this.movieCreditsLength = (res['cast']).length;
        // console.log(res);
        if (this.movieCasts && this.movieCrew) {
          this.isLoadingInfo = false;
        }
      });
  }

  getActorExternalLinks(): void {
    this.apis.getActorExternalLinks(this.actorId)
      .subscribe((res) => {
        this.actorLinks = res;
        if (this.actorLinks) {
          this.isLoadingInfo = false;
        }
        // console.log(this.actorLinks);
      });
  }

  getActorImages(): void {
    this.apis.getActorImages(this.actorId)
      .subscribe((res) => {
        this.actorImages = res['profiles'];
        this.profilePicsLength = res['profiles'].length;
        // this.currentProfilePic = this.profilePicsLength - 1;
        // console.log(this.actorImages);
      });
  }

  getActorTaggedImages(): void {
    this.apis.getActorTaggedImages(this.actorId, 1) // fix
      .subscribe((res) => {
        this.actorTaggedImages = res['results'];
        // console.log(this.actorTaggedImages);
      });
  }

  getMoreActorDetails(): void {
    this.getActorExternalLinks();
  }

  toggleMoreInfo(): void {
    if (!this.isMoreInfoOpen && !this.actorLinks) {
      this.getMoreActorDetails();
    }
    this.isMoreInfoOpen = !this.isMoreInfoOpen;
  }

  onInfoTabChange($event): void {
    this.currentInfoTab = $event.index;
    if (this.currentInfoTab === 1 && !this.movieCasts) {
      this.isLoadingInfo = true;
      this.getActorMovieCredits();
    }
  }

  prevProfilePic(): void {
    // console.log('IN: ', this.currentProfilePic);
    const profileCont = document.getElementById('profile-pic-container');
    this.profilePicsList = profileCont.getElementsByClassName('profile-pic');
    if (this.currentProfilePic === 0) {
      this.currentProfilePic = this.profilePicsLength - 1;
      this.profilePicsList[0].setAttribute('class', 'profile-pic');
      this.profilePicsList[this.profilePicsLength - 1].setAttribute('class', 'active profile-pic');
      // console.log('OUT: ', this.currentProfilePic);
    } else {
      this.currentProfilePic -= 1;
      this.profilePicsList[this.currentProfilePic + 1].setAttribute('class', 'profile-pic');
      this.profilePicsList[this.currentProfilePic].setAttribute('class', 'active profile-pic');
      // console.log('OUT: ', this.currentProfilePic);
    }
  }

  nextProfilePic(): void {
    // console.log('IN: ', this.currentProfilePic);
    const profileCont = document.getElementById('profile-pic-container');
    this.profilePicsList = profileCont.getElementsByClassName('profile-pic');
    if (this.currentProfilePic === this.profilePicsLength - 1) {
      this.currentProfilePic = 0;
      this.profilePicsList[this.profilePicsLength - 1].setAttribute('class', 'profile-pic');
      this.profilePicsList[0].setAttribute('class', 'active profile-pic');
      // console.log('OUT: ', this.currentProfilePic);
    } else {
      this.currentProfilePic += 1;
      this.profilePicsList[this.currentProfilePic - 1].setAttribute('class', 'profile-pic');
      this.profilePicsList[this.currentProfilePic].setAttribute('class', 'active profile-pic');
      // console.log('OUT: ', this.currentProfilePic);
    }
  }

  resetTabs(i: number): void {
    this.currentInfoTab = i;
  }

  openImageGallery(imgPath: string): void {
    console.log(imgPath);
  }

}

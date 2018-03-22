import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { Meta, Title } from '@angular/platform-browser';
// AngularFire
import { AngularFireAuth } from 'angularfire2/auth';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject
} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
// Services
import { AppService } from '../../services/app.service';
import { ApiService } from '../../services/api/api.service';
import { AuthService } from '../../core/auth/auth.service';
// Constants
import { TMDB_IMAGES_BASE_URL, IMG_45, IMG_185, IMG_500, IMG_ORIG, APP_SEO_NAME, DB_COL } from '../../constants';
// Component
import { TrailersDialogComponent } from '../shared/trailers-dialog/trailers-dialog.component';
import { AuthDialogComponent } from '../shared/auth-dialog/auth-dialog.component';

export interface ICastData {
  actorImg: string;
  actorName: string;
  character: string;
}

export interface ICrewData {
  crewImg: string;
  crewName: string;
  crewJob: string;
  department: string;
}

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  TMDB_IMAGES_BASE_URL: any;
  IMG_45: any;
  IMG_185: any;
  IMG_500: any;
  IMG_ORIG: any;

  routeParamsSubscription: Subscription;
  pageKey: string;
  movieId: any;
  movieDetails: any;
  movieCreditsCast: ICastData[];
  movieCreditsCrew: ICrewData[];
  movieLinks: any[];
  movieImages: any[];
  movieImagesLength: number;
  movieKeywords: any[];
  movieReleaseDates: any[];
  movieTrailers: any[];
  movieTrailersLength: number;
  similarMovies: any[];
  recommendedMovies: any[];
  movieReviews: any[];
  movieTranslations: any[];
  movieAltTitles: any[];

  movieArticles: any[];

  defaulPersonImage: any;
  defaultPosterImage: any;
  defaultMovieImage: any;

  Math: any;

  currentInfoTab: any;
  currentMoviesTab: any;

  isMoreInfoOpen = false;
  isLoadingInfo = false;
  isLoadingMovies = false;

  releaseDatesColumns = ['date', 'certification', 'country'];
  releaseDatesSource: MatTableDataSource<any>;
  castColumns = ['actorImg', 'actorName', 'character'];
  castSource: MatTableDataSource<ICastData>;
  crewColumns = ['crewImg', 'crewName', 'crewJob', 'department'];
  crewSource: MatTableDataSource<ICrewData>;

  @ViewChild(MatPaginator) castPaginator: MatPaginator;
  @ViewChild(MatPaginator) crewPaginator: MatPaginator;
  @ViewChild(MatSort) castSort: MatSort;
  @ViewChild(MatSort) crewSort: MatSort;
  @ViewChild(MatSort) releaseDateSort: MatSort;

  favMoviesRef: AngularFireList<any>;
  favMoviesObsRef: Observable<{}[]>;
  favMovies: any[];

  movieRatingsRef: AngularFireList<any>;
  movieRatingsObsRef: Observable<{}[]>;
  currentUserRatingObsRef: Observable<{}>;
  userMovieRatingsRef: AngularFireList<any>;
  currentUserRating = 0;
  fbRatingsLength: number;
  fbRatingAverage: number;
  cobinedRatingAverage: number;

  isFavorited = false;
  isShareOpen = false;
  getMovieDetailsCounter = 0;

  constructor(
    public meta: Meta,
    public title: Title,
    private router: Router,
    public as: AppService,
    private apis: ApiService,
    private ar: ActivatedRoute,
    public dialog: MatDialog,
    private afDb: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) {

    // Initialize Constants
    this.TMDB_IMAGES_BASE_URL = TMDB_IMAGES_BASE_URL;
    this.IMG_45 = IMG_45;
    this.IMG_185 = IMG_185;
    this.IMG_500 = IMG_500;
    this.IMG_ORIG = IMG_ORIG;

    this.ar.url.subscribe((res) => {
      // Reset Property Val;ues on Route Change
      this.resetTabs(0);
      this.as.scrollToTop();
      this.isMoreInfoOpen = false;
      this.isShareOpen = false;
      this.movieCreditsCast = undefined;
      this.movieCreditsCrew = undefined;
      this.castSource = undefined;
      this.crewSource = undefined;
      this.movieReviews = undefined;
      this.movieReleaseDates = undefined;
      this.releaseDatesSource = undefined;
      this.movieLinks = undefined;
      this.movieTranslations = undefined;
      this.movieAltTitles = undefined;
      this.movieId = undefined;

      // Get the movie title and ID from the URL
      this.routeParamsSubscription = this.ar.params
        .subscribe(params => {
          this.pageKey = params['title'];
          ++this.getMovieDetailsCounter;
          if (this.getMovieDetailsCounter === 1) {
            this.convertTitleToId(this.pageKey)
              .then(() => {
                this.getMovieDetails()
                  .then(() => {
                    this.setSEOMetaTags();
                    this.getMovieKeywords();
                    this.getMovieImages();
                    this.getMovieTrailers();
                    this.getRecommemdedMovies();
                    // Initialize Firebase Ratings
                    this.movieRatingsObsRef = this.afDb.list(DB_COL.MOVIE_RATINGS + '/' + this.movieId).valueChanges();
                    this.movieRatingsRef = this.afDb.list(DB_COL.MOVIE_RATINGS + '/' + this.movieId);
                    this.calculateNewAverageRating();
                  }).then(() => {
                    this.getMovieDetailsCounter = 0;
                    this.getMovieArticles(Number(this.movieId));
                  });
                this.afAuth.authState.subscribe(userRes => {
                  if (userRes && userRes.uid) {
                    // Initialize User Favorites Collection
                    this.favMoviesRef = this.afDb.list(DB_COL.USERS + '/' + userRes.uid + '/fav_movies');
                    this.favMoviesObsRef = this.afDb.list(DB_COL.USERS + '/' + userRes.uid + '/fav_movies').valueChanges();
                    this.userMovieRatingsRef = this.afDb.list(DB_COL.USERS + '/' + userRes.uid + '/movie_ratings');
                    // tslint:disable-next-line:max-line-length
                    this.currentUserRatingObsRef = this.afDb.object(DB_COL.MOVIE_RATINGS + '/' + this.movieId + '/' + userRes.uid).valueChanges();
                    this.checkIfMovieRatedByCurrentUser();
                    this.checkIfMovieFavorited();
                  }
                });
              });
          }
        });
    });

    this.Math = Math;
  }

  ngOnInit(): void { }

  setSEOMetaTags(): void {
    // Set SEO Title, Keywords and Description Meta tags
    // tslint:disable-next-line:max-line-length
    this.title.setTitle(this.movieDetails.title + ' (' + this.movieDetails.release_date.substr(0, 4) + ') - ' + this.movieDetails.genres[0].name + ' Movie | ' + APP_SEO_NAME);
    this.meta.updateTag(
      // tslint:disable-next-line:max-line-length
      { name: 'description', content: this.movieDetails.title + ' (' + this.movieDetails.release_date.substr(0, 4) + ') - ' + this.movieDetails.genres[0].name + ' Movie. ' + this.movieDetails.overview + ' ' + APP_SEO_NAME }
    );
    this.meta.updateTag(
      { name: 'keywords', content: this.movieDetails.title + ', movie, film, ' + this.movieDetails.genres[0] },
    );
  }

  // Convert Movie Title to Movie Id
  convertTitleToId(title: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const movie = this.afDb.list(DB_COL.MOVIES_RESULTS, ref => ref.orderByChild('slug').equalTo(title));
      movie.valueChanges().subscribe(res => {
        this.movieId = (res[0]['id']).toString();
        resolve(this.movieId);
      });
    });
  }

  // Calculate the average rating based on TMDB + Firebase
  calculateNewAverageRating() {
    this.movieRatingsObsRef
      .subscribe(res => {
        this.fbRatingsLength = res.length;
        let fbRatingTotal = 0;

        for (let i = 0; i < this.fbRatingsLength; i++) {
          fbRatingTotal = fbRatingTotal + res[i]['rating'];
        }

        // if movie not yet rated by CMR
        if (fbRatingTotal === 0) {
          this.fbRatingAverage = 0;
          this.cobinedRatingAverage = this.movieDetails.vote_average / 2;
        } else {
          this.fbRatingAverage = fbRatingTotal / this.fbRatingsLength;
          if (this.movieDetails.vote_average === 0) {
            this.cobinedRatingAverage = this.fbRatingAverage;
          } else {
            // tslint:disable-next-line:max-line-length
            this.cobinedRatingAverage = ((this.movieDetails.vote_count * (this.movieDetails.vote_average / 2)) + (fbRatingTotal)) / (this.movieDetails.vote_count + this.fbRatingsLength);
          }
        }
      });
  }

  checkIfMovieRatedByCurrentUser() {
    this.currentUserRatingObsRef
      .subscribe(res => {
        if (res) {
          this.currentUserRating = res['rating'];
        } else {
          this.currentUserRating = 0;
        }
      });
  }

  checkIfMovieFavorited() {
    // Check if movies is already favorited
    this.favMoviesObsRef
      .subscribe(resp => {
        this.isFavorited = false;
        resp.forEach(fav => {
          if (fav['id'] === this.movieId) {
            this.isFavorited = true;
          }
        });
      });
  }

  getMovieDetails(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apis.getMovieDetails(this.movieId)
        .subscribe((res) => {
          this.movieDetails = res;
          resolve();
        });
    });

  }
  getMovieCredits(): void {
    this.apis.getMovieCredits(this.movieId)
      .subscribe((res) => {
        this.movieCreditsCast = res['cast'];
        this.movieCreditsCrew = res['crew'];
        if (this.movieCreditsCast && this.movieCreditsCrew) {
          this.castSource = new MatTableDataSource(this.movieCreditsCast);
          this.crewSource = new MatTableDataSource(this.movieCreditsCrew);
          if (this.castSource && this.crewSource) {
            this.castSource.sort = this.castSort;
            this.castSource.paginator = this.castPaginator;
            this.crewSource.sort = this.crewSort;
            this.crewSource.paginator = this.crewPaginator;
          }
          this.isLoadingInfo = false;
        }
      });
  }
  getMovieImages(): void {
    this.apis.getMovieImages(this.movieId)
      .subscribe((res) => {
        this.movieImages = res['posters'];
        this.movieImagesLength = this.movieImages.length;
      });
  }
  getMovieKeywords(): void {
    this.apis.getMovieKeywords(this.movieId)
      .subscribe((res) => {
        this.movieKeywords = res['keywords'];
      });
  }
  getMovieReleaseDates(): void {
    this.apis.getMovieReleaseDates(this.movieId)
      .subscribe((res) => {
        this.movieReleaseDates = res['results'];
        this.releaseDatesSource = new MatTableDataSource(this.movieReleaseDates);
        this.releaseDatesSource.sort = this.releaseDateSort;
        if (this.movieReleaseDates) {
          this.isLoadingInfo = false;
        }
      });
  }
  getMovieTrailers(): void {
    this.apis.getMovieTrailers(this.movieId)
      .subscribe((res) => {
        this.movieTrailers = res['results'];
        this.movieTrailersLength = this.movieTrailers.length;
      });
  }
  getSimilarMovies(): void {
    this.isLoadingMovies = true;
    this.apis.getSimilarMovies(this.movieId, 1)
      .subscribe((res) => {
        this.similarMovies = res['results'];
        if (this.similarMovies) {
          this.isLoadingMovies = false;
        }
      });
  }
  getRecommemdedMovies() {
    this.isLoadingMovies = true;
    this.apis.getRecommendedMovies(this.movieId, 1)
      .subscribe((res) => {
        this.recommendedMovies = res['results'];
        if (this.recommendedMovies) {
          this.isLoadingMovies = false;
        }
      });
  }
  getMovieReviews(): void {
    this.isLoadingInfo = true;
    this.apis.getMovieReviews(this.movieId, 1)
      .subscribe((res) => {
        this.movieReviews = res['results'];
        if (this.movieReviews) {
          this.isLoadingInfo = false;
        }
      });
  }
  getMoreMovieDetails(): void {
    this.isLoadingInfo = true;
    let movieLinksTemp;
    let movieTranslationsTemp;
    this.apis.getMovieExternalLinks(this.movieId)
      .subscribe((resLink) => {
        movieLinksTemp = resLink;
        this.apis.getMovieAltTranslations(this.movieId)
          .subscribe((resTrans) => {
            movieTranslationsTemp = resTrans['translations'];
            this.apis.getMovieAltTitles(this.movieId)
              .subscribe((resTitles) => {
                this.movieAltTitles = resTitles['titles'];
                if (movieLinksTemp && movieTranslationsTemp && this.movieAltTitles) {
                  this.movieLinks = movieLinksTemp;
                  this.movieTranslations = movieTranslationsTemp;
                  this.isLoadingInfo = false;
                }
              });
          });
      });
  }

  getMovieArticles(movieId: number): void {
    const article = this.afDb.list(DB_COL.ARTICLES, ref => ref.orderByChild('article_movie_id').equalTo(movieId));
    article.valueChanges()
      .subscribe(res => {
        // console.log('ARTICLE: ', res);
        this.movieArticles = res;
      });
  }

  toggleMoreInfo(): void {
    if (!this.isMoreInfoOpen && !this.movieAltTitles) {
      this.getMoreMovieDetails();
    }
    this.isMoreInfoOpen = !this.isMoreInfoOpen;
  }

  onInfoTabChange($event): void {
    this.currentInfoTab = $event.index;
    if (this.currentInfoTab === 3 && !this.movieReleaseDates) {
      this.isLoadingInfo = true;
      this.getMovieReleaseDates();
    } else if (this.currentInfoTab === 2 && !this.movieReviews) {
      this.isLoadingInfo = true;
      this.getMovieReviews();
    } else if (this.currentInfoTab === 1 && !this.movieCreditsCast && !this.movieCreditsCrew) {
      this.isLoadingInfo = true;
      this.getMovieCredits();
    }
  }

  onMoviesTabChange($event): void {
    this.currentMoviesTab = $event.index;
    if (this.currentMoviesTab === 0 && !this.recommendedMovies) {
      this.isLoadingMovies = true;
      this.getRecommemdedMovies();
    } else if (this.currentMoviesTab === 1 && !this.similarMovies) {
      this.isLoadingMovies = true;
      this.getSimilarMovies();
    }
  }

  resetTabs(i: number) {
    this.currentInfoTab = i;
    this.currentMoviesTab = i;
  }

  applyCastFilter(filterValue: string): void {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.castSource.filter = filterValue;
  }

  applyCrewFilter(filterValue: string): void {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.crewSource.filter = filterValue;
  }

  openTrailersDialog(): void {
    let dialogRef = this.dialog.open(TrailersDialogComponent, {
      panelClass: 'full-screen-dialog',
      data: 'movie',
      height: '100%',
      width: '100%',
      maxWidth: '100%',
      maxHeight: '100%'
    });
    dialogRef.afterClosed().subscribe(result => {
      dialogRef = null;
    });
  }

  // openLoginDialog(): void {
  //   let dialogRef = this.dialog.open(AuthDialogComponent, {
  //     panelClass: 'login-dialog',
  //     data: 'login',
  //     height: '100%',
  //     width: '100%',
  //     maxWidth: '100%',
  //     maxHeight: '100%'
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     dialogRef = null;
  //   });
  // }

  rateMovie(rating: string): void {
    this.afAuth.authState.subscribe(res => {
      if (res && res.uid) {
        this.movieRatingsRef.update(this.afAuth.auth.currentUser.uid, {
          rating: rating
        }).then(() => {
          this.userMovieRatingsRef.update(this.movieId, {
            id: this.movieId,
            title: this.movieDetails.title,
            poster: this.movieDetails.poster_path,
            rating: rating
          })
            .catch(err => console.log(err, 'You do not have access!'));
        })
          .catch(err => console.log(err, 'You do not have access!'));
      } else {
        this.as.openLoginDialog();
      }
    });
  }

  // Add / Remove movie from Favorites
  toggleFavoriteMovie() {
    this.afAuth.authState.subscribe(res => {
      if (res && res.uid) {
        if (this.isFavorited === true) {
          this.favMoviesRef.remove(this.movieId)
            .then(() => {
              this.isFavorited = false;
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          this.favMoviesRef.update(this.movieId, {
            id: this.movieId,
            title: this.movieDetails.title,
            poster: this.movieDetails.poster_path,
            rating: this.movieDetails.vote_average
          })
            .catch(err => console.log(err, 'You do not have access!'));
        }
      } else {
        this.as.openLoginDialog();
      }
    });
  }

  toggleShare() {
    this.isShareOpen = !this.isShareOpen;
    console.log('Open Share Movie Dialog');
  }

  shareOnFb() {
    console.log('Share on Facebook');
  }

  shareOnGo() {
    console.log('Share on Google');
  }

  shareOnTw() {
    console.log('Share on Twitter');
  }

  openImageGallery(imgPath: string) {
    console.log('Open Gallery Slider Dialog');
  }

  // buyTickets() {
  //   console.log('Buy tickets.');
  // }

  showAddReviewForm() {
    console.log('Open Add Review Dialog... You need to be logged in!');
  }

}

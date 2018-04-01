import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { AppService } from '../app.service';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class ApiService {

  // General Properties
  apiConfig: any;
  movieGenresList: any;

  // Movie Properties
  moviesList: any;
  moviesLatest: any;
  // homepage movies
  mainDirectoryMovies: any[] = [];
  mainDirectoryMoviesLastIndex: number;
  mainDirectoryMoviesTotalPages: number;
  mainDirectoryMoviesTotalResults: number;
  // popular movies
  moviesPopular: any[] = [];
  moviesPopularLastIndex: number;
  moviesPopularTotalPages: number;
  moviesPopularTotalResults: number;
  // top rated movies
  moviesTopRated: any[] = [];
  moviesTopRatedLastIndex: number;
  moviesTopRatedTotalPages: number;
  moviesTopRatedTotalResults: number;
  // upcoming movies
  moviesUpcoming: any[] = [];
  moviesUpcomingLastIndex: number;
  moviesUpcomingTotalPages: number;
  moviesUpcomingTotalResults: number;
  // now playing movies
  moviesNowPlaying: any[] = [];
  moviesNowPlayingLastIndex: number;
  moviesNowPlayingTotalPages: number;
  moviesNowPlayingTotalResults: number;
  // movie details
  movieDetails: any;
  movieCredits: any;
  movieExternalLinks: any;
  movieImages: any;
  movieKeywords: any;
  movieReleaseDates: any;
  movieTrailers: any;
  movieSimilars: any;
  movieRecommendations: any;
  movieReviews: any;
  movieAltTitles: any;
  movieTranslations: any;

  // Person Properties
  personsList: any;
  personsPopular: any[] = [];
  personsPopularLastIndex: number;
  personsPopularTotalPages: number;
  personsPopularTotalResults: number;
  personsLatest: any;
  personDetails: any;
  personMovieCredits: any;
  personTvCredits: any;
  personExternalLinks: any;
  personImages: any;
  personTaggedImages: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private as: AppService,
    private fbs: FirebaseService
  ) { }

  getMovieGenreIdByGenreName(genreName: string): Promise<any> {
    // console.log(genreName);
    return new Promise<any>((resolve, reject) => {
      if (!this.movieGenresList) {
        this.getMovieGenres()
          .subscribe((res) => {
            this.movieGenresList = res['genres'];
            const genreObj = this.movieGenresList;
            for (let i = 0; i < genreObj.length; i++) {
              const genre = (genreObj[i].name).toString().toLowerCase().replace(/\s+/g, '-');
              // console.log(genre);
              if (genre === genreName) {
                resolve(genreObj[i].id);
                break;
              }
            }
          });
      } else {
        const genreObj = this.movieGenresList;
        for (let i = 0; i < genreObj.length; i++) {
          const genre = (genreObj[i].name).toString().toLowerCase().replace(/\s+/g, '-');
          // console.log(genre);
          if (genre === genreName) {
            resolve(genreObj[i].id);
            break;
          }
        }
      }
    });
  }

  getMovieGenreNameByGenreId(genreId: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if (!this.movieGenresList) {
        this.getMovieGenres().subscribe((res) => {
          this.movieGenresList = res;
          const genreObj = this.movieGenresList;
          for (let i = 0; i < genreObj.length; i++) {
            const genre = (genreObj[i].id);
            if (genre === genreId) {
              resolve(genreObj[i].name);
              break;
            }
          }
        });
      } else {
        const genreObj = this.movieGenresList;
        for (let i = 0; i < genreObj.length; i++) {
          const genre = (genreObj[i].id);
          if (genre === genreId) {
            resolve(genreObj[i].name);
            break;
          }
        }
      }
    });
  }

  callAPI(endpoint: string, id?: string, genre?: string, keyword?: string, pageIndex?: number): Observable<any[]> {
    const resultSub = new Subject<any>();
    if (!id && !keyword && !pageIndex) {
      this.http.get(endpoint)
        .subscribe((res) => {
          if (endpoint === 'get-movie-genres' && !this.movieGenresList) {
            this.movieGenresList = res['genres'];
            this.fbs.createMovieGenresObject(res['genres']);
            console.log('API MOVIE GENRES + URLS: ', this.movieGenresList);
          } else if (endpoint === 'get-api-config') {
            this.apiConfig = res;
            this.fbs.saveAPIConfigToDB(res);
            console.log('API CONFIG: ', this.apiConfig);
          } else if (endpoint === 'get-movies-latest' && !this.moviesLatest) {
            this.moviesLatest = res;
            console.log('API LATEST MOVIES: ', this.moviesLatest);
          } else if (endpoint === 'get-persons-latest' && !this.personsLatest) {
            this.personsLatest = res;
            console.log('API LATEST ACTORS: ', this.personsLatest);
          }
          resultSub.next(res);
        });
    } else if (id && !pageIndex) {
      this.http.get(endpoint + '/' + id)
        .subscribe((res) => {
          if (endpoint === 'get-movie') {
            this.movieDetails = res;
            this.fbs.createSingleMovieDetailsObject(res, 'single');
            console.log('API MOVIE DETAILS: ', this.movieDetails);
          } else if (endpoint === 'get-movie-credits') {
            this.movieCredits = res;
            this.fbs.createPersonsQueryResultsObject(res['cast'], 'MOVIE CAST')
              .then(celebObj => {
                this.fbs.savePersonsQueryResultsToDB(celebObj);
              })
              .then(() => {
                this.fbs.createPersonsQueryResultsObject(res['crew'], 'MOVIE CREW')
                  .then(celebObj => {
                    this.fbs.savePersonsQueryResultsToDB(celebObj);
                  })
                  .catch(error => {
                    console.log('There was an error while creating person query results object for crew! ', error);
                  });
              })
              .catch(error => {
                console.log('There was an error while creating person query results object for cast! ', error);
              });
            console.log('API MOVIE CREDITS: ', this.movieCredits);
          } else if (endpoint === 'get-movie-external-links') {
            this.movieExternalLinks = res;
            console.log('API MOVIE EXTERNAL LINKS: ', this.movieExternalLinks);
          } else if (endpoint === 'get-movie-images') {
            this.movieImages = res;
            console.log('API MOVIE IMAGES: ', this.movieImages);
          } else if (endpoint === 'get-movie-keywords') {
            this.movieKeywords = res;
            console.log('API MOVIE KEYWORDS: ', this.movieKeywords);
          } else if (endpoint === 'get-movie-release-dates') {
            this.movieReleaseDates = res;
            console.log('API MOVIE RELEASE DATES: ', this.movieReleaseDates);
          } else if (endpoint === 'get-movie-videos') {
            this.movieTrailers = res;
            console.log('API MOVIE TRAILERS: ', this.movieTrailers);
          } else if (endpoint === 'get-movie-alt-titles') {
            this.movieAltTitles = res;
            console.log('API MOVIE ALT TITLES: ', this.movieAltTitles);
          } else if (endpoint === 'get-movie-translations') {
            this.movieTranslations = res;
            console.log('API MOVIE TRANSLATIONS: ', this.movieTranslations);
          } else if (endpoint === 'get-person-details') {
            this.personDetails = res;
            this.fbs.createSinglePersonDetailsObject(res, 'single');
            console.log('API PERSON DETAILS: ', this.personDetails);
          } else if (endpoint === 'get-person-movie-credits') {
            this.personMovieCredits = res;
            this.fbs.createMoviesQueryResultsObject(res['cast'], 'PERSON MOVIE CREDITS')
              .then(movieObj => {
                this.fbs.saveMoviesQueryResultsToDB(movieObj);
              })
              .catch(error => {
                console.log('There was an error while creating movies query results object! ', error);
              });
            console.log('API PERSON MOVIE CREDITS: ', this.personMovieCredits);
          } else if (endpoint === 'get-person-external-links') {
            this.personExternalLinks = res;
            console.log('API PERSON EXTERNAL LINKS: ', this.personExternalLinks);
          } else if (endpoint === 'get-person-images') {
            this.personImages = res;
            console.log('API PERSON IMAGES: ', this.personImages);
          }
          resultSub.next(res);
        });
    } else if (keyword && pageIndex) {
      this.http.get(endpoint + '/' + keyword + '/' + pageIndex)
        .subscribe((res) => {
          if (endpoint === 'get-movies-by-keyword') {
            this.moviesList = res;
            this.fbs.createMoviesQueryResultsObject(res['results'], 'SEARCHED')
              .then(movieObj => {
                this.fbs.saveMoviesQueryResultsToDB(movieObj);
              })
              .catch(error => {
                console.log('There was an error while creating movie query results object! ', error);
              });
            console.log('API MOVIES BY KEYWORD (' + pageIndex + '): ', this.moviesList);
          } else if (endpoint === 'get-persons-by-keyword') {
            this.personsList = res;
            this.fbs.createPersonsQueryResultsObject(res['results'], 'SEARCHED')
              .then(celebObj => {
                this.fbs.savePersonsQueryResultsToDB(celebObj);
              })
              .catch(error => {
                console.log('There was an error while creating person query results object! ', error);
              });
            console.log('API PERSONS BY KEYWORD (' + pageIndex + '): ', this.personsList);
          }
          resultSub.next(res);
        });
    } else if (id && pageIndex && !genre) {
      this.http.get(endpoint + '/' + id + '/' + pageIndex)
        .subscribe((res) => {
          if (endpoint === 'get-movie-similar') {
            this.movieSimilars = res;
            this.fbs.createMoviesQueryResultsObject(res['results'], 'SIMILAR')
              .then(movieObj => {
                this.fbs.saveMoviesQueryResultsToDB(movieObj);
              })
              .catch(error => {
                console.log('There was an error while creating movie query results object! ', error);
              });
            console.log('API SIMILAR MOVIES (' + pageIndex + '): ', this.movieSimilars);
          } else if (endpoint === 'get-movie-recommendations') {
            this.movieRecommendations = res;
            this.fbs.createMoviesQueryResultsObject(res['results'], 'RECOMMENDED')
              .then(movieObj => {
                this.fbs.saveMoviesQueryResultsToDB(movieObj);
              })
              .catch(error => {
                console.log('There was an error while creating movie query results object! ', error);
              });
            console.log('API MOVIE RECOMMENDATIONS (' + pageIndex + '): ', this.movieRecommendations);
          } else if (endpoint === 'get-movie-reviews') {
            this.movieReviews = res;
            console.log('API MOVIE REVIEWS (' + pageIndex + '): ', this.movieReviews);
          } else if (endpoint === 'get-person-tagged-images') {
            this.personTaggedImages = res;
            console.log('API PERSON TAGGED IMAGES (' + pageIndex + '): ', this.personTaggedImages);
          }
          resultSub.next(res);
        });
    } else if (!id && !keyword && pageIndex) {
      this.http.get(endpoint + '/' + pageIndex)
        .subscribe((res) => {
          if (endpoint === 'get-movies-for-main-directory') {
            this.mainDirectoryMovies = this.mainDirectoryMovies.concat(res['results']);
            this.mainDirectoryMoviesLastIndex = res['page'];
            this.mainDirectoryMoviesTotalPages = res['total_pages'];
            this.mainDirectoryMoviesTotalResults = res['total_results'];
            this.fbs.createMoviesQueryResultsObject(res['results'], 'MAIN DIRECTORY')
              .then(movieObj => {
                this.fbs.saveMoviesQueryResultsToDB(movieObj);
              })
              .catch(error => {
                console.log('There was an error while creating movies query results object! ', error);
              });
            console.log('API HOMEPAGE MOVIES (' + pageIndex + '): ', res);
          } else if (endpoint === 'get-movies-popular') {
            this.moviesPopular = this.moviesPopular.concat(res['results']);
            this.moviesPopularLastIndex = res['page'];
            this.moviesPopularTotalPages = res['total_pages'];
            this.moviesPopularTotalResults = res['total_results'];
            this.fbs.createMoviesQueryResultsObject(res['results'], 'POPULAR')
              .then(movieObj => {
                this.fbs.saveMoviesQueryResultsToDB(movieObj);
              })
              .catch(error => {
                console.log('There was an error while creating movies query results object! ', error);
              });
            console.log('API POPULAR MOVIES (' + pageIndex + '): ', res);
          } else if (endpoint === 'get-movies-top-rated') {
            this.moviesTopRated = this.moviesTopRated.concat(res['results']);
            this.moviesTopRatedLastIndex = res['page'];
            this.moviesTopRatedTotalPages = res['total_pages'];
            this.moviesTopRatedTotalResults = res['total_results'];
            this.fbs.createMoviesQueryResultsObject(res['results'], 'TOP RATED')
              .then(movieObj => {
                this.fbs.saveMoviesQueryResultsToDB(movieObj);
              })
              .catch(error => {
                console.log('There was an error while creating movies query results object! ', error);
              });
            console.log('API TOP RATED MOVIES (' + pageIndex + '): ', res);
          } else if (endpoint === 'get-movies-upcoming') {
            this.moviesUpcoming = this.moviesUpcoming.concat(res['results']);
            this.moviesUpcomingLastIndex = res['page'];
            this.moviesUpcomingTotalPages = res['total_pages'];
            this.moviesUpcomingTotalResults = res['total_results'];
            this.fbs.createMoviesQueryResultsObject(res['results'], 'UPCOMING')
              .then(movieObj => {
                this.fbs.saveMoviesQueryResultsToDB(movieObj);
              })
              .catch(error => {
                console.log('There was an error while creating movies query results object! ', error);
              });
            console.log('API UPCOMING MOVIES (' + pageIndex + '): ', res);
          } else if (endpoint === 'get-movies-now-playing') {
            this.moviesNowPlaying = this.moviesNowPlaying.concat(res['results']);
            this.moviesNowPlayingLastIndex = res['page'];
            this.moviesNowPlayingTotalPages = res['total_pages'];
            this.moviesNowPlayingTotalResults = res['total_results'];
            this.fbs.createMoviesQueryResultsObject(res['results'], 'NOW PLAYING')
              .then(movieObj => {
                this.fbs.saveMoviesQueryResultsToDB(movieObj);
              })
              .catch(error => {
                console.log('There was an error while creating movies query results object! ', error);
              });
            console.log('API NOW PLAYING MOVIES (' + pageIndex + '): ', res);
          } else if (endpoint === 'get-persons-popular') {
            this.personsPopular = this.personsPopular.concat(res['results']);
            this.personsPopularLastIndex = res['page'];
            this.personsPopularTotalPages = res['total_pages'];
            this.personsPopularTotalResults = res['total_results'];
            this.fbs.createPersonsQueryResultsObject(res['results'], 'POPULAR')
              .then(celebObj => {
                this.fbs.savePersonsQueryResultsToDB(celebObj);
              })
              .catch(error => {
                console.log('There was an error while creating person query results object! ', error);
              });
            console.log('API POPULAR ACTORS (' + pageIndex + '): ', res);
          }
          resultSub.next(res);
        });
    } else if (id && genre && pageIndex) {
      this.http.get(endpoint + '/' + id + '/' + pageIndex)
        .subscribe((res) => {
          if (endpoint === 'get-movies-by-genre') {
            this.moviesList = res['results'];
            this.fbs.createMoviesQueryResultsObject(res['results'], 'GENRE FILTERED')
              .then(movieObj => {
                this.fbs.saveMoviesQueryResultsToDB(movieObj);
              })
              .catch(error => {
                console.log('There was an error while creating movies query results object! ', error);
              });
            console.log('API MOVIES BY GENRE (' + pageIndex + '): ', res);
          }
          resultSub.next(res);
        });
    }
    return resultSub;
  }

  // General API Calls
  getAPIConfig(): Observable<any[]> {
    return this.callAPI('get-api-config');
  }
  getMovieGenres(): Observable<any[]> {
    return this.callAPI('get-movie-genres');
  }

  // Movie API Calls
  getMoviesForMainDirectory(pageIndex: number): Observable<any[]> {
    return this.callAPI('get-movies-for-main-directory', null, null, null, pageIndex);
  }
  searchMovieByKeyword(keyword: string, pageIndex: number): Observable<any[]> {
    return this.callAPI('get-movies-by-keyword', null, null, keyword, pageIndex);
  }
  getMoviesByGenre(id: string, genre: string, pageIndex): Observable<any[]> {
    return this.callAPI('get-movies-by-genre', id, genre, null, pageIndex);
  }
  getMoviesByCompany(id: string, pageIndex): Observable<any[]> {
    return this.callAPI('get-movies-by-company', id, null, null, pageIndex);
  }
  getLatestMovies(): Observable<any[]> {
    return this.callAPI('get-movies-latest');
  }
  getPopularMovies(pageIndex: number): Observable<any[]> {
    return this.callAPI('get-movies-popular', null, null, null, pageIndex);
  }
  getTopRatedMovies(pageIndex: number): Observable<any[]> {
    return this.callAPI('get-movies-top-rated', null, null, null, pageIndex);
  }
  getUpcomingMovies(pageIndex: number): Observable<any[]> {
    return this.callAPI('get-movies-upcoming', null, null, null, pageIndex);
  }
  getNowPlayingMovies(pageIndex: number): Observable<any[]> {
    return this.callAPI('get-movies-now-playing', null, null, null, pageIndex);
  }
  getMovieDetails(movieId: string): Observable<any[]> {
    return this.callAPI('get-movie', movieId);
  }
  getMovieCredits(movieId: string): Observable<any[]> {
    return this.callAPI('get-movie-credits', movieId);
  }
  getMovieExternalLinks(movieId: string): Observable<any[]> {
    return this.callAPI('get-movie-external-links', movieId);
  }
  getMovieImages(movieId: string): Observable<any[]> {
    return this.callAPI('get-movie-images', movieId);
  }
  getMovieKeywords(movieId: string): Observable<any[]> {
    return this.callAPI('get-movie-keywords', movieId);
  }
  getMovieReleaseDates(movieId: string): Observable<any[]> {
    return this.callAPI('get-movie-release-dates', movieId);
  }
  getMovieTrailers(movieId: string): Observable<any[]> {
    return this.callAPI('get-movie-videos', movieId);
  }
  getSimilarMovies(movieId: string, pageIndex: number): Observable<any[]> {
    return this.callAPI('get-movie-similar', movieId, null, null, pageIndex);
  }
  getRecommendedMovies(movieId: string, pageIndex: number): Observable<any[]> {
    return this.callAPI('get-movie-recommendations', movieId, null, null, pageIndex);
  }
  getMovieReviews(movieId: string, pageIndex: number): Observable<any[]> {
    return this.callAPI('get-movie-reviews', movieId, null, null, pageIndex);
  }
  getMovieAltTitles(movieId: string): Observable<any[]> {
    return this.callAPI('get-movie-alt-titles', movieId);
  }
  getMovieAltTranslations(movieId: string): Observable<any[]> {
    return this.callAPI('get-movie-translations', movieId);
  }
  // Actor API Calls
  searchPersonsByKeyword(keyword: string, pageIndex: number): Observable<any[]> {
    return this.callAPI('get-persons-by-keyword', null, null, keyword, pageIndex);
  }
  getPopularActors(pageIndex: number): Observable<any[]> {
    return this.callAPI('get-persons-popular', null, null, null, pageIndex);
  }
  getLatestActors(): Observable<any[]> {
    return this.callAPI('get-persons-latest');
  }
  getActorDetails(actorId: string): Observable<any[]> {
    return this.callAPI('get-person-details', actorId);
  }
  getActorMovieCredits(actorId: string): Observable<any[]> {
    return this.callAPI('get-person-movie-credits', actorId);
  }
  getActorExternalLinks(actorId: string): Observable<any[]> {
    return this.callAPI('get-person-external-links', actorId);
  }
  getActorImages(actorId: string): Observable<any[]> {
    return this.callAPI('get-person-images', actorId);
  }
  getActorTaggedImages(actorId: string, pageIndex: number): Observable<any[]> {
    return this.callAPI('get-person-tagged-images', actorId, null, null, pageIndex);
  }

}

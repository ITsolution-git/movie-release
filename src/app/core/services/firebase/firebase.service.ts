import { Injectable } from '@angular/core';
// RxJs
import { Observable } from 'rxjs/Observable';
// Firebase
import {
  AngularFireDatabase,
  AngularFireObject,
  AngularFireList
} from 'angularfire2/database';
// Toastr
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
// Services
import { AppService } from '../app.service';
// Constants
import { DB_COL } from '../../../constants';

@Injectable()
export class FirebaseService {

  moviesRef: AngularFireObject<any>;
  moviesObsRef: Observable<any>;
  moviesQueriesRef: AngularFireList<any>;
  moviesResultsRef: AngularFireObject<any>;
  moviesResultsObsRef: AngularFireList<any>;
  movieGenresRef: AngularFireObject<any>;
  apiConfigRef: AngularFireObject<any>;

  constructor(
    private afDb: AngularFireDatabase,
    private as: AppService,
    public toastr: ToastsManager
  ) {
    this.moviesRef = this.afDb.object(`${DB_COL.MOVIES}`);
    this.moviesObsRef = this.afDb.list(`${DB_COL.MOVIES}`).valueChanges();
    this.moviesQueriesRef = this.afDb.list(`${DB_COL.MOVIES_QUERIES}`);
    this.moviesResultsRef = this.afDb.object(`${DB_COL.MOVIES_RESULTS}`);
    this.moviesResultsObsRef = this.afDb.list(`${DB_COL.MOVIES_RESULTS}`);
    this.movieGenresRef = this.afDb.object(`${DB_COL.MOVIE_GENRES}`);
    this.apiConfigRef = this.afDb.object(`${DB_COL.API_CONFIG}`);
  }

  saveAPIConfigToDB(apiConfig: any): void {
    this.apiConfigRef.set(apiConfig);
  }

  // Get All Movies from Firebase
  getAllMoviesResults(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.moviesResultsObsRef.valueChanges()
        .subscribe(res => {
          resolve(res);
        });
    });
  }

  getMoviesByTitle(movieTitle: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.afDb.list(`${DB_COL.MOVIES_RESULTS}`, ref => ref.orderByChild('title').equalTo(movieTitle))
        .valueChanges()
        .subscribe(res => {
          resolve(res);
        });
    });
  }

  getMoviesBySlug(movieSlug: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.afDb.list(`${DB_COL.MOVIES_RESULTS}`, ref => ref.orderByChild('slug').equalTo(movieSlug))
        .valueChanges()
        .subscribe(res => {
          resolve(res);
        });
    });
  }

  // Store Queried Movie Genres in Database
  createMovieGenresObject(movieGenres: Array<any>): void {
    const movieGenresObj = {};
    // adds 'url' key/value pair to object
    for (let i = 0; i < movieGenres.length; i++) {
      const genreId = movieGenres[i].id;
      movieGenresObj[genreId] = {
        id: movieGenres[i].id,
        name: movieGenres[i].name,
        url: 'movies/genre/' + this.as.urlOptimizeText(movieGenres[i].name)
      };
    }
    // console.log(movieGenresObj);
    this.saveMovieGenresToDB(movieGenresObj);
  }
  saveMovieGenresToDB(movieGenresObj: Object): void {
    this.movieGenresRef.set(movieGenresObj)
      .catch(err => console.log(err, 'You do not have access!'));
  }

  // Store Queried Movies List in Database
  createMoviesQueryResultsObject(movies: Array<any>, callSource: string): Promise<any> {
    // console.log('SAVING ' + callSource + ' MOVIES TO DB: ', movies);
    return new Promise<any>((resolves, reject) => {
      const moviesObj = {};
      // Create New Movie Results Object
      for (let i = 0; i < movies.length; i++) {
        const movieId = movies[i].id;
        this.afDb.list(`${DB_COL.MOVIES_RESULTS}`, ref => ref.orderByChild('id').equalTo(movieId))
          .valueChanges()
          .subscribe(res => {
            if (!res[0]) {
              // Movie Properties
              moviesObj[movieId] = {
                genre_ids: movies[i].genre_ids || '',
                id: movies[i].id,
                poster_path: movies[i].poster_path || '',
                release_date: movies[i].release_date || '',
                slug: this.as.urlOptimizeText(movies[i].title),
                title: movies[i].title || '',
                url: 'movies/' + this.as.urlOptimizeText(movies[i].title),
                vote_average: movies[i].vote_average || ''
              };
              if (i === movies.length - 1) {
                resolves(moviesObj);
              }
            } else {
              // console.log('SKIP MOVIE.', movieId, moviesObj);
              if (i === movies.length - 1) {
                resolves(moviesObj);
              }
            }
          });
      }
    });
  }
  saveMoviesQueryResultsToDB(moviesObj: Object): void {
    console.log('SAVING MOVIE RESULTS TO DB.', moviesObj);
    // Save copy of movies to firebase
    this.moviesResultsRef.update(moviesObj)
      .catch(err => console.log(err, 'You do not have access!'));
  }

  // Store Single Movie Details in Database
  createSingleMovieDetailsObject(movie: any, callSource: string): void {
    const movieObj = {};
    const movieId = movie.id;
    // Movie Properties
    movieObj[movieId] = {
      adult: movie.adult,
      backdrop_path: movie.backdrop_path,
      belongs_to_collection: movie.belongs_to_collection || '',
      budget: movie.budget || '',
      genre_ids: movie.genre_ids || movie.genres,
      homepage: movie.homepage || '',
      id: movie.id,
      imdb_id: movie.imdb_id || '',
      original_language: movie.original_language,
      original_title: movie.original_title,
      overview: movie.overview,
      popularity: movie.popularity,
      poster_path: movie.poster_path,
      production_companies: movie.production_companies || '',
      production_countries: movie.production_countries || '',
      release_date: movie.release_date,
      revenue: movie.revenue || '',
      runtime: movie.runtime || '',
      slug: this.as.urlOptimizeText(movie.title),
      spoken_languages: movie.spoken_languages || '',
      status: movie.status || '',
      tagline: movie.tagline || '',
      title: movie.title,
      url: 'movies/' + this.as.urlOptimizeText(movie.title),
      video: movie.video,
      vote_average: movie.vote_average,
      vote_count: movie.vote_count
    };
    // console.log(movieObj);
    this.saveSingleMovieToDB(movieObj);
  }
  saveSingleMovieToDB(moviesObj: Object): void {
    // Save copy of movies to firebase
    this.moviesRef.update(moviesObj)
      .catch(err => console.log(err, 'You do not have access!'));
  }

  updateMovieResultURL(movieId: string, slug: string, url: string): void {
    this.moviesResultsObsRef.update(movieId, {
      slug: slug,
      url: url
    })
      .then(res => {
        this.toastr.success('Slug & URL Updated for ', slug);
      })
      .catch(error => {
        console.log(error);
        this.toastr.error('There was an error updating this movie! ', error);
      });
  }

  // Store Movie Search Query to Database
  saveMovieSearchQueryToDB(query: string): void {
    const queryObj = {
      date: Date.now(),
      query: query
    };
    this.moviesQueriesRef.push(queryObj);
  }

}

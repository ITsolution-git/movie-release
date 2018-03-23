import { Injectable } from '@angular/core';

// Firebase
import {
  AngularFireDatabase,
  AngularFireObject,
  AngularFireList
} from 'angularfire2/database';

import { AppService } from '../app.service';

import { DB_COL } from '../../../constants';

@Injectable()
export class FirebaseService {

  moviesRef: AngularFireObject<any>;
  moviesQueriesRef: AngularFireList<any>;
  moviesResultsRef: AngularFireObject<any>;
  movieGenresRef: AngularFireObject<any>;
  apiConfigRef: AngularFireObject<any>;

  constructor(
    private afDb: AngularFireDatabase,
    private as: AppService
  ) {
    this.moviesRef = this.afDb.object(`${DB_COL.MOVIES}`);
    this.moviesQueriesRef = this.afDb.list(`${DB_COL.MOVIES_QUERIES}`);
    this.moviesResultsRef = this.afDb.object(`${DB_COL.MOVIES_RESULTS}`);
    this.movieGenresRef = this.afDb.object(`${DB_COL.MOVIE_GENRES}`);
    this.apiConfigRef = this.afDb.object(`${DB_COL.API_CONFIG}`);
  }

  saveAPIConfigToDB(apiConfig: any) {
    this.apiConfigRef.set(apiConfig);
  }

  // Store Queried Movie Genres in Database
  createMovieGenresObject(movieGenres: Array<any>) {
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
  saveMovieGenresToDB(movieGenresObj: Object) {
    this.movieGenresRef.set(movieGenresObj)
      .catch(err => console.log(err, 'You do not have access!'));
  }

  // Store Queried Movies List in Database
  createMoviesQueryResultsObject(movies: Array<any>, callSource: string) {
    console.log('SAVING ' + callSource + ' MOVIES TO DB: ', movies);
    const moviesObj = {};
    // Create New Movie Results Object
    for (let i = 0; i < movies.length; i++) {
      const movieId = movies[i].id;
      // Movie Properties
      moviesObj[movieId] = {
        adult: movies[i].adult || '',
        backdrop_path: movies[i].backdrop_path || '',
        genre_ids: movies[i].genre_ids || '',
        id: movieId,
        original_language: movies[i].original_language || '',
        original_title: movies[i].original_title || '',
        overview: movies[i].overview || '',
        popularity: movies[i].popularity || '',
        poster_path: movies[i].poster_path || '' || '',
        release_date: movies[i].release_date,
        slug: this.as.urlOptimizeText(movies[i].title),
        title: movies[i].title,
        url: 'movies/' + this.as.urlOptimizeText(movies[i].title),
        video: movies[i].video || '',
        vote_average: movies[i].vote_average || '',
        vote_count: movies[i].vote_count || ''
      };
    }
    // console.log(moviesObj);
    this.saveMoviesQueryResultsToDB(moviesObj);
  }
  saveMoviesQueryResultsToDB(moviesObj: Object) {
    // Save copy of movies to firebase
    this.moviesResultsRef.update(moviesObj)
      .catch(err => console.log(err, 'You do not have access!'));
  }

  // Store Single Movie Details in Database
  createSingleMovieDetailsObject(movie: any, callSource: string) {
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
  saveSingleMovieToDB(moviesObj: Object) {
    // Save copy of movies to firebase
    this.moviesRef.update(moviesObj)
      .catch(err => console.log(err, 'You do not have access!'));
  }

  // Store Movie Search Query to Database
  saveMovieSearchQueryToDB(query: string) {
    const queryObj = {
      date: Date.now(),
      query: query
    };
    this.moviesQueriesRef.push(queryObj);
  }


}

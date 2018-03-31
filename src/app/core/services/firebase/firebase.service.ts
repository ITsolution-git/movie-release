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

  // General Properties
  apiConfigRef: AngularFireObject<any>;
  // Movie Properties
  moviesRef: AngularFireObject<any>;
  moviesObsRef: Observable<any>;
  moviesQueriesRef: AngularFireList<any>;
  moviesResultsRef: AngularFireObject<any>;
  moviesResultsObsRef: AngularFireList<any>;
  movieGenresRef: AngularFireObject<any>;
  // Celeb Properties
  personsRef: AngularFireObject<any>;
  personsQueriesRef: AngularFireList<any>;
  personsResultsRef: AngularFireObject<any>;
  personsResultsObsRef: AngularFireList<any>;

  constructor(
    private afDb: AngularFireDatabase,
    private as: AppService,
    public toastr: ToastsManager
  ) {
    // General DB Collentions Initialization
    this.apiConfigRef = this.afDb.object(`${DB_COL.API_CONFIG}`);
    // Movies DB Collentions Initialization
    this.moviesRef = this.afDb.object(`${DB_COL.MOVIES}`);
    this.moviesObsRef = this.afDb.list(`${DB_COL.MOVIES}`).valueChanges();
    this.moviesQueriesRef = this.afDb.list(`${DB_COL.MOVIES_QUERIES}`);
    this.moviesResultsRef = this.afDb.object(`${DB_COL.MOVIES_RESULTS}`);
    this.moviesResultsObsRef = this.afDb.list(`${DB_COL.MOVIES_RESULTS}`);
    this.movieGenresRef = this.afDb.object(`${DB_COL.MOVIE_GENRES}`);
    // Persons DB Collentions Initialization
    this.personsRef = this.afDb.object(`${DB_COL.CELEBS}`);
    this.personsQueriesRef = this.afDb.list(`${DB_COL.CELEBS_QUERIES}`);
    this.personsResultsRef = this.afDb.object(`${DB_COL.CELEBS_RESULTS}`);
    this.personsResultsObsRef = this.afDb.list(`${DB_COL.CELEBS_RESULTS}`);
  }

  saveAPIConfigToDB(apiConfig: any): void {
    this.apiConfigRef.set(apiConfig);
  }

  // Movies Functions
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
      this.as.urlOptimizeText(movieGenres[i].name)
        .then(slug => {
          movieGenresObj[genreId] = {
            id: movieGenres[i].id,
            name: movieGenres[i].name,
            url: 'movies/genre/' + slug
          };
        });
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
              this.as.urlOptimizeText(movies[i].title)
                .then(slug => {
                  // Movie Properties
                  moviesObj[movieId] = {
                    genre_ids: movies[i].genre_ids || '',
                    id: movies[i].id,
                    poster_path: movies[i].poster_path || '',
                    release_date: movies[i].release_date || '',
                    slug: slug,
                    title: movies[i].title || '',
                    url: 'movies/' + slug,
                    vote_average: movies[i].vote_average || ''
                  };
                  if (i === movies.length - 1) {
                    resolves(moviesObj);
                  }
                });
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
  createSingleMovieDetailsObject(movie: any, callSource: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const movieObj = {};
      const movieId = movie.id;
      this.as.urlOptimizeText(movie.title)
        .then(slug => {
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
            slug: slug,
            spoken_languages: movie.spoken_languages || '',
            status: movie.status || '',
            tagline: movie.tagline || '',
            title: movie.title,
            url: 'movies/' + slug,
            video: movie.video,
            vote_average: movie.vote_average,
            vote_count: movie.vote_count
          };
        });
      resolve(movieObj);
    });
    // console.log(movieObj);
    // this.saveSingleMovieToDB(movieObj);
  }
  saveSingleMovieToDB(moviesObj: Object): void {
    // Save copy of movies to firebase
    this.moviesRef.update(moviesObj)
      .catch(err => console.log(err, 'You do not have access!'));
  }
  // Update URL and SLug for Duplicate Movies Fix
  updateMovieResultURL(movieId: string, slug: string, url: string): void {
    this.moviesResultsObsRef.update(movieId, {
      slug: slug,
      url: url
    })
      .then(res => {
        this.toastr.success('Slug & URL Updated for ', slug);
      })
      .catch(error => {
        console.log('There was an error while updating the movie! ', error);
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

  // Persons Functions
  // Get All Persons from Firebase
  getAllPersonsResults(): Promise<any> {
    return new Promise<any>((resolves, reject) => {
      this.personsResultsObsRef.valueChanges()
        .subscribe(res => {
          // console.log(res);
          resolves(res);
        });
    });
  }
  // Get Persons By Name
  getPersonsByName(personName: string): Promise<any> {
    return new Promise<any>((resolves, reject) => {
      this.afDb.list(`${DB_COL.CELEBS_RESULTS}`, ref => ref.orderByChild('name').equalTo(personName))
        .valueChanges()
        .subscribe(res => {
          // console.log(res);
          resolves(res);
        });
    });
  }
  // Get Persons By Slug
  getPersonsBySlug(personSlug: string): Promise<any> {
    return new Promise<any>((resolves, reject) => {
      this.afDb.list(`${DB_COL.CELEBS_RESULTS}`, ref => ref.orderByChild('slug').equalTo(personSlug))
        .valueChanges()
        .subscribe(res => {
          // console.log(res);
          resolves(res);
        });
    });
  }
  // Store Queried Persons in Database
  createPersonsQueryResultsObject(persons: Array<any>, callSource: string): Promise<any> {
    // console.log('SAVING ' + callSource + ' PERSONS TO DB.: ', persons);
    return new Promise<any>((resolves, reject) => {
      const personsObj = {};
      for (let i = 0; i < persons.length; i++) {
        const personId = persons[i].id;
        this.afDb.list(`${DB_COL.CELEBS_RESULTS}`, ref => ref.orderByChild('id').equalTo(personId))
          .valueChanges()
          .subscribe(res => {
            if (!res[0]) {
              this.as.urlOptimizeText(persons[i].name)
                .then(slug => {
                  // Person Properties
                  personsObj[personId] = {
                    id: persons[i].id,
                    name: persons[i].name,
                    profile_path: persons[i].profile_path,
                    slug: slug,
                    url: 'celebrity/' + slug
                  };
                  if (i === persons.length - 1) {
                    // console.log('LAST PERSON. SAVE!');
                    resolves(personsObj);
                  }
                })
                .catch(error => {
                  console.log('There was an error while optimizing texts for the URL! ', error);
                });
            } else {
              // console.log('SKIP PERSON.', personId);
              if (i === persons.length - 1) {
                // console.log('LAST PERSON. SAVE!');
                resolves(personsObj);
              }
            }
          });
      }
    });
  }
  savePersonsQueryResultsToDB(personsObj: Object) {
    // Save copy of persons in firebase
    if (JSON.stringify(personsObj) === '{}') {
      console.log('NO NEW CELEBS TO SAVE!');
    } else {
      console.log('SAVING PERSONS RESULTS:', personsObj);
      this.personsResultsRef.update(personsObj)
        .catch(err => console.log(err, 'You do not have access!'));
    }
  }
  // Store Single Person Details in Database
  createSinglePersonDetailsObject(person: any, callSource: string) {
    const personObj = {};
    const personId = person.id;
    this.as.urlOptimizeText(person.name)
      .then(slug => {
        // Person Properties
        personObj[personId] = {
          adult: person.adult,
          also_known_as: person.also_known_as || '',
          biography: person.biography || '',
          birthday: person.birthday || '',
          deathday: person.deathday || '',
          gender: person.gender || '',
          homepage: person.homepage || '',
          id: person.id,
          imdb_id: person.imdb_id || '',
          name: person.name,
          place_of_birth: person.place_of_birth || '',
          popularity: person.popularity,
          profile_path: person.profile_path,
          slug: slug,
          url: 'celebrity/' + slug
        };
        // console.log(personObj);
        this.saveSinglePersonToDB(personObj);
      });
  }
  saveSinglePersonToDB(personObj: Object) {
    // console.log('SAVING PERSON DETAILS TO DB.', personObj);
    // Save copy of tv shows in firebase
    this.personsRef.update(personObj)
      .catch(err => console.log(err, 'You do not have access!'));
  }
  // Update URL and SLUG for Duplicate Persons Fix
  updatePersonResultURL(personId: string, slug: string, url: string): void {
    this.personsResultsObsRef.update(personId, {
      slug: slug,
      url: url
    })
      .then(res => {
        this.toastr.success('Slug & URL Updated for ', slug);
      })
      .catch(error => {
        console.log(error);
        this.toastr.error('There was an error updating this person! ', error);
      });
  }
  // Store Celeb Search Query to Database
  saveCelebsSearchQueryToDB(query: string) {
    // console.log('SAVING CELEB SEARCH QUERY TO DB.', query);
    const queryObj = {
      date: Date.now(),
      query: query
    };
    this.personsQueriesRef.push(queryObj);
  }
}

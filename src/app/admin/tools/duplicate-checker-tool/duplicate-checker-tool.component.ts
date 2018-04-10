import { Component, OnInit } from '@angular/core';
// AngularFire
import { AngularFireDatabase } from 'angularfire2/database';
// Services
import { FirebaseService } from '../../../core/services/firebase/firebase.service';

@Component({
  selector: 'app-duplicate-checker-tool',
  templateUrl: './duplicate-checker-tool.component.html',
  styleUrls: ['./duplicate-checker-tool.component.css']
})
export class DuplicateCheckerToolComponent implements OnInit {

  // Movies
  duplicateMovieDetails: any;
  currentMoviesStatus: string;
  fbDuplicateMovieTitles: any[];
  loadingMovies: boolean;
  // Persons
  duplicatePersonDetails: any;
  currentPersonsStatus: string;
  fbDuplicatePersonNames: any[];
  loadingPersons: boolean;

  constructor(
    private afDb: AngularFireDatabase,
    private fS: FirebaseService,
  ) {
    this.getDuplicateMoviesFromDB()
      .then(res => {
        this.fbDuplicateMovieTitles = res;
        this.loadingMovies = false;
        this.getDuplicatePersonsFromDB()
          .then(pers => {
            this.fbDuplicatePersonNames = pers;
            this.loadingPersons = false;
          })
          .catch(error => {
            console.log('There was an error getting duplicate Persons from firebase! ', error);
          });
      })
      .catch(error => {
        console.log('There was an error getting duplicate Movies from firebase! ', error);
      });
  }

  ngOnInit(): void { }

  // Movies Functions
  getDuplicateMoviesFromDB(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      // console.log('Getting Duplicate Movies from DB.');
      this.loadingMovies = true;
      this.afDb.object('duplicate_movies').valueChanges()
        .subscribe(res => {
          // console.log('DB Duplicate Movies: ', res);
          resolve(res);
        });
    });
  }
  getAllMoviesResults(): void {
    this.loadingMovies = true;
    this.currentMoviesStatus = 'Getting All Movies From Firebase "movie_results" Collection.';
    this.fS.getAllMoviesResults()
      .then(res => {
        this.currentMoviesStatus = 'Checking For Duplicate Titles.';
        this.checkDuplicateMovieTitles('slug', res)
          .then(duplicates => {
            this.currentMoviesStatus = 'Saving Duplicate Title Results to Firebase "duplicate_movies" Collection.';
            this.afDb.object('duplicate_movies').set(duplicates)
              .then(() => {
                // this.afDb.list('duplicate_movies').update('_date', Date.now());
                this.currentMoviesStatus = 'Writing Duplicate Movies to Screen.';
                this.getDuplicateMoviesFromDB()
                  .then(duplicate => {
                    this.fbDuplicateMovieTitles = duplicate;
                    this.currentMoviesStatus = 'Duplicate Movie Title Checking is Done!';
                    this.loadingMovies = false;
                  });
              });
          });
      });
  }
  checkDuplicateMovieTitles(propertyName, collection): Promise<any> {
    // console.log('PropertyName:', propertyName, ' Collection: ', collection);
    return new Promise<any>((resolve, reject) => {
      const duplicateTitles = [];
      const moviesObject = {};
      collection.map((item) => {
        const moviePropertyName = item[propertyName];
        if (moviePropertyName in moviesObject) {
          duplicateTitles.push(moviePropertyName);
        } else {
          moviesObject[moviePropertyName] = item;
          delete item.duplicate;
        }
      });
      resolve(duplicateTitles);
    });
  }
  getDuplicateMovieDetailsByTitle(movieTitle: string): Promise<any> {
    // console.log('Getting Movie Details for: ', movieTitle);
    return new Promise<any>((resolve, reject) => {
      this.fS.getMoviesByTitle(movieTitle)
        .then(res => {
          this.duplicateMovieDetails = res;
          resolve(res);
        });
    });
  }
  getDuplicateMovieDetailsBySlug(movieSlug: string): Promise<any> {
    // console.log('Getting Movie Details for: ', movieSlug);
    return new Promise<any>((resolve, reject) => {
      this.fS.getMoviesBySlug(movieSlug)
        .then(res => {
          if (res.length < 2) {
            this.duplicateMovieDetails = '';
          } else {
            this.duplicateMovieDetails = res;
            resolve(res);
          }
        });
    });
  }
  updateMovieUrl(movieId: string, slug: string, url: string, releaseDate?: string): void {
    // console.log(releaseDate.slice(0, 4));
    if (releaseDate) {
      const newUrl = url + '-' + releaseDate.slice(0, 4);
      const newSlug = slug + '-' + releaseDate.slice(0, 4);
      this.fS.updateMovieResultURL(movieId.toString(), newSlug, newUrl);
      this.getDuplicateMovieDetailsBySlug(slug);
    } else {
      console.log('No Release date was found for this movie. Please update the url and slug manually.');
      this.fS.updateMovieResultURL(movieId.toString(), slug, url);
      this.getDuplicateMovieDetailsBySlug(slug);
    }
  }

  // Persons Functions
  getDuplicatePersonsFromDB(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      // console.log('Getting Duplicate Persons from DB.');
      this.loadingPersons = true;
      this.afDb.object('duplicate_celebs').valueChanges()
        .subscribe(res => {
          resolve(res);
        });
    });
  }
  getAllPersonsResults(): void {
    this.loadingPersons = true;
    this.currentPersonsStatus = 'Getting All Persons From Firebase "celeb_results" Collection.';
    this.fS.getAllPersonsResults()
      .then(res => {
        this.currentPersonsStatus = 'Checking For Duplicate Person Names.';
        this.checkDuplicatePersonNames('slug', res)
          .then(duplicates => {
            this.currentPersonsStatus = 'Saving Duplicate Person Name Results to Firebase "duplicate_celebs" Collection.';
            this.afDb.object('duplicate_celebs').set(duplicates)
              .then(() => {
                this.currentPersonsStatus = 'Writing Duplicate Persons to Screen.';
                this.getDuplicatePersonsFromDB()
                  .then(duplicate => {
                    this.fbDuplicatePersonNames = duplicate;
                    this.currentPersonsStatus = 'Duplicate Persons Name Checking is Done!';
                    this.loadingPersons = false;
                  });
              });
          });
      });
  }
  checkDuplicatePersonNames(propertyName, collection): Promise<any> {
    // console.log('PropertyName:', propertyName, ' Collection: ', collection);
    return new Promise<any>((resolve, reject) => {
      const duplicateNames = [];
      const personsObject = {};
      collection.map((item) => {
        const personPropertyName = item[propertyName];
        if (personPropertyName in personsObject) {
          duplicateNames.push(personPropertyName);
        } else {
          personsObject[personPropertyName] = item;
          delete item.duplicate;
        }
      });
      resolve(duplicateNames);
    });
  }
  getDuplicatePersonDetailsByName(personName: string): Promise<any> {
    // console.log('Getting Person Details for: ', personName);
    return new Promise<any>((resolve, reject) => {
      this.fS.getPersonsByName(personName)
        .then(res => {
          this.duplicatePersonDetails = res;
          resolve(res);
        });
    });
  }
  getDuplicatePersonDetailsBySlug(personSlug: string): Promise<any> {
    console.log('Getting Celeb Details for: ', personSlug);
    return new Promise<any>((resolve, reject) => {
      this.fS.getPersonsBySlug(personSlug)
        .then(res => {
          if (res.length < 2) {
            this.duplicatePersonDetails = '';
          } else {
            this.duplicatePersonDetails = res;
            resolve(res);
          }
        });
    });
  }
  updatePersonUrl(personId: string, slug: string, url: string): void {
    this.fS.updatePersonResultURL(personId.toString(), slug, url);
    this.getDuplicatePersonDetailsBySlug(slug);

  }


}

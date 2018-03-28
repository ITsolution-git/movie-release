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

  duplicateDetails: any;
  currentStatus: string;
  lastCheckDate: any;
  fbDuplicateTitles: any[];
  duplicateMovieDetails: any;
  loading: boolean;

  constructor(
    private afDb: AngularFireDatabase,
    private fS: FirebaseService,
  ) {
    this.getDuplicatesFromDB()
      .then(res => {
        this.fbDuplicateTitles = res;
        this.loading = false;
      });
  }

  ngOnInit(): void { }

  getDuplicatesFromDB(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      // console.log('Getting Duplicates from DB.');
      this.loading = true;
      this.afDb.object('duplicate_movies').valueChanges()
        .subscribe(res => {
          // console.log('DB Duplicates: ', res);
          resolve(res);
        });
    });
  }

  getAllMoviesResults(): void {
    this.loading = true;
    this.currentStatus = 'Getting All Movies From Firebase "movies_results" Collection.';
    this.fS.getAllMoviesResults()
      .then(res => {
        this.currentStatus = 'Checking For Duplicate Titles.';
        this.checkDuplicateMovieTitles('slug', res)
          .then(duplicates => {
            this.currentStatus = 'Saving Duplicate Title Results to Firebase "duplicate_movies" Collection.';
            this.afDb.object('duplicate_movies').set(duplicates)
              .then(() => {
                // this.afDb.list('duplicate_movies').update('_date', Date.now());
                this.currentStatus = 'Writing Duplicate Movies to Screen.';
                this.getDuplicatesFromDB()
                  .then(duplicate => {
                    this.fbDuplicateTitles = duplicate;
                    this.currentStatus = 'Duplicate Movie Title Checking is Done!';
                    this.loading = false;
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
          console.log(res);
          this.duplicateDetails = res;
          resolve(res);
          // this.duplicateMovieDetails = res;
        });
    });
  }

  getDuplicateMovieDetailsBySlug(movieSlug: string): Promise<any> {
    // console.log('Getting Movie Details for: ', movieSlug);
    return new Promise<any>((resolve, reject) => {
      this.fS.getMoviesBySlug(movieSlug)
        .then(res => {
          console.log(res);
          this.duplicateMovieDetails = res;
          resolve(res);
          // this.duplicateMovieDetails = res;
        });
    });
  }

  updateUrl(movieId: string, slug: string, url: string): void {
    // console.log(movieId, slug, url);
    this.fS.updateMovieResultURL(movieId.toString(), slug, url);
  }

}

import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../core/services/firebase/firebase.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  duplicateTitles: any[] = [];
  duplicateMovieDetails: any;
  loading: boolean;
  constructor(
    private fS: FirebaseService
  ) {
    this.getAllMoviesResults();
  }

  ngOnInit(): void { }

  getAllMoviesResults() {
    this.duplicateTitles = [];
    this.loading = true;
    this.fS.getAllMoviesResults()
      .then(res => {
        this.checkDuplicateMovieTitles('slug', res)
          .then(duplicates => {
            for (let i = 0; i < duplicates.length; i++) {
              // console.log(duplicates[i]);
              const element = duplicates[i];
              this.getDuplicateMovieDetailsBySlug(element)
                .then(movie => {
                  // console.log(movie);
                  this.duplicateTitles.push(movie);
                  // console.log(this.duplicateTitles);
                  this.loading = false;
                });
            }
          });
      });
  }

  checkDuplicateMovieTitles(propertyName, collection): Promise<any> {
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
    return new Promise<any>((resolve, reject) => {
      this.fS.getMoviesByTitle(movieTitle)
        .then(res => {
          resolve(res);
          // this.duplicateMovieDetails = res;
          // console.log(this.duplicateMovieDetails);
        });
    });
  }

  getDuplicateMovieDetailsBySlug(movieSlug: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.fS.getMoviesBySlug(movieSlug)
        .then(res => {
          resolve(res);
          // this.duplicateMovieDetails = res;
          // console.log(this.duplicateMovieDetails);
        });
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FirebaseService } from '../../../core/services/firebase/firebase.service';
import { AppService } from '../../../core/services/app.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

  keyword: string;

  constructor(
    private router: Router,
    private fbs: FirebaseService,
    private as: AppService
  ) { }

  ngOnInit(): void { }

  goToSearchPage(keyword: string, searchType?: string): void {
    if (keyword) {
      const searchURL = this.as.urlOptimizeText(keyword)
        .then(res => {
          // if (searchType === 'movies') {
          this.fbs.saveMovieSearchQueryToDB(keyword);
          this.router.navigate(['search/movies/' + res]);
        });
      // }
    } else {
      // Show message "Please Enter Text To Search For" or something like that
    }
  }

}

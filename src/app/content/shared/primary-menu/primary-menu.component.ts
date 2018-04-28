import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { AppService } from '../../../core/services/app.service';
import { AuthService } from '../../../core/auth/services/auth.service';
import { ApiService } from '../../../core/services/api/api.service';

@Component({
  selector: 'app-primary-menu',
  templateUrl: './primary-menu.component.html',
  styleUrls: ['./primary-menu.component.css']
})
export class PrimaryMenuComponent implements OnInit {

  movieGenresList: any;

  constructor(
    private as: AppService,
    public aus: AuthService,
    private apis: ApiService,
    private router: Router
  ) {
    this.getMovieGenres();
  }

  ngOnInit(): void { }

  getMovieGenres(): void {
    this.apis.getMovieGenres().subscribe((res) => {
      this.movieGenresList = res['genres'];
    });
  }

  toggleSearch(): void {
    const mainsearch = document.getElementById('main-search');
      if (mainsearch.style.visibility === 'visible') {
        mainsearch.style.visibility = 'hidden';
      } else {
        mainsearch.style.visibility = 'visible';
      }
    }
}

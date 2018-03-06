import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { AppService } from '../../../services/app.service';
import { AuthService } from '../../../core/auth/auth.service';
import { ApiService } from '../../../services/api/api.service';

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
}

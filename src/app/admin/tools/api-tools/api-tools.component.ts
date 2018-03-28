import { Component, OnInit } from '@angular/core';
// Services
import { ApiService } from '../../../core/services/api/api.service';

@Component({
  selector: 'app-api-tools',
  templateUrl: './api-tools.component.html',
  styleUrls: ['./api-tools.component.css']
})
export class ApiToolsComponent implements OnInit {

  constructor(
    private apis: ApiService
  ) { }

  ngOnInit(): void { }

  // Get Data From TMDB API
  getAPIConfig(): void {
    this.apis.getAPIConfig();
  }
  getMovieGenres(): void {
    this.apis.getMovieGenres();
  }

}

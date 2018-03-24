import { Component, OnInit } from '@angular/core';
// Services
import { AppService } from '../../core/services/app.service';
import { ApiService } from '../../core/services/api/api.service';
@Component({
  selector: 'app-genres-list',
  templateUrl: './genres-list.component.html',
  styleUrls: ['./genres-list.component.css']
})
export class GenresListComponent implements OnInit {

  genresList: any[];

  constructor(
    private apis: ApiService,
    private as: AppService
  ) {
    this.apis.getMovieGenres().subscribe(res => {
      this.genresList = res['genres'];
      console.log(this.genresList);
    });
  }

  ngOnInit(): void { }

}

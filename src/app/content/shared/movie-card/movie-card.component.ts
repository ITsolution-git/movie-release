import { Component, OnInit, Input } from '@angular/core';
import { AppService } from '../../../core/services/app.service';
// Constants
import { TMDB_IMAGES_BASE_URL, IMG_300 } from '../../../constants';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit {

  @Input() movie: any[];

  TMDB_IMAGES_BASE_URL: any;
  IMG_300: any;

  constructor(
    public as: AppService
  ) {
    // Initialize Constants
    this.TMDB_IMAGES_BASE_URL = TMDB_IMAGES_BASE_URL;
    this.IMG_300 = IMG_300;
  }

  ngOnInit(): void { }

}

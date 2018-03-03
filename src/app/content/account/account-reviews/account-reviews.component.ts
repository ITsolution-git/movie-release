import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
// Constants
import { APP_SEO_NAME } from '../../../constants';
@Component({
  selector: 'app-account-reviews',
  templateUrl: './account-reviews.component.html',
  styleUrls: ['./account-reviews.component.css']
})
export class AccountReviewsComponent implements OnInit {

  reviews: any[];
  loading = false;

  constructor(
    public title: Title
  ) {
    // Set SEO Title
    this.title.setTitle('My Reviews - ' + APP_SEO_NAME);
    this.getUserReviews();
  }

  ngOnInit(): void { }

  getUserReviews(): void {
    this.loading = true;
    // console.log('GET REVIEWS');
    if (this.reviews) {
      this.loading = false;
    }
  }

}

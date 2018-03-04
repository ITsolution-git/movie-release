import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
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
    public title: Title,
    public meta: Meta
  ) {
    // Set SEO Title & remove Description & Keywords (This Page Does Not Need to be Indexed)
    this.title.setTitle('My Reviews - ' + APP_SEO_NAME);
    this.meta.removeTag('name = "description"');
    this.meta.removeTag('name = "keywords"');

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

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Components
import { AccountComponent } from './account.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { AccountFavoritesComponent } from './account-favorites/account-favorites.component';
import { AccountReviewsComponent } from './account-reviews/account-reviews.component';
import { AccountRatingsComponent } from './account-ratings/account-ratings.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

// Account Routes
const accountRoutes = [
  {
    path: '', component: AccountComponent, children: [
      { path: '', redirectTo: 'details', pathMatch: 'full' },
      { path: 'details', component: AccountDetailsComponent },
      { path: 'favorites', component: AccountFavoritesComponent },
      { path: 'reviews', component: AccountReviewsComponent },
      { path: 'ratings', component: AccountRatingsComponent },
      { path: 'settings', component: AccountSettingsComponent }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(accountRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AccountRoutingModule { }

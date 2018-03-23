import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
// Material
import {
  MatButtonModule,
  MatInputModule,
  MatCardModule,
  MatSelectModule,
  MatTabsModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatListModule,
  MatIconModule,
  MatTableModule,
} from '@angular/material';

// Routing Module
import { AccountRoutingModule } from './account-routing.module';

// Components
import { AccountComponent } from './account.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { AccountFavoritesComponent } from './account-favorites/account-favorites.component';
import { AccountRatingsComponent } from './account-ratings/account-ratings.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    AccountRoutingModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatTableModule
  ],
  declarations: [
    AccountComponent,
    AccountDetailsComponent,
    AccountFavoritesComponent,
    AccountRatingsComponent
  ]
})
export class AccountModule { }

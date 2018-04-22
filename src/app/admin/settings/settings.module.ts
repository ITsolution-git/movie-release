import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
// Material
import {
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatTabsModule,
  MatButtonModule
} from '@angular/material';
// Router Module
import { SettingsRoutingModule } from './settings-routing.module';
// Components
import { SettingsComponent } from './settings.component';
import { SeoComponent } from './seo/seo.component';
import { AdsComponent } from './ads/ads.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    SettingsRoutingModule,
    MatCardModule,
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule
  ],
  declarations: [
    SettingsComponent,
    SeoComponent,
    AdsComponent
  ]
})
export class SettingsModule { }

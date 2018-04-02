import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// Components
import { SettingsComponent } from './settings.component';
// Articles Routes
const settingsRoutes = [
  { path: '', component: SettingsComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(settingsRoutes)
  ],
  declarations: []
})
export class SettingsRoutingModule { }

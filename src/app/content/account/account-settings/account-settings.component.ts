import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
// Constants
import { APP_SEO_NAME } from '../../../constants';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

  settings: any[];
  loading = false;

  constructor(
    public title: Title,
  ) {
    // Set SEO Title
    this.title.setTitle('Account Settings - ' + APP_SEO_NAME);

    this.getUserSettings();
  }

  ngOnInit() {
  }

  getUserSettings(): void {
    this.loading = true;
    console.log('GET SETTINGS');
    if (this.settings) {
      this.loading = false;
    }
  }

}

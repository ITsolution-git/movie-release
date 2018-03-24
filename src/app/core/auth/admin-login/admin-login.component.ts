import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
// Services
import { AuthService } from '../services/auth.service';
// Constants
import { APP_SEO_NAME } from '../../../constants';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {

  constructor(
    public title: Title,
    public as: AuthService
  ) {
    // Set SEO Title
    this.title.setTitle('Admin Login - ' + APP_SEO_NAME);
    this.as.resetMessages();
  }

}

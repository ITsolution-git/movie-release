import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
// Services
import { AuthService } from '../auth.service';
// Constants
import { APP_SEO_NAME } from '../../../constants';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(
    public meta: Meta,
    public title: Title,
    public as: AuthService
  ) {
    // Set SEO Title, Keywords and Description Meta tags
    this.title.setTitle('Forgot Password - ' + APP_SEO_NAME);
    this.meta.addTags([
      { name: 'keywords', content: 'forgot password, movies, movie, film' },
      // tslint:disable-next-line:max-line-length
      { name: 'description', content: 'Forgot your current movie releases password? No problem, we can help you to reset your password!' + APP_SEO_NAME }
    ]);
    this.as.resetMessages();
  }

  ngOnInit() {
  }

}

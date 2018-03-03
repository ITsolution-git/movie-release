import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
// Services
import { AuthService } from '../auth.service';
// Constants
import { APP_SEO_NAME } from '../../../constants';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    public meta: Meta,
    public title: Title,
    public as: AuthService
  ) {
    // Set SEO Title, Keywords and Description Meta tags
    this.title.setTitle('Login - ' + APP_SEO_NAME);
    this.meta.addTags([
      { name: 'keywords', content: 'login, movies directory, movie, film' },
      { name: 'description', content: 'Sign in to movies.directory to keep track of your favorite movies and TV Shows!' + APP_SEO_NAME }
    ]);
    this.as.resetMessages();
  }

}

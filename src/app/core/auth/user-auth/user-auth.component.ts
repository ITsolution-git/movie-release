import { Component } from '@angular/core';
// import { Meta, Title } from '@angular/platform-browser';
// Services
import { AuthService } from '../services/auth.service';
// Constants
// import { APP_SEO_NAME } from '../../../constants';
@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {

  constructor(
    // public meta: Meta,
    // public title: Title,
    public as: AuthService
  ) {
    // Set SEO Title, Keywords and Description Meta tags
    // this.title.setTitle('Login - ' + APP_SEO_NAME);
    // this.meta.updateTag(
    //   { name: 'description', content: 'Sign in to current movie releases to keep track of your favorite movies!' + APP_SEO_NAME }
    // );
    // this.meta.updateTag(
    //   { name: 'keywords', content: 'login, movies, movie, film' },
    // );
    // this.as.resetMessages();
  }

}

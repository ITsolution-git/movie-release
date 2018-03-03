import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
// Services
import { AuthService } from '../auth.service';
// Constants
import { APP_SEO_NAME } from '../../../constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(
    public meta: Meta,
    public title: Title,
    public as: AuthService
  ) {
    // Set SEO Title, Keywords and Description Meta tags
    this.title.setTitle('Register - ' + APP_SEO_NAME);
    this.meta.addTags([
      { name: 'keywords', content: 'register, movies, movie, film' },
      { name: 'description', content: 'Register on current movie releases to keep track of your favorite movies and TV Shows!' + APP_SEO_NAME }
    ]);
    this.as.resetMessages();
  }

}

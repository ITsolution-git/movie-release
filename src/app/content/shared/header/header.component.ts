import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// Services
import { AppService } from '../../../services/app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isMenuOpen;
  isSmallScreen: boolean;
  screenSize: number;

  constructor(
    private router: Router,
    private ar: ActivatedRoute,
    private as: AppService
  ) {
    this.router.events
      .subscribe((res) => {
        // console.log('ROUTER CHANGED: ', res);
        this.screenSize = window.innerWidth;
        // console.log(this.screenSize);
        if (this.screenSize < 959) {
          this.isMenuOpen = false;
          this.isSmallScreen = true;
        } else {
          this.isMenuOpen = true;
          this.isSmallScreen = false;
        }
      });
  }

  ngOnInit(): void { }

  toggleMobileMenu(): void {
    // console.log(this.isMenuOpen);
    this.isMenuOpen = !this.isMenuOpen;
  }

  onResize(event) {
    this.screenSize = event.target.innerWidth;
    if (this.screenSize < 959) {
      this.isSmallScreen = true;
      this.isMenuOpen = false;
    } else {
      this.isSmallScreen = false;
      this.isMenuOpen = true;
    }
    // console.log(this.screenSize);
  }

}

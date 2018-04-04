import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
// Services
import { AuthService } from '../services/auth.service';
import { SeoService } from '../../../core/services/seo/seo.service';
// Constants
import { APP_SEO_NAME } from '../../../constants';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  pageSeoTitle: string;
  pageSeoDescr: string;
  pageSeoKeywords: string;

  constructor(
    public meta: Meta,
    public title: Title,
    public as: AuthService,
    private seoS: SeoService
  ) {
    // Set SEO Meta Tags
    this.pageSeoTitle = 'Forgot Password';
    this.pageSeoDescr = 'Forgot your current movie releases password? No problem, we can help you to reset your password!';
    this.pageSeoKeywords = 'forgot password, reset password';
    seoS.setSeoMetaTags(this.pageSeoTitle, this.pageSeoDescr, this.pageSeoKeywords);
    // Reset Form Messages
    this.as.resetMessages();
  }

  ngOnInit(): void { }

}

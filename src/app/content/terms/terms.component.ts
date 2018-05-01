import { Component, OnInit } from '@angular/core';
import { AppService } from '../../core/services/app.service';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent implements OnInit {

  constructor(
    private as: AppService
  ) { }

   ngOnInit(): void {
    this.as.scrollToTop();
  }

}

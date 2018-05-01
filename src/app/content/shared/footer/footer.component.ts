import { Component, OnInit, OnDestroy, AfterViewInit, Input, Output } from '@angular/core';
import { AppService } from '../../../core/services/app.service';
import { AdsenseWidgetsComponent } from '../adsense-widgets/adsense-widgets.component';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  @Output() slotId: number;

  constructor(
    public as: AppService
  ) { }

  ngOnInit() {
  }

  toggleSearch(): void {
    const mainsearch = document.getElementById('main-search');
    const mainsearchinput = document.getElementById('searchinput');
      if (mainsearch.style.visibility === 'visible') {
        mainsearch.style.visibility = 'hidden';
      } else {
        mainsearch.style.visibility = 'visible';
        mainsearchinput.focus();
      }
    }

}

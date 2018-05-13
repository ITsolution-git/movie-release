import { Component, OnInit, Output } from '@angular/core';
// Services
import { AppService } from '../../../core/services/app.service';
// Components
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

  ngOnInit(): void { }

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

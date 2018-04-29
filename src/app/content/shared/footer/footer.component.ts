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

}

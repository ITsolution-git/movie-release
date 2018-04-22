import { Component, OnInit, AfterViewChecked, AfterViewInit } from '@angular/core';
import { AppService } from '../../../core/services/app.service';

@Component({
  moduleId: module.id,
  selector: 'app-adsense-widgets',
  templateUrl: './adsense-widgets.component.html',
  styleUrls: ['./adsense-widgets.component.css']
})
export class AdsenseWidgetsComponent implements OnInit, AfterViewInit {

  adsenseWidget = [
    {
      'name': 'CMR - Movie Details - Overview',
      'id': '8145249147'
    },
    {
      'name': 'CMR - Movie Details - Bottom',
      'id': '7054872218'
    },
    {
      'name': 'CMR - Footer - Responsive Links',
      'id': '8891110759'
    }
  ];

  // loadIndex: number;

  // sliceLow: number;
  // slideHigh: number;
  // slideHighLimit = 3;


  adsbygoogle: any;

  constructor(
    public appService: AppService
  ) {
    // console.log(
    //  this.adsenseWidget,
    //  this.loadIndex,
    //  '#################', this.loadIndex,
    //  document.querySelector('.advert-widget')
    // );

    // this.loadIndex = this.appService.adLoadIndex + this.loadIndex;
    // this.appService.adLoadIndex = this.loadIndex++;

    // console.log(
    //   this.adsenseWidget,
    //   this.loadIndex,
    //   '#################', this.loadIndex,
    // );


    // if (this.loadIndex === 0) {
    //   this.sliceLow = this.loadIndex;
    //   this.slideHigh = this.loadIndex + 1;
    // };

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    setTimeout(() => {
      try {
        (window['adsbygoogle'] = window['adsbygoogle'] || []).push({});
      } catch (e) {
        console.error(e);
      }
    }, 2000);
  }


}

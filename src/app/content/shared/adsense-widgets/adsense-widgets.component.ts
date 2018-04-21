import { Component, OnInit, AfterViewChecked, AfterViewInit } from '@angular/core';

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


  adsbygoogle: any;

  constructor() { }

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

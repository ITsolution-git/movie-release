import { Component, OnInit, AfterViewChecked, AfterViewInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-adsense-widgets',
  templateUrl: './adsense-widgets.component.html',
  styleUrls: ['./adsense-widgets.component.css']
})
export class AdsenseWidgetsComponent implements OnInit, AfterViewInit {

      adslot = '8145249147';
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

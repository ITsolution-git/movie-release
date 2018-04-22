import { Component, OnInit, AfterViewChecked, AfterViewInit, Input, OnDestroy } from '@angular/core';
// AngularFire
import { AngularFireDatabase } from 'angularfire2/database';
// Constants
import { DB_COL } from '../../../constants';

@Component({
  moduleId: module.id,
  selector: 'app-adsense-widgets',
  templateUrl: './adsense-widgets.component.html',
  styleUrls: ['./adsense-widgets.component.css']
})
export class AdsenseWidgetsComponent implements OnInit, AfterViewInit {

  @Input() slotId: any;

  adsbygoogle: any;
  // adsList: any

  constructor(
    private afDb: AngularFireDatabase
  ) {
    // this.afDb.list(DB_COL.SETTINGS_ADS).valueChanges().subscribe(
    //   res => {
    //     this.adsList = res;
    //   }
    // )
  }

  ngOnInit() { }

  ngAfterViewInit() {
    setTimeout(() => {
      try {
        (window['adsbygoogle'] = window['adsbygoogle'] || []).push({});
      } catch (e) {
        console.error(e);
      }
    }, 2000);
  }

  ngOnDestroy() {
    console.log('DESTROY ADS');
    
    window['adsbygoogle'] = [];
  }

}

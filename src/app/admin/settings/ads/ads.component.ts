import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
// AngularFire
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { ToastsManager } from 'ng2-toastr';
// RxJs
import { Observable } from 'rxjs/Observable';
// Constants
import { DB_COL } from '../../../constants';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css']
})
export class AdsComponent implements OnInit {

  adForm: FormGroup;
  ads: any[];
  adSettings: AngularFireList<any>;

  constructor(
    private afDb: AngularFireDatabase,
    private fb: FormBuilder,
    private toast: ToastsManager
  ) {

    // Create Rective Form & Form Controls
    this.adForm = fb.group({
      // name: [{ value: '', disabled: true }, Validators.required],
      slot_id: ['', Validators.required]
    });

    // Initialize DB Collection
    this.adSettings = this.afDb.list(DB_COL.SETTINGS_ADS);

    // Get the list of ads from DB
    this.adSettings.valueChanges().subscribe(
      res => {
        this.ads = res;
      }
    )
  }

  ngOnInit(): void { }

  saveAds(formValues: any, i: any): void {
    console.log(formValues);
    this.adSettings.update((i).toString(), formValues).then(
      () => {
        this.toast.success('Ad Saved!')
      }
    );
  }

  addNewAd(): void {
    console.log('Add New');
  }

}

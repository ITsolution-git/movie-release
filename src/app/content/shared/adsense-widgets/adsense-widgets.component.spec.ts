import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsenseWidgetsComponent } from './adsense-widgets.component';

describe('AdsenseWidgetsComponent', () => {
  let component: AdsenseWidgetsComponent;
  let fixture: ComponentFixture<AdsenseWidgetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdsenseWidgetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdsenseWidgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

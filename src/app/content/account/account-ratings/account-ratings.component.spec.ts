import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountRatingsComponent } from './account-ratings.component';

describe('AccountRatingsComponent', () => {
  let component: AccountRatingsComponent;
  let fixture: ComponentFixture<AccountRatingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountRatingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountRatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

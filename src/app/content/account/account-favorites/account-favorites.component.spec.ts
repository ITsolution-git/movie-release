import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountFavoritesComponent } from './account-favorites.component';

describe('AccountFavoritesComponent', () => {
  let component: AccountFavoritesComponent;
  let fixture: ComponentFixture<AccountFavoritesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountFavoritesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

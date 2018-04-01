import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CelebDetailsComponent } from './celeb-details.component';

describe('CelebDetailsComponent', () => {
  let component: CelebDetailsComponent;
  let fixture: ComponentFixture<CelebDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CelebDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CelebDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

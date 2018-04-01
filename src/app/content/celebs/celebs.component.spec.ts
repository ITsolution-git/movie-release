import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CelebsComponent } from './celebs.component';

describe('CelebsComponent', () => {
  let component: CelebsComponent;
  let fixture: ComponentFixture<CelebsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CelebsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CelebsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

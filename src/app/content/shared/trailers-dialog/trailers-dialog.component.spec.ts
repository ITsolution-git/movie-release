import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailersDialogComponent } from './trailers-dialog.component';

describe('TrailersDialogComponent', () => {
  let component: TrailersDialogComponent;
  let fixture: ComponentFixture<TrailersDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrailersDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrailersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

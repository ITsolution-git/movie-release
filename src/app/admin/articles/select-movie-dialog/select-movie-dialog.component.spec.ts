import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectMovieDialogComponent } from './select-movie-dialog.component';

describe('SelectMovieDialogComponent', () => {
  let component: SelectMovieDialogComponent;
  let fixture: ComponentFixture<SelectMovieDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectMovieDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectMovieDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

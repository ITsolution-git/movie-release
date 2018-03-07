import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainMoviesDirectoryComponent } from './main-movies-directory.component';

describe('MainMoviesDirectoryComponent', () => {
  let component: MainMoviesDirectoryComponent;
  let fixture: ComponentFixture<MainMoviesDirectoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainMoviesDirectoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainMoviesDirectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

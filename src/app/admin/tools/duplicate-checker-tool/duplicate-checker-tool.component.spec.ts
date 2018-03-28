import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplicateCheckerToolComponent } from './duplicate-checker-tool.component';

describe('DuplicateCheckerToolComponent', () => {
  let component: DuplicateCheckerToolComponent;
  let fixture: ComponentFixture<DuplicateCheckerToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuplicateCheckerToolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuplicateCheckerToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiToolsComponent } from './api-tools.component';

describe('ApiToolsComponent', () => {
  let component: ApiToolsComponent;
  let fixture: ComponentFixture<ApiToolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiToolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

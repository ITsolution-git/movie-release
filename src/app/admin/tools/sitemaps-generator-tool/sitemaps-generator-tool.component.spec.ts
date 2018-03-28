import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SitemapsGeneratorToolComponent } from './sitemaps-generator-tool.component';

describe('SitemapsGeneratorToolComponent', () => {
  let component: SitemapsGeneratorToolComponent;
  let fixture: ComponentFixture<SitemapsGeneratorToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SitemapsGeneratorToolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitemapsGeneratorToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

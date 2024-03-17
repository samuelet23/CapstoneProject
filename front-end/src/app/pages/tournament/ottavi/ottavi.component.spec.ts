import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OttaviComponent } from './ottavi.component';

describe('OttaviComponent', () => {
  let component: OttaviComponent;
  let fixture: ComponentFixture<OttaviComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OttaviComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OttaviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

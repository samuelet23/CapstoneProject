import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuartiComponent } from './quarti.component';

describe('QuartiComponent', () => {
  let component: QuartiComponent;
  let fixture: ComponentFixture<QuartiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuartiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuartiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

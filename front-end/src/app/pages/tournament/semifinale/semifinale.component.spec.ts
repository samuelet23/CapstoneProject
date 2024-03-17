import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemifinaleComponent } from './semifinale.component';

describe('SemifinaleComponent', () => {
  let component: SemifinaleComponent;
  let fixture: ComponentFixture<SemifinaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SemifinaleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SemifinaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

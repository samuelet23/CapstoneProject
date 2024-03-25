import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCaptainComponent } from './register-captain.component';

describe('RegisterCaptainComponent', () => {
  let component: RegisterCaptainComponent;
  let fixture: ComponentFixture<RegisterCaptainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterCaptainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterCaptainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

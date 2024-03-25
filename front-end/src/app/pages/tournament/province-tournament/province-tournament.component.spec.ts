import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvinceTournamentComponent } from './province-tournament.component';

describe('ProvinceTournamentComponent', () => {
  let component: ProvinceTournamentComponent;
  let fixture: ComponentFixture<ProvinceTournamentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProvinceTournamentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProvinceTournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

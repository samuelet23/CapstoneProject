import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavTournamentComponent } from './nav-tournament.component';

describe('NavTournamentComponent', () => {
  let component: NavTournamentComponent;
  let fixture: ComponentFixture<NavTournamentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavTournamentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavTournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Injectable, inject, Component, OnInit } from '@angular/core';
import { PlaceService } from '../../services/place.service';
import { Province, Town } from '../../api/models';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { myAuthService } from '../../services/myAuth.service';
import { RefereeService } from '../../api/services';
import { RefereesService } from '../../services/referees.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private placeSv = inject(PlaceService);
  private router = inject(Router);
  searchTerm: string = '';
  provinces: Province[] = [];
  isLoading: boolean = false;

  constructor() {}
  ngOnInit(): void {}

  onSearch() {
    if (this.searchTerm.trim() !== '') {
      this.placeSv.getProvinceByName(this.searchTerm).subscribe(
        (towns: Province[]) => {
          this.provinces = towns;
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
    }
  }

  createTournament() {
    this.router.navigate(['/tournament/create']);
  }
}

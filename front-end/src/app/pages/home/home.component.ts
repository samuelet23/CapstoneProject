import { Injectable, inject, Component, OnInit } from '@angular/core';
import { PlaceService } from '../../services/place.service';
import { Province, Town } from '../../api/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private placeSv = inject(PlaceService)
  searchTerm: string = '';
provinces: Province[] = []
  isLoading: boolean = false
  showAutocomplete: boolean = false;

    constructor(){}
  ngOnInit(): void {
  }


  onSearch() {
    if (this.searchTerm.trim() !== '') {
      this.placeSv.getProvinceByName(this.searchTerm).subscribe(
        (towns: Province[]) => {
          this.provinces = towns
          console.log(towns);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
    }
  }


  }


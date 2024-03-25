import { Component, inject } from '@angular/core';
import { PlaceService } from '../../services/place.service';
import { Router } from '@angular/router';
import { Province } from '../../api/models';
import { myAuthService } from '../../services/myAuth.service';

@Component({
  selector: '.app-home-search',
  templateUrl: './home-search.component.html',
  styleUrl: './home-search.component.scss'
})
export class HomeSearchComponent {
  private placeSv = inject(PlaceService);
  private router = inject(Router);
  private auth = inject(myAuthService)

  searchTerm: string = '';
  provinces: Province[] = [];
  isLoading: boolean = false;
  isManager: boolean = false;

  ngOnInit(){
    this.auth.getUserRole$().subscribe(role =>{
      if (role === "MANAGER") {
        this.isManager = true;
        return;
      }
      return;
    })
  }
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

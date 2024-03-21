import { formatDate } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { PlaceService } from '../../../services/place.service';
import { Province, TournamentDto } from '../../../api/models';
import { TournamentService } from '../../../services/tournament.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  private fb = inject(FormBuilder)
  private router = inject(Router)
  private placeSv = inject(PlaceService)
  private tournamentSv = inject(TournamentService)
  tournamentForm!: FormGroup;
  tournamentDto!:TournamentDto
  levels = ['JUNIOR', 'RISING STARS', 'ELITE'];
  referees: string[] = [];
  provinces: Province[] = [];
  urlImg:string  = ''


  ngOnInit(): void {
    this.getAllProvince()
    this.tournamentForm = this.fb.group({
      level: ['', Validators.required],
      name: ['', [Validators.required, Validators.minLength(3)]],
      coverImage: [null],
      place: this.fb.group({
        address: this.fb.group({
          courtName: ['', [Validators.required, Validators.minLength(3)]],
          townName: ['', Validators.required],
          via: ['', Validators.required],
          civico: ['', Validators.required],
          cap: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]]
        })
      }),
      referees: this.fb.array([]),
      startDate: ['', Validators.required]
    });
    this.tournamentForm.get('place.address.siglaProvince')?.valueChanges.subscribe(value => {
      if (value.length === 2) {
        this.getAllProvince();
      }
    });

  }

  submitForm(){
    if (this.tournamentForm.valid) {
      this.getAllProvince()
      const townName = this.tournamentForm.get('place.address.townName')?.value
      const existsSigla = this.provinces.find(province => province.name === townName)
      const tournamentName = this.tournamentForm.get('name')?.value;

      if (existsSigla) {
        this.tournamentDto = {
          name: this.deletAllSpace(this.tournamentForm.get('name')?.value),
          coverUrl:this.urlImg,
          startDate: this.checkDateAndFormat(this.tournamentForm.get('startDate')?.value),
        level: this.tournamentForm.get('level')?.value,
        place: {
          courtName: this.tournamentForm.get('place.address.courtName')?.value,
          address: {
            siglaProvince: existsSigla.sigla,
            townName: this.tournamentForm.get('place.address.townName')?.value,
            via: this.tournamentForm.get('place.address.via')?.value,
            civico: this.tournamentForm.get('place.address.civico')?.value,
            cap: this.tournamentForm.get('place.address.cap')?.value
          }
        }
      };
    }else{
      console.error("Città inesistente");

    }

      this.tournamentSv.createTournament(this.tournamentDto).subscribe(() =>{
        Swal.fire("Il torneo è stato creato correttamente")
        this.router.navigate([`/tournament/${tournamentName}/referee`])
      },
      (error) =>{
        Swal.fire("Errore nella creazione del torneo")
      })
  }
  }

  deletAllSpace(name:string){
      return name.replace(/\s+/g, '').toLowerCase();
    }



  onFileSelected(event:any){
    const file: File = event.target.files[0];

    this.tournamentSv.uploadCoverTournament(file).subscribe(
      response => {
        this.urlImg = response.url
        console.log(this.urlImg);

      },
      (error) => {
          Swal.fire("Errore nel caricamento dell'immagine. Prova con un immagine con dimensioni inferiori")
      }
    );
  }


  existSiglaProvincia(sigla: string): boolean {
    this.getAllProvince()
    return this.provinces.some(province => province.sigla === sigla);
}

  existProvincia(sigla: string): boolean {
    this.getAllProvince()
    return this.provinces.some(province => province.name === sigla);
}




  getAllProvince() {
    this.placeSv.getAllProvince().subscribe((provinces: Province[]) => {

      this.provinces = provinces;
    },
    (error) =>{
      Swal.fire (error.error.message)
    });
  }




checkCityExists(townName: string) {
  const cityExists = this.provinces.some(prov => prov.name === townName);
  if (!cityExists) {
    Swal.fire('Errore', 'La città non esiste nel database per la provincia specificata.', 'error');
  }
}



  checkDateAndFormat(dateOfBirth: string): string {
    const dateOfBirthDate: Date = new Date(dateOfBirth);
    const today: Date = new Date();
    if (isNaN(dateOfBirthDate.getTime()) || dateOfBirthDate < today) {
      Swal.fire('Errore', 'Non puoi creare un torneo con una data passata', 'error');
      throw new Error('Non puoi creare un torneo con una data passata');
    }
    return formatDate(dateOfBirthDate, 'dd-MM-yyyy', 'en-US');
  }

  isNotValidAndTouched(controlName: string): boolean | null {
    const control = this.tournamentForm.get(controlName);
    return control && control.invalid && control.touched;
  }


}

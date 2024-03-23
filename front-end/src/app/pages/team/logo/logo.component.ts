import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerService } from '../../../services/player.service';
import Swal from 'sweetalert2';
import { TeamService } from '../../../services/team.service';
import { Team } from '../../../api/models';
import { Location } from '@angular/common';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss'
})
export class LogoComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private location = inject(Location);
  private playerSv = inject(PlayerService)

isLoading:boolean = false;
urlImg:string = ''
nickname = this.route.snapshot.paramMap.get('name')
team!:Team


  ngOnInit(): void {
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    this.isLoading = true;

    if (this.nickname) {

      this.playerSv.uploadLogoPlayer(this.nickname, file).subscribe(
        response => {
          this.urlImg = response.url;
          this.isLoading = false;
        },
        (error) => {
          Swal.fire("Errore nel caricamento dell'immagine. Prova con un immagine con dimensioni inferiori");
          this.isLoading = false;
        }
      );
    }
  }


  salvaLogo(){
    if (this.urlImg) {
      Swal.fire("Logo per il giocatore salvato con successo")
      this.location.back();
    } else{
      Swal.fire("Errore, Inserisci un immagina!")
    }
  }

}

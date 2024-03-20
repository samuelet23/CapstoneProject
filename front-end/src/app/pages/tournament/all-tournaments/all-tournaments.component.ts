import { Component, OnInit, inject } from '@angular/core';
import { TournamentService } from '../../../services/tournament.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tournament } from '../../../api/models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-tournaments',
  templateUrl: './all-tournaments.component.html',
  styleUrl: './all-tournaments.component.scss'
})
export class AllTournamentsComponent implements OnInit {
private tournamentSv = inject(TournamentService)
private route  = inject(ActivatedRoute)
private router  = inject(Router)
isLoading: boolean = false
isWithReferee:boolean = true
provinceName: string | null = this.route.snapshot.paramMap.get('provinceName');
tournaments:Tournament[] =[]

ngOnInit(): void {
  console.log(this.isWithReferee);

  this.isLoading = true;
  if (this.provinceName) {
    console.log(this.provinceName);

    let hasReferee = false; // Variabile di supporto per tenere traccia della presenza di arbitri

    this.tournamentSv.getAllTournamentFromProvinceName(this.provinceName.trim().toLowerCase()).subscribe((tournaments) => {
      this.isLoading = false;

      tournaments.forEach(tournament => {
        if (tournament.referees?.length === 0) {
          console.log("Non ci sono arbitri per il torneo:", tournament);
        } else {
          hasReferee = true; // Se trovi anche un torneo con arbitri, imposta hasReferee a true
          console.log("Ci sono arbitri per il torneo:", tournament);
        }
      });

      this.isWithReferee = hasReferee;

      console.log("isWithReferee:", this.isWithReferee);

      if (tournaments.length > 0) {
        this.tournaments = tournaments;
      } else {
        Swal.fire("Non ci sono tornei disponibili per questa città").then(() => {
          this.router.navigate(['/']);
        });
      }
    },
    (error) => {
      this.isLoading = false;
      Swal.fire("Errore interno nel cercare i tornei per questa città");
    });
  }
}

}

import { AddPointsDto } from './../../api/models/add-points-dto';
import { AbstractControl } from '@angular/forms';
import { Component, OnInit, inject } from '@angular/core';
import { GameService } from '../../services/game.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Game, Team } from '../../api/models';
import Swal from 'sweetalert2';
import { Unsubscribable } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit  {
private gameSv = inject(GameService);
private location = inject(Location);
private route = inject(ActivatedRoute);
private router = inject(Router);
partita: Game ={
  awayPoints: 0,
  homePoints: 0
}
isLoading:boolean = false;
idGame:string | null = this.route.snapshot.paramMap.get('id')
isStarted:boolean = false;
isScheduled:boolean = false;
isFinished:boolean = false
winnerTeam!: Team | undefined
constructor(){}

ngOnInit(): void {
  this.isLoading = true;
  if (this.idGame) {
    this.gameSv.getGameById(this.idGame).subscribe(game => {
      this.partita = game;
      if (game.status === "FINISHED") {
        this.winnerTeam = game.winner
      }
      this.updateGameStatus();
      this.isLoading = false
      return;
    },
    error => {
      this.isLoading = false;
      Swal.fire(error.error.message);
      return;
    });
  }
  this.isLoading = false;
}
goBack(){
  this.location.back()
}
startGame(): void {
  this.isLoading = true;
  if (this.idGame) {
    this.gameSv.startGame(this.idGame).subscribe(result => {
      this.partita = result;
      this.isLoading = false
      this.isScheduled = false
      this.isStarted = true;
      return;
    },
    error => {
      this.isLoading = false
      Swal.fire(error.error.message);
      return;
    });
  }
  this.isLoading = false;
}


addHomePoints(pointToAdd: number, siglaPlayer:string){
  this.partita.homePoints += pointToAdd
  const dto:AddPointsDto ={
    pointToAdd: pointToAdd,
    siglaPlayer:siglaPlayer
  }


  this.isLoading = true;
  if (this.idGame) {
    this.gameSv.updateHomePoints(this.idGame, dto).subscribe((res) =>{
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: res.message
      });
      return;
    },
    (error) =>{
      console.log(dto, "home");

      Swal.fire(error.error.message)
      this.isLoading = false;
      return;
    })
    this.isLoading = false;
  }

  this.isLoading = false;
}

addAwayPoints(pointToAdd: number, siglaPlayer:string){
  this.partita.awayPoints += pointToAdd

  const dto:AddPointsDto ={
    pointToAdd: pointToAdd,
    siglaPlayer:siglaPlayer
  }

  this.isLoading = true;

  if (this.idGame) {
    this.gameSv.updateAwayPoints(this.idGame, dto).subscribe((res) =>{
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: res.message
      });
      return;

    },
    (error) =>{
      Swal.fire(error.error.message)
      console.log(dto, "away");
      this.isLoading = false;
      return;

    })
    this.isLoading = false;
  }
  this.isLoading = false;
}




finishedGame(){
  this.isLoading = true;
  if (this.idGame) {
    this.gameSv.finishGame(this.idGame, ).subscribe(result =>{
      this.winnerTeam = result
      this.isLoading = false;
      this.isScheduled = false;
      this.isStarted = false;
      this.isFinished = true;
      return;

    },
    (error) =>{
      this.isLoading = false;
      Swal.fire(error.error.message)
      return;

    })
    this.isLoading = false;
  }
}

private updateGameStatus(): void {
  if (this.partita.status === "SCHEDULED") {
    this.isScheduled = true;
    this.isStarted = false;
    this.isFinished = false;
  } else if (this.partita.status === "STARTED") {
    this.isScheduled = false;
    this.isStarted = true;
    this.isFinished = false;
  } else if (this.partita.status === "FINISHED") {
    this.isScheduled = false;
    this.isStarted = false;
    this.isFinished = true;
  }
}



}

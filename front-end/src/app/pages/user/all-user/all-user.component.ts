import Swal from 'sweetalert2';
import { User } from '../../../api/models';
import { UserService } from './../../../services/user.service';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-all-user',
  templateUrl: './all-user.component.html',
  styleUrl: './all-user.component.scss',
})
export class AllUserComponent implements OnInit {
  private userSv = inject(UserService);
  private router = inject(Router);
  private location = inject(Location)

  isLoading: boolean = false;

  users: User[] = [];

  constructor() {}

  ngOnInit(): void {
    this.isLoading = true;
    this.userSv.getAllUSer().subscribe(
      (users) => {
        this.isLoading = false;
        const userData = localStorage.getItem('utente');

        if (userData) {
          const user = JSON.parse(userData);
          users = users.filter((u) => u.username !== user.username);
        }

        this.users = users;
      },
      (error) => {
        this.isLoading = false;
        Swal.fire('Errore interno');
        this.router.navigate(['/']);
      }
    );
  }
goBack(){
  this.location.back();
}
  makeUserUser(user: User) {
    this.isLoading = true;
    this.userSv.updateUserToUser(user.username).subscribe(
      (data) => {
        Swal.fire({
          title: 'Sei sicuro?',
          text: `${user.name} potrà solo guardare l'andamento dei tornei, non avrà accesso più alle funzionalità`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, Continua!',
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: `Modifica effettuata`,
              text: `Adesso ${user.name} è user!`,
              icon: 'success',
            });
            const updatedUserIndex = this.users.findIndex(
              (u) => u.username === user.username
            );
            if (updatedUserIndex !== -1) {
              this.users[updatedUserIndex].role = 'USER';
            }
            this.isLoading = false;
          }
          this.isLoading = false
        });
      },
      (error) => {
        if (
          error.error.message ===
          "You don't have permissions to access this resource"
        ) {
          Swal.fire(
            'Tu non hai il permesso per fare questa modifica, contatta un organizzatore'
          );
          this.isLoading = false;
        }
        Swal.fire(error.error.message);
        this.isLoading = false;
      }
    );
  }

  makeUserCoordinator(user: User) {
    this.isLoading = true;
    this.userSv.updateUserToCoordinator(user.username).subscribe(
      (data) => {
        Swal.fire({
          title: 'Sei sicuro?',
          text: `${user.name} avrà accesso alle funzionalità del capitano`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, Continua!',
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: `Modifica effettuata`,
              text: `Adesso ${user.name} è un capitano !`,
              icon: 'success',
            });
            const updatedUserIndex = this.users.findIndex(
              (u) => u.username === user.username
              );
              if (updatedUserIndex !== -1) {
                this.users[updatedUserIndex].role = 'COORDINATOR';
              }
              this.isLoading = false;
            }
            this.isLoading = false;
        });
      },
      (error) => {
        Swal.fire(error.error.message);
        this.isLoading = false;
      }
    );
  }

  makeUserManager(user: User) {
    this.isLoading = true;
    this.userSv.updateUserToManager(user.username).subscribe(
      (res) => {
        Swal.fire({
          title: 'Sei sicuro?',
          text: `${user.name} avrà accesso alle funzionalità del manager`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, Continua!',
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: `Modifica effettuata`,
              text: `Adesso ${user.name} è un manager !`,
              icon: 'success',
            });
            const updatedUserIndex = this.users.findIndex(
              (u) => u.username === user.username
              );
              if (updatedUserIndex !== -1) {
                this.users[updatedUserIndex].role = 'MANAGER';
                this.isLoading = false;
              }
            }
            this.isLoading = false;
        });
      },
      (error) => {
        Swal.fire(error.error.message);
        this.isLoading = false;
      }
    );
  }

  deleteUser(user: User) {
    this.isLoading = true;
    this.userSv.deleteByUsername(user.username).subscribe(
      (res) => {
        this.users = this.users.filter((u) => u.username !== user.username);
        Swal.fire(res.message);
        this.isLoading = false;
      },
      (error) => {
        Swal.fire(error.error.message);
        this.isLoading = false;
      }
    );
  }
  editUser(user: User) {
    this.router.navigate([`/user/modifica/${user.username}`]);
  }
}

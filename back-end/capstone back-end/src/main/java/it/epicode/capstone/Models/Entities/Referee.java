package it.epicode.capstone.Models.Entities;

import io.swagger.v3.oas.annotations.Hidden;
import it.epicode.capstone.Models.Entities.SuperClass.Competition;
import it.epicode.capstone.Models.Entities.SuperClass.Person;
import it.epicode.capstone.Models.Enums.Role;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "referees")
@Hidden
public class Referee extends Person {

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "tournament_id")
    private Competition tournament;

    private Role role = Role.REFEREE;

    public Referee(String name, String surname, LocalDate dateOfBirth) {
        super(name, surname, dateOfBirth);
    }
    public Referee(String name, String surname, LocalDate dateOfBirth, Competition tournament) {
        super(name, surname, dateOfBirth);
        this.tournament = tournament;
    }

}

package it.epicode.capstone.Models.Entities;

import io.swagger.v3.oas.annotations.Hidden;
import it.epicode.capstone.Models.Entities.SuperClass.Competition;
import it.epicode.capstone.Models.Entities.SuperClass.Person;
import it.epicode.capstone.Models.Enums.Role;
import it.epicode.capstone.Models.Enums.RoleInTheGame;
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
public class Referee extends Person {

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "tournament_id")
    private Competition tournament;
    @Column(unique = true)
    private String nickname;

    @Enumerated(EnumType.STRING)
    private RoleInTheGame role = RoleInTheGame.REFEREE;

    public Referee(String name, String surname, LocalDate dateOfBirth) {
        super(name, surname, dateOfBirth);
    }
    public Referee(String name, String surname, LocalDate dateOfBirth, Competition tournament) {
        super(name, surname, dateOfBirth);
        this.tournament = tournament;
    }
    public Referee(String name, String surname, LocalDate dateOfBirth, Competition tournament, String nickname) {
        super(name, surname, dateOfBirth);
        this.tournament = tournament;
        this.nickname = nickname;
    }
}

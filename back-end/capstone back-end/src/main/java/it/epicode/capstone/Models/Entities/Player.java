package it.epicode.capstone.Models.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.v3.oas.annotations.Hidden;
import it.epicode.capstone.Models.Entities.SuperClass.Person;
import it.epicode.capstone.Models.Enums.RoleInTheGame;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "players ")
public class Player extends Person {

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "team_id")
    private Team team;

    private int point;

    @Setter(AccessLevel.NONE)
    private String sigla;

    private int gamesPlayed;
    private RoleInTheGame role = RoleInTheGame.PLAYER;


    @Transient
    @JsonIgnore
    String teamName;

    public Player(String name, String surname, LocalDate dateOfBirth) {
        super(name, surname, dateOfBirth);
    }
    public Player(String name, String surname, LocalDate dateOfBirth,Team teamName, int point,  int gamesPlayed) {
        super(name, surname, dateOfBirth);
        this.teamName  = teamName.getName();
        this.point = point;
        this.gamesPlayed = gamesPlayed;
    }

    public Player(String name){
        super(name);
    }


    public void setSigla(String sigla) {
        if (sigla.length() == 1 && sigla.matches("[A-Ea-e]")) {
            this.sigla = String.valueOf(Character.toUpperCase(sigla.charAt(0)));
        } else {
            throw new IllegalArgumentException("The sigla must be a single character between A and E.");
        }
    }



    public void addPoints(int pointsToAdd) {
        this.point += pointsToAdd;
    }


}

package it.epicode.capstone.Models.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import it.epicode.capstone.Models.Entities.SuperClass.Person;
import jakarta.persistence.*;
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

    private char sigla;

    private int gamesPlayed;

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


    public void setSigla(char sigla) {
        if (sigla >= 'A' && sigla <= 'E') {
            this.sigla = Character.toUpperCase(sigla);
        } else {
            throw new IllegalArgumentException("The sigla must be containing between A and E.");
        }
    }


    public void addPoints(int pointsToAdd) {
        this.point += pointsToAdd;
    }


}

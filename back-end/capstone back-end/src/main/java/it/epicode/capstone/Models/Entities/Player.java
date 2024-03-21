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

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "team_id")
    private Team team;

    private int point;

    @Column(unique = true)
    private String nickname;

    private String sigla;

    private int gamesPlayed;
    @Enumerated(EnumType.STRING)
    private RoleInTheGame roleInTheGame = RoleInTheGame.PLAYER;

    
    String teamName;

    public Player(String name, String surname, LocalDate dateOfBirth) {
        super(name, surname, dateOfBirth);
    }
    public Player(String name, String surname, LocalDate dateOfBirth,Team teamName, int point,  int gamesPlayed) {
        super(name, surname, dateOfBirth);
        this.teamName  = teamName.getName();
        team.addPlayer(this);
        this.point = point;
        this.gamesPlayed = gamesPlayed;
    }

    public Player(String name){
        super(name);
    }






    public void addPoints(int pointsToAdd) {
        this.point += pointsToAdd;
    }


}

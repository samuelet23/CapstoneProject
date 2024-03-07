package it.epicode.capstone.Models.Entities;

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
@Table(name = "players")
public class Player extends Person {

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "team_id")
    private Team team;

    private int point;

    private  int assist;

    private int gamesPlayed;
    public Player(String name, String surname, LocalDate dateOfBirth) {
        super(name, surname, dateOfBirth);
    }
    public Player(String name, String surname, LocalDate dateOfBirth,Team team, int point, int assist, int gamesPlayed) {
        super(name, surname, dateOfBirth);
        this.team = team;
        this.point = point;
        this.assist = assist;
        this.gamesPlayed = gamesPlayed;
    }
    public double pointsPerGame(){
        if (gamesPlayed == 0) {
            return 0;
        }
        return (double) point/gamesPlayed;
    }
    public double assistsPerGame(){
        if (gamesPlayed == 0) {
            return 0;
        }
        return (double) assist/gamesPlayed;
    }




}

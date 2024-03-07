package it.epicode.capstone.Models.Entities;

import it.epicode.capstone.Models.Entities.SuperClass.Competition;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;

import java.time.LocalTime;
import java.util.UUID;

@Entity
@Data
@Table(name = "games")
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Setter(AccessLevel.NONE)
    private UUID id;

    @OneToOne
    @JoinColumn(name = "home_team_id")
    private Team homeTeam;

    @OneToOne
    @JoinColumn(name = "away_team_id")
    private Team awayTeam;

    private int homePoints;

    private int awayPoints;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "tournament_id")
    private Competition tournament;

    public Game(Team homeTeam, Team awayTeam, int homePoints, int awayPoints) {
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
        this.homePoints = homePoints;
        this.awayPoints = awayPoints;
    }

    public Team whoWinTheMatch(){
        if (homePoints > awayPoints) {
            return homeTeam;
        } else if (homePoints < awayPoints) {
            return awayTeam;
        } else {
            throw new RuntimeException("La partita è finita in parità, fate i supplementari");
        }
    }
}

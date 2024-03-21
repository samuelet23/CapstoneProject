package it.epicode.capstone.Models.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import it.epicode.capstone.Exceptions.BadRequestException;
import it.epicode.capstone.Models.Entities.SuperClass.Competition;
import it.epicode.capstone.Models.Enums.Round;
import it.epicode.capstone.Models.Enums.TournamentLevel;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "tournaments")
public class Tournament extends Competition {

    @Enumerated(EnumType.STRING)
    private TournamentLevel level;

    @JsonIgnore
    private Round initialRound;


    public Tournament(LocalDate startDate, String coverUrl, String name, List<Referee> referees, Set<Team> teams, List<Game> games, Place place, List<Player> players) {
        super(startDate, coverUrl, name, referees, teams, games, place, players);
    }
    public Tournament(LocalDate startDate, String coverUrl, String name, List<Referee> referees, Set<Team> teams, List<Game> games, Place place, List<Player> players, TournamentLevel level) {
        super(startDate, coverUrl, name, referees, teams, games, place, players);
        this.level = level;
    }


    public void setNumOfRefereeForTournament(List<Referee> referees, TournamentLevel level) throws BadRequestException {
        int maxReferees = getMaxRefereesForLevel(level);
        if (referees.size() == maxReferees) {
            setReferees(referees);
        } else {
            throw new BadRequestException("Invalid number of referees for the tournament level - JUNIOR need 1 referee -RISING STARS need 2 referees - ELITE need 3 referees");
        }
    }


    public int getMaxRefereesForLevel(TournamentLevel level) {
        return switch (level) {
            case JUNIOR -> 1;
            case RISINGSTARS -> 2;
            case ELITE -> 3;
            default -> 0;
        };
    }
}

package it.epicode.capstone.Models.Entities;

import it.epicode.capstone.Models.Entities.SuperClass.Competition;
import it.epicode.capstone.Models.Entities.SuperClass.Person;
import it.epicode.capstone.Models.Enums.TournamentLevel;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
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

    public Tournament(LocalDate startDate, String coverUrl, String name, List<Referee> referees, Set<Team> teams, int numMaxTeams, List<Game> games, Place place, List<Person> players) {
        super(startDate, coverUrl, name, referees, teams, numMaxTeams, games, place, players);
    }
    public Tournament(LocalDate startDate, String coverUrl, String name, List<Referee> referees, Set<Team> teams, int numMaxTeams, List<Game> games, Place place, List<Person> players, TournamentLevel level) {
        super(startDate, coverUrl, name, referees, teams, numMaxTeams, games, place, players);
        this.level = level;
    }


    public void setNumOfRefereeForTournament(List<Referee> referees) throws Exception {
        int maxReferees = getMaxRefereesForLevel(level);
        if (referees.size() == maxReferees) {
            setReferees(referees);
            System.out.println("Number of referees set: " + referees.size());
        } else {
            throw new Exception("Invalid number of referees for the tournament level");
        }
    }
    private int getMaxRefereesForLevel(TournamentLevel level) {
        return switch (level) {
            case JUNIOR -> 1;
            case RISINGSTARS -> 2;
            case ELITE -> 3;
            default -> 0;
        };
    }
}

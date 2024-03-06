package it.epicode.capstone.Models.Entities.SuperClass;

import com.fasterxml.jackson.annotation.JsonIgnore;
import it.epicode.capstone.Models.Entities.Game;
import it.epicode.capstone.Models.Entities.Place;
import it.epicode.capstone.Models.Entities.Referee;
import it.epicode.capstone.Models.Entities.Team;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@Getter
@Setter
@NoArgsConstructor
public abstract class Competition {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Setter(AccessLevel.NONE)
    private UUID id;

    private LocalDate startDate;

    private LocalDate endDate;

    private String coverUrl;

    private String name;


    @OneToMany(mappedBy = "tournament")
    private List<Referee> referees;

    @OneToMany(mappedBy = "tournament")
    private Set<Team> teams = new HashSet<Team>();

    private int numMaxTeams = 16;

    @OneToMany(mappedBy = "tournament")
    private List<Game> games;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "place_id")
    private Place place;

    @JsonIgnore
    @Transient
    private List<Person> players;

    public Competition(LocalDate startDate,  String coverUrl, String name, List<Referee> referees, Set<Team> teams, int numMaxTeams, List<Game> games, Place place, List<Person> players) {
        this.startDate = startDate;
        this.endDate = startDate.plusDays(1);
        this.coverUrl = coverUrl;
        this.name = name;
        this.referees = referees;
        this.teams = teams;
        this.numMaxTeams = numMaxTeams;
        this.games = games;
        this.place = place;
        this.players = players;
    }

}

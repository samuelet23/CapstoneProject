package it.epicode.capstone.Models.Entities.SuperClass;

import com.fasterxml.jackson.annotation.JsonIgnore;
import it.epicode.capstone.Models.Entities.*;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.*;

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


    private String coverUrl;

    @Column(unique = true)
    private String name;

    @OneToMany(mappedBy = "tournament")
    private List<Referee> referees;

    @OneToMany(mappedBy = "tournament")
    private Set<Team> teams = new HashSet<Team>();

    @JsonIgnore
    @OneToMany(mappedBy = "tournament")
    private List<Game> games = new ArrayList<>();

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "place_id")
    private Place place;

    @JsonIgnore
    @Transient
    private List<Player> players;

    public Competition(LocalDate startDate,  String coverUrl, String name, List<Referee> referees, Set<Team> teams, List<Game> games, Place place, List<Player> players) {
        this.startDate = startDate;
        this.coverUrl = coverUrl;
        this.name = name;
        this.referees = referees;
        this.teams = teams;
        this.games = games;
        this.place = place;
        this.players = players;
    }

}

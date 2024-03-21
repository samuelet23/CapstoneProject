package it.epicode.capstone.Models.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import it.epicode.capstone.Models.Entities.SuperClass.Competition;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "teams")
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Setter(AccessLevel.NONE)
    private UUID id;

    @OneToMany(mappedBy = "team")
    private Set<Player> players = new HashSet<>();

    private String logo;

    @Column(unique = true)
    private String name;

    @OneToOne()
    @JoinColumn(name = "captain_id" )
    private Player captain;

    @JsonIgnore
    @OneToMany(mappedBy = "winner")
    private Set<Game> wonGames = new HashSet<>();

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "tournament_id")
    private Competition tournament;

    public Team(String name){
        this.name = name;
    }
    public void setPlayers(Set<Player> players) throws IllegalArgumentException {
        if (players.size() < 3 || players.size() > 5) {
            throw new IllegalArgumentException("A team must have between 3 and 5 players.");
        }
        this.players = players;
    }
    public void addPlayer(Player player) throws IllegalArgumentException {
        if (players.size() > 5) {
            throw new IllegalArgumentException("Un team non può avere più di 5 giocatori");
        }
        players.add(player);
    }

    public boolean hasPlayerWithSigla(String sigla) {;
        for (Player player : players) {
            if (player.getSigla().equalsIgnoreCase(sigla)) {
                return true;
            }
        }
        return false;
    }

    public void setCaptain(Player player) throws IllegalArgumentException {
        if (!players.contains(player)) {
            throw new IllegalArgumentException("Il giocatore deve far parte della squadra per essere impostato come capitano.");
        }
        this.captain = player;
    }

}

package it.epicode.capstone.Models.Entities;

import io.swagger.v3.oas.annotations.Hidden;
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
@Hidden
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Setter(AccessLevel.NONE)
    private UUID id;

    @OneToMany(mappedBy = "team")
    private Set<Player> players = new HashSet<>();

    private String logo;
    private String name;

    @OneToOne
    @JoinColumn(name = "captain_id")
    private Player captain;

    @OneToMany(mappedBy = "winner")
    private Set<Game> wonGames = new HashSet<>();

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
        if (players.size() >= 5) {
            throw new IllegalArgumentException("A team cannot have more than 5 players.");
        }
        players.add(player);
    }

    public boolean hasPlayerWithSigla(char sigla) {
        char upperCaseSigla = Character.toUpperCase(sigla);
        for (Player player : players) {
            if (player.getSigla() == upperCaseSigla) {
                return false;
            }
        }
        return true;
    }
    public void setCaptain(Player player) throws IllegalArgumentException {
        if (!players.contains(player)) {
            throw new IllegalArgumentException("The player must be part of the team to be set as captain.");
        }
        this.captain = player;
    }

}
